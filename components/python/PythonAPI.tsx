// // import { useEffect } from "react";
// // import { login } from "@/api/python";

// // export default function PythonAPI() {
// //   useEffect(() => {
// //     login({
// //       username: "admin",
// //       password: "123456",
// //     }).then((res) => {
// //       console.log("接口返回：", res);
// //     });
// //   }, []);

// //   return (
// //     <div>
// //       <h2>PythonAPI 页面</h2>
// //       <p>这里是 FastAPI 联调测试页</p>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { login } from "@/api/python";

// export default function PythonAPI() {
//   const [result, setResult] = useState<any>(null);

//   async function handleLogin() {
//     const res = await login({
//       username: "admin",
//       password: "123456",
//     });
//     setResult(res);
//   }

//   return (
//     <div>
//       <h2>PythonAPI 页面</h2>
//       <button onClick={handleLogin}>测试登录接口</button>
//       <pre>{JSON.stringify(result, null, 2)}</pre>
//     </div>
//   );
// }

// init chat
// import { useState } from "react";
// import { chat } from "@/api/python";

// export default function PythonAPI() {
//   const [inputValue, setInputValue] = useState("");
//   const [reply, setReply] = useState("");

//   async function handleSend() {
//     if (!inputValue.trim()) return;

//     const res = await chat({
//       message: inputValue,
//     });

//     setReply(res.reply);
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>AI 聊天测试页</h2>

//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="请输入你想说的话"
//         style={{ width: "300px", height: "36px", marginRight: "12px" }}
//       />

//       <button onClick={handleSend}>发送</button>

//       <div style={{ marginTop: "20px" }}>
//         <strong>AI 回复：</strong>
//         <div>{reply}</div>
//       </div>
//     </div>
//   );
// }

// mock
// import { useState } from "react";
// import { chat } from "@/api/python";

// interface MessageItem {
//   role: "user" | "assistant";
//   content: string;
// }

// export default function PythonAPI() {
//   const [inputValue, setInputValue] = useState("");
//   const [messages, setMessages] = useState<MessageItem[]>([]);

//   async function handleSend() {
//     if (!inputValue.trim()) return;

//     const userMessage = inputValue;

//     setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

//     setInputValue("");

//     const res = await chat({
//       message: userMessage,
//     });

//     setMessages((prev) => [...prev, { role: "assistant", content: res.reply }]);
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>AI 聊天测试页</h2>

//       <div style={{ marginBottom: "20px" }}>
//         {messages.map((item, index) => (
//           <div key={index} style={{ marginBottom: "12px" }}>
//             <strong>{item.role === "user" ? "你" : "AI"}：</strong>
//             <span>{item.content}</span>
//           </div>
//         ))}
//       </div>

//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="请输入消息"
//         style={{ width: "300px", height: "36px", marginRight: "12px" }}
//       />
//       <button onClick={handleSend}>发送</button>
//     </div>
//   );
// }

// component
// import { useState } from "react";
// import { chat } from "@/api/python";

// interface MessageItem {
//   role: "user" | "assistant";
//   content: string;
// }

// export default function PythonAPI() {
//   const [inputValue, setInputValue] = useState("");
//   const [messages, setMessages] = useState<MessageItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   async function handleSend() {
//     const value = inputValue.trim();
//     if (!value || loading) return;

//     setErrorMsg("");
//     setMessages((prev) => [...prev, { role: "user", content: value }]);
//     setInputValue("");
//     setLoading(true);

//     try {
//       const res = await chat({ message: value });

//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: res.reply },
//       ]);
//     } catch (error) {
//       console.error("聊天请求失败：", error);
//       setErrorMsg("请求失败，请检查后端服务是否正常");
//     } finally {
//       setLoading(false);
//     }
//   }

//   function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
//     if (e.key === "Enter") {
//       handleSend();
//     }
//   }

//   return (
//     <div style={{ padding: "20px", maxWidth: "720px" }}>
//       <h2>AI 聊天测试页</h2>

//       <div
//         style={{
//           minHeight: "300px",
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           padding: "16px",
//           marginBottom: "16px",
//         }}
//       >
//         {messages.length === 0 ? (
//           <div>暂无消息，开始聊天吧</div>
//         ) : (
//           messages.map((item, index) => (
//             <div key={index} style={{ marginBottom: "12px" }}>
//               <strong>{item.role === "user" ? "你" : "AI"}：</strong>
//               <span>{item.content}</span>
//             </div>
//           ))
//         )}

//         {loading && (
//           <div style={{ marginTop: "12px" }}>
//             <strong>AI：</strong>
//             <span>思考中...</span>
//           </div>
//         )}
//       </div>

//       <div style={{ display: "flex", gap: "12px" }}>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="请输入消息"
//           style={{ flex: 1, height: "40px", padding: "0 12px" }}
//         />
//         <button onClick={handleSend} disabled={loading}>
//           {loading ? "发送中..." : "发送"}
//         </button>
//       </div>

//       {errorMsg && (
//         <div style={{ color: "red", marginTop: "12px" }}>{errorMsg}</div>
//       )}
//     </div>
//   );
// }

// chat
import { useState } from "react";
import { chat, type MessageItem } from "@/api/python";

export default function PythonAPI() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSend() {
    const value = inputValue.trim();
    if (!value || loading) return;

    const newMessages: MessageItem[] = [
      ...messages,
      { role: "user", content: value },
    ];

    setMessages(newMessages);
    setInputValue("");
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await chat(newMessages);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.reply },
      ]);
    } catch (error) {
      console.error(error);
      setErrorMsg("请求失败，请检查后端");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSend();
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "720px" }}>
      <h2>AI 聊天（上下文版本）</h2>

      {/* 聊天区 */}
      <div
        style={{
          minHeight: "300px",
          border: "1px solid #ddd",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      >
        {messages.length === 0 ? (
          <div>开始聊天吧</div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <strong>{msg.role === "user" ? "你" : "AI"}：</strong>
              {msg.content}
            </div>
          ))
        )}

        {loading && (
          <div>
            <strong>AI：</strong>思考中...
          </div>
        )}
      </div>

      {/* 输入区 */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入消息"
          style={{ flex: 1, height: "40px", padding: "0 10px" }}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? "发送中..." : "发送"}
        </button>
      </div>

      {/* 错误提示 */}
      {errorMsg && (
        <div style={{ color: "red", marginTop: "10px" }}>{errorMsg}</div>
      )}
    </div>
  );
}
