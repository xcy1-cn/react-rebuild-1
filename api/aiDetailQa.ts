import axios from "axios";

export type AiDetailQaRequest = {
  product: {
    id: string | number;
    name: string;
    price: number;
    summary?: string;
    description?: string;
    image?: string;
    sales?: number;
  };
  comments: Array<{
    content: string;
    score?: number;
  }>;
  question: string;
};

export type AiDetailQaResponse = {
  answer: string;
};

export function postAiDetailQa(data: AiDetailQaRequest) {
  return axios.post<AiDetailQaResponse>(
    "http://localhost:3001/api/ai/detail-qa",
    data,
  );
}
