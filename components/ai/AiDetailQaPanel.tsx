import { useState } from "react";
import { buildAiDetailQaPayload } from "@/utils/buildAiDetailQaPayload";
import { useAiDetailQa } from "@/hooks/useAiDetailQa";
import "./aiDetailQaPanel.scss";

type Props = {
  detail: any;
  commentRows: any[];
};

const quickQuestions = [
  "这款商品适合送礼吗？",
  "这款商品性价比怎么样？",
  "这款商品适合日常使用吗？",
  "从评论看，这款商品有什么不足？",
];

export default function AiDetailQaPanel({ detail, commentRows }: Props) {
  const [question, setQuestion] = useState("");
  const { data, loading, error, ask, clear } = useAiDetailQa();

  const handleAsk = async (customQuestion?: string) => {
    const finalQuestion = String(customQuestion ?? question).trim();
    if (!finalQuestion) return;
    if (!detail) return;

    const payload = buildAiDetailQaPayload(detail, commentRows, finalQuestion);
    await ask(payload);
    setQuestion(finalQuestion);
  };

  return (
    <section className="ai-detail-qa-panel">
      <div className="ai-detail-qa-panel__header">
        <div className="ai-detail-qa-panel__title">AI 商品问答</div>
        <div className="ai-detail-qa-panel__badge">AI</div>
      </div>

      <div className="ai-detail-qa-panel__quick-list">
        {quickQuestions.map((item) => (
          <button
            key={item}
            className="ai-detail-qa-panel__quick-item"
            onClick={() => handleAsk(item)}
            disabled={loading}
          >
            {item}
          </button>
        ))}
      </div>

      <textarea
        className="ai-detail-qa-panel__textarea"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="例如：这款商品适合送礼吗？"
        rows={3}
      />

      <div className="ai-detail-qa-panel__actions">
        <button
          className="ai-detail-qa-panel__button"
          onClick={() => handleAsk()}
          disabled={loading}
        >
          {loading ? "回答中..." : "提问"}
        </button>

        <button
          className="ai-detail-qa-panel__button ai-detail-qa-panel__button--secondary"
          onClick={clear}
          disabled={loading}
        >
          清空回答
        </button>
      </div>

      {error ? (
        <div className="ai-detail-qa-panel__status ai-detail-qa-panel__status--error">
          {error}
        </div>
      ) : null}

      {data?.answer ? (
        <div className="ai-detail-qa-panel__answer">
          <div className="ai-detail-qa-panel__answer-label">AI 回答</div>
          <div className="ai-detail-qa-panel__answer-text">{data.answer}</div>
        </div>
      ) : null}
    </section>
  );
}
