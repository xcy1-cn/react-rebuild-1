type ProductDetailLike = {
  goods_id: number | string;
  goods_name: string;
  goods_price_min: string | number;
  selling_point?: string;
  content?: string;
  goods_image?: string;
  goods_sales?: number;
};

type CommentRowLike = Record<string, any>;

function toSafeNumber(value: unknown): number {
  const num = Number(value);
  return Number.isNaN(num) ? 0 : num;
}

function getCommentContent(item: CommentRowLike) {
  return (
    item?.content ??
    item?.comment_content ??
    item?.commentContent ??
    item?.review_content ??
    item?.text ??
    ""
  );
}

function getCommentScore(item: CommentRowLike) {
  return toSafeNumber(
    item?.score ?? item?.comment_score ?? item?.star ?? item?.rate ?? 0,
  );
}

export function buildAiReviewPayload(
  detail: ProductDetailLike,
  commentRows: CommentRowLike[],
) {
  const comments = (Array.isArray(commentRows) ? commentRows : [])
    .map((item) => ({
      content: String(getCommentContent(item)).trim(),
      score: getCommentScore(item),
    }))
    .filter((item) => item.content.length > 0)
    .slice(0, 15);

  return {
    product: {
      id: detail?.goods_id ?? "",
      name: detail?.goods_name ?? "",
      price: toSafeNumber(detail?.goods_price_min ?? 0),
      summary: detail?.selling_point ?? "",
      description: detail?.content ?? "",
      image: detail?.goods_image ?? "",
      sales: detail?.goods_sales ?? 0,
    },
    comments,
  };
}
