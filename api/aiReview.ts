import axios from "axios";

export type AiReviewRequest = {
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
};

export type AiReviewResponse = {
  summary: string;
  pros: string[];
  cons: string[];
  suitableUsers: string[];
  unsuitableUsers: string[];
  suggestion: string;
};

export function postAiReviewSummary(data: AiReviewRequest) {
  return axios.post<AiReviewResponse>(
    "http://localhost:3001/api/ai/review-summary",
    data,
  );
}
