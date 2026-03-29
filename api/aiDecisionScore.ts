import axios from "axios";

export type AiDecisionScoreRequest = {
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
  commentTotal?: number;
};

export type AiDecisionScoreResponse = {
  overallScore: number;
  priceScore: number;
  reviewScore: number;
  matchScore: number;
  risks: string[];
  conclusion: string;
};

export function postAiDecisionScore(data: AiDecisionScoreRequest) {
  return axios.post<AiDecisionScoreResponse>(
    "http://localhost:3001/api/ai/decision-score",
    data,
  );
}
