export type ParsedAiRecommend = {
  product: string;
  reasons: string[];
  audience: string;
};

export function parseAiRecommendText(text: string): ParsedAiRecommend | null {
  if (!text.trim()) return null;

  const productMatch = text.match(
    /【推荐商品】\s*([\s\S]*?)(?=【推荐理由】|$)/,
  );
  const reasonsMatch = text.match(
    /【推荐理由】\s*([\s\S]*?)(?=【适合人群】|$)/,
  );
  const audienceMatch = text.match(/【适合人群】\s*([\s\S]*?)$/);

  const product = productMatch?.[1]?.trim() || "";
  const reasonsRaw = reasonsMatch?.[1]?.trim() || "";
  const audience = audienceMatch?.[1]?.trim() || "";

  const reasons = reasonsRaw
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => item.replace(/^\d+\.\s*/, ""));

  if (!product && !reasons.length && !audience) {
    return null;
  }

  return {
    product,
    reasons,
    audience,
  };
}
