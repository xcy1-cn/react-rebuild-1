import { useCallback, useEffect, useState } from "react";
import {
  postAiDecisionScore,
  type AiDecisionScoreRequest,
  type AiDecisionScoreResponse,
} from "@/api/aiDecisionScore";

type UseAiDecisionScoreResult = {
  data: AiDecisionScoreResponse | null;
  loading: boolean;
  error: string;
  refresh: () => Promise<void>;
};

export function useAiDecisionScore(
  payload: AiDecisionScoreRequest | null,
): UseAiDecisionScoreResult {
  const [data, setData] = useState<AiDecisionScoreResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchScore = useCallback(async () => {
    if (!payload) {
      setData(null);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await postAiDecisionScore(payload);
      setData(res.data);
    } catch (err: any) {
      setError(err?.message || "AI 决策评分生成失败");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [payload]);

  useEffect(() => {
    fetchScore();
  }, [fetchScore]);

  return {
    data,
    loading,
    error,
    refresh: fetchScore,
  };
}
