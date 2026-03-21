import axios from "axios";

export type ReqAiRecommend = {
  query: string;
};

export type ResAiRecommend = {
  content: string;
};

// 普通AI接口
export function postAiRecommend(data: ReqAiRecommend) {
  return axios.post<ResAiRecommend>(
    "http://localhost:3001/api/ai/recommend",
    data,
  );
}

// 流式AI数据接口(不支持用户主动停止+重新生成)
// export async function streamAiRecommend(query: string) {
//   const res = await fetch("http://localhost:3001/api/ai/recommend", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ query }),
//   });

//   if (!res.ok) {
//     throw new Error("流式请求失败");
//   }

//   if (!res.body) {
//     throw new Error("当前浏览器不支持流式读取");
//   }

//   return res.body;
// }

// 流式AI数据接口(支持用户主动停止+重新生成)
export async function streamAiRecommend(query: string, signal?: AbortSignal) {
  const res = await fetch("http://localhost:3001/api/ai/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    signal,
  });

  if (!res.ok) {
    throw new Error("流式请求失败");
  }

  if (!res.body) {
    throw new Error("当前浏览器不支持流式读取");
  }

  return res.body;
}