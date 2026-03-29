// export function login(data: { username: string; password: string }) {
//   return fetch("http://127.0.0.1:8000/api/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   }).then((res) => res.json());
// }

// export async function chat(data: { message: string }) {
//   const res = await fetch("http://127.0.0.1:8000/api/chat", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) {
//     throw new Error(`请求失败，状态码：${res.status}`);
//   }

//   return res.json();
// }

const BASE_URL = "http://127.0.0.1:8000";

export async function request(url: string, options: RequestInit = {}) {
  const res = await fetch(BASE_URL + url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`请求失败: ${res.status}`);
  }

  return res.json();
}

export interface MessageItem {
  role: "user" | "assistant";
  content: string;
}

export function chat(messages: MessageItem[]) {
  return request("/api/chat", {
    method: "POST",
    body: JSON.stringify({ messages }),
  });
}