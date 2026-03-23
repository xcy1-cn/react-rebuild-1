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

// none history
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

import { useState } from "react";
import { chat } from "@/api/python";

interface MessageItem {
  role: "user" | "assistant";
  content: string;
}

export default function PythonAPI() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([]);

  async function handleSend() {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    setInputValue("");

    const res = await chat({
      message: userMessage,
    });

    setMessages((prev) => [...prev, { role: "assistant", content: res.reply }]);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI 聊天测试页</h2>

      <div style={{ marginBottom: "20px" }}>
        {messages.map((item, index) => (
          <div key={index} style={{ marginBottom: "12px" }}>
            <strong>{item.role === "user" ? "你" : "AI"}：</strong>
            <span>{item.content}</span>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="请输入消息"
        style={{ width: "300px", height: "36px", marginRight: "12px" }}
      />
      <button onClick={handleSend}>发送</button>
    </div>
  );
}