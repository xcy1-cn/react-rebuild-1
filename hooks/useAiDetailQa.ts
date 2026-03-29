import { useState } from "react";
import {
  postAiDetailQa,
  type AiDetailQaRequest,
  type AiDetailQaResponse,
} from "@/api/aiDetailQa";

type UseAiDetailQaResult = {
  data: AiDetailQaResponse | null;
  loading: boolean;
  error: string;
  ask: (payload: AiDetailQaRequest) => Promise<void>;
  clear: () => void;
};

export function useAiDetailQa(): UseAiDetailQaResult {
  const [data, setData] = useState<AiDetailQaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ask = async (payload: AiDetailQaRequest) => {
    try {
      setLoading(true);
      setError("");
      const res = await postAiDetailQa(payload);
      setData(res.data);
    } catch (err: any) {
      setError(err?.message || "AI 问答失败");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setData(null);
    setError("");
  };

  return {
    data,
    loading,
    error,
    ask,
    clear,
  };
}
