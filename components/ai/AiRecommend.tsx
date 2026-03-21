import { useEffect, useMemo, useRef, useState } from "react";
import { streamAiRecommend } from "@/api/ai";
import { parseAiRecommendText } from "@/utils/parseAiRecommend";

import "./aiRecommend.scss";

//定义最大历史长度 
const MAX_HISTORY_ROUNDS = 10;
const MAX_HISTORY_MESSAGES = MAX_HISTORY_ROUNDS * 2;

const quickQuestions = [
  "我预算3000，想买拍照好的手机",
  "推荐一款适合打游戏的高性价比手机",
  "给父母买手机，要求大屏和续航好",
];

const AI_RECOMMEND_HISTORY_KEY = "ai_recommend_history";

type MessageItem = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

//裁剪函数
function trimMessages(messages: MessageItem[]) {
  if (messages.length <= MAX_HISTORY_MESSAGES) {
    return messages;
  }

  return messages.slice(-MAX_HISTORY_MESSAGES);
}

function getInitialMessages(): MessageItem[] {
  try {
    const raw = localStorage.getItem(AI_RECOMMEND_HISTORY_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    // return parsed.filter(
    //   (item) =>
    //     item &&
    //     typeof item.id === "string" &&
    //     (item.role === "user" || item.role === "assistant") &&
    //     typeof item.content === "string",
    // );

    // 初始化裁剪
    return trimMessages(
      parsed.filter(
        (item) =>
          item &&
          typeof item.id === "string" &&
          (item.role === "user" || item.role === "assistant") &&
          typeof item.content === "string",
      ),
    );
  } catch (error) {
    console.error("读取 AI 历史记录失败:", error);
    return [];
  }
}

export default function AiRecommend() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>(getInitialMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isStopped, setIsStopped] = useState(false);

  const controllerRef = useRef<AbortController | null>(null);

  const lastMessageId = messages[messages.length - 1]?.id;

  const parsedLastAssistantMessage = useMemo(() => {
    if (loading) return null;

    const lastAssistantMessage = [...messages]
      .reverse()
      .find((item) => item.role === "assistant");

    if (!lastAssistantMessage?.content) return null;

    return parseAiRecommendText(lastAssistantMessage.content);
  }, [messages, loading]);

  useEffect(() => {
    try {
      localStorage.setItem(AI_RECOMMEND_HISTORY_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("保存 AI 历史记录失败:", error);
    }
  }, [messages]);

  const handleAskAI = async (customQuery?: string) => {
    const text = (customQuery ?? query).trim();
    if (!text) return;

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const timestamp = Date.now();
    const userMessageId = `${timestamp}-user`;
    const assistantMessageId = `${timestamp}-assistant`;

    try {
      setLoading(true);
      setError("");
      setIsStopped(false);

    //   setMessages((prev) => [
    //     ...prev,
    //     {
    //       id: userMessageId,
    //       role: "user",
    //       content: text,
    //     },
    //     {
    //       id: assistantMessageId,
    //       role: "assistant",
    //       content: "",
    //     },
    //   ]);
    //   最大历史  
    setMessages((prev) =>
        trimMessages([
          ...prev,
          {
            id: userMessageId,
            role: "user",
            content: text,
          },
          {
            id: assistantMessageId,
            role: "assistant",
            content: "",
          },
        ]),
      );

      setQuery("");

      const stream = await streamAiRecommend(text, controller.signal);
      const reader = stream.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });

          setMessages((prev) =>
            prev.map((item) =>
              item.id === assistantMessageId
                ? { ...item, content: item.content + chunk }
                : item,
            ),
          );
        }
      }
    } catch (err: any) {
      if (err?.name === "AbortError") {
        setIsStopped(true);
      } else {
        console.error("handleAskAI error:", err);
        setError(err?.message || "请求失败，请稍后重试");
      }
    } finally {
      setLoading(false);
      controllerRef.current = null;
    }
  };

  const handleStop = () => {
    controllerRef.current?.abort();
  };

  const handleRegenerate = () => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((item) => item.role === "user");

    if (!lastUserMessage) return;

    handleAskAI(lastUserMessage.content);
  };

  const handleClickQuickQuestion = (text: string) => {
    setQuery(text);
    handleAskAI(text);
  };

  const handleClearMessages = () => {
    if (loading) {
      controllerRef.current?.abort();
    }

    setMessages([]);
    setError("");
    setIsStopped(false);
    localStorage.removeItem(AI_RECOMMEND_HISTORY_KEY);
  };

  return (
    <div className="ai-recommend">
      <div className="ai-recommend__header">
        <h2 className="ai-recommend__title">AI 选购助手</h2>
        <p className="ai-recommend__desc">
          告诉我你的预算和需求，我会边分析边给出推荐
        </p>
      </div>

      <div className="ai-recommend__quick-list">
        {quickQuestions.map((item) => (
          <button
            key={item}
            className="ai-recommend__quick-item"
            onClick={() => handleClickQuickQuestion(item)}
            disabled={loading}
          >
            {item}
          </button>
        ))}
      </div>

      <textarea
        className="ai-recommend__textarea"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="例如：我预算3000，想买拍照好的手机"
        rows={4}
      />

      <div className="ai-recommend__actions">
        <button
          className="ai-recommend__button"
          onClick={() => handleAskAI()}
          disabled={loading}
        >
          {loading ? "分析中..." : "开始推荐"}
        </button>

        {loading ? (
          <button
            className="ai-recommend__button ai-recommend__button--secondary"
            onClick={handleStop}
          >
            停止生成
          </button>
        ) : messages.length > 0 ? (
          <button
            className="ai-recommend__button ai-recommend__button--secondary"
            onClick={handleRegenerate}
          >
            重新生成
          </button>
        ) : null}

        {messages.length > 0 ? (
          <button
            className="ai-recommend__button ai-recommend__button--secondary"
            onClick={handleClearMessages}
          >
            清空会话
          </button>
        ) : null}
      </div>

      {error ? <div className="ai-recommend__error">{error}</div> : null}

      {isStopped && !loading ? (
        <div className="ai-recommend__tips">已停止生成，可继续重新生成。</div>
      ) : null}

      {!loading && !error && messages.length === 0 ? (
        <div className="ai-recommend__empty">
          你可以输入预算、用途、品牌偏好等信息，例如“预算4000，偏向拍照和轻薄”
        </div>
      ) : null}

      {messages.length > 0 ? (
        <div className="ai-recommend__message-list">
          {messages.map((item) => {
            const isLastAssistantMessage =
              item.role === "assistant" && item.id === lastMessageId;

            const shouldRenderAsCard =
              isLastAssistantMessage && !loading && parsedLastAssistantMessage;

            return (
              <div
                key={item.id}
                className={`ai-recommend__message ai-recommend__message--${item.role}`}
              >
                <div className="ai-recommend__message-role">
                  {item.role === "user" ? "我" : "AI"}
                </div>

                <div className="ai-recommend__message-content">
                  {shouldRenderAsCard ? (
                    <div className="ai-recommend__cards">
                      <div className="ai-recommend__card">
                        <div className="ai-recommend__card-label">推荐商品</div>
                        <div className="ai-recommend__card-value">
                          {parsedLastAssistantMessage.product}
                        </div>
                      </div>

                      <div className="ai-recommend__card">
                        <div className="ai-recommend__card-label">推荐理由</div>
                        <ul className="ai-recommend__reason-list">
                          {parsedLastAssistantMessage.reasons.map((reason) => (
                            <li
                              key={reason}
                              className="ai-recommend__reason-item"
                            >
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="ai-recommend__card">
                        <div className="ai-recommend__card-label">适合人群</div>
                        <div className="ai-recommend__card-value">
                          {parsedLastAssistantMessage.audience}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {item.content}
                      {loading &&
                      item.role === "assistant" &&
                      item.id === lastMessageId ? (
                        <span className="ai-recommend__cursor">|</span>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
