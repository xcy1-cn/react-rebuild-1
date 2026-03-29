import { useCallback, useEffect, useState } from "react";
import {
  postAiReviewSummary,
  type AiReviewRequest,
  type AiReviewResponse,
} from "@/api/aiReview";

type UseAiReviewSummaryResult = {
  data: AiReviewResponse | null;
  loading: boolean;
  error: string;
  refresh: () => Promise<void>;
};

export function useAiReviewSummary(
  payload: AiReviewRequest | null,
): UseAiReviewSummaryResult {
  const [data, setData] = useState<AiReviewResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSummary = useCallback(async () => {
    if (!payload || payload.comments.length === 0) {
      setData(null);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await postAiReviewSummary(payload);
      setData(res.data);
    } catch (err: any) {
      setError(err?.message || "AI 评论总结生成失败");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [payload]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return {
    data,
    loading,
    error,
    refresh: fetchSummary,
  };
}
