import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

// components
import ProductHeader from "@/components/productDetail/ProductHeader";
import ProductService from "@/components/productDetail/ProductService";
import ProductComments from "@/components/productDetail/ProductComments";
import ProductDescription from "@/components/productDetail/ProductDescription";
import ProductActionBar from "@/components/productDetail/ProductActionBar";
import ServicePopup from "@/components/productDetail/ServicePopup";
import BuyPopup from "@/components/productDetail/BuyPopup";
import AiDetailQaPanel from "@/components/ai/AiDetailQaPanel";

import "@/components/productDetail/productDetail.scss";
import { useProductDetailStore } from "@/store/productDetailStore";
import { useCartStore } from "@/store/cartStore";

// AI 卡片
import { buildAiReviewPayload } from "@/utils/buildAiReviewPayload";
import { useAiReviewSummary } from "@/hooks/useAiReviewSummary";
import AiReviewSummaryCard from "@/components/ai/AiReviewSummaryCard";

// AI 评分
import { buildAiDecisionPayload } from "@/utils/buildAiDecisionPayload";
import { useAiDecisionScore } from "@/hooks/useAiDecisionScore";
import AiDecisionScoreCard from "@/components/ai/AiDecisionScoreCard";

export default function ProductDetailPage() {
  const fetchCartTotal = useCartStore((state) => state.fetchCartTotal);

  useEffect(() => {
    fetchCartTotal();
  }, [fetchCartTotal]);

  const [searchParams] = useSearchParams();
  const goodsId = searchParams.get("goodsId");

  const detail = useProductDetailStore((state) => state.detail);
  const serviceList = useProductDetailStore((state) => state.serviceList);
  const commentRows = useProductDetailStore((state) => state.commentRows);
  const commentTotal = useProductDetailStore((state) => state.commentTotal);
  const loading = useProductDetailStore((state) => state.loading);
  const error = useProductDetailStore((state) => state.error);
  const fetchProductDetailPageData = useProductDetailStore(
    (state) => state.fetchProductDetailPageData,
  );
  const clearProductDetailData = useProductDetailStore(
    (state) => state.clearProductDetailData,
  );

  const [showServicePopup, setShowServicePopup] = useState(false);
  const [showBuyPopup, setShowBuyPopup] = useState(false);
  const [buyType, setBuyType] = useState<"cart" | "buy">("cart");

  // AI review
  const aiDecisionPayload = useMemo(() => {
    if (!detail) return null;

    return buildAiDecisionPayload(detail, commentRows, commentTotal);
  }, [detail, commentRows, commentTotal]);

  const {
    data: aiDecisionScore,
    loading: aiDecisionLoading,
    error: aiDecisionError,
    refresh: refreshAiDecisionScore,
  } = useAiDecisionScore(aiDecisionPayload);

  useEffect(() => {
    if (!goodsId) return;

    fetchProductDetailPageData(goodsId);

    return () => {
      clearProductDetailData();
    };
  }, [goodsId, fetchProductDetailPageData, clearProductDetailData]);

  const aiReviewPayload = useMemo(() => {
    if (!detail) return null;
    if (!Array.isArray(commentRows) || commentRows.length === 0) return null;

    return buildAiReviewPayload(detail, commentRows);
  }, [detail, commentRows]);

  const {
    data: aiReviewSummary,
    loading: aiReviewLoading,
    error: aiReviewError,
    refresh: refreshAiReviewSummary,
  } = useAiReviewSummary(aiReviewPayload);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="goodDetail">
      <ProductHeader detail={detail} />

      <ProductService
        serviceList={serviceList}
        onOpen={() => setShowServicePopup(true)}
      />

      <AiDecisionScoreCard
        data={aiDecisionScore}
        loading={aiDecisionLoading}
        error={aiDecisionError}
        onRefresh={refreshAiDecisionScore}
      />

      <AiReviewSummaryCard
        data={aiReviewSummary}
        loading={aiReviewLoading}
        error={aiReviewError}
        onRefresh={refreshAiReviewSummary}
      />

      <AiDetailQaPanel detail={detail} commentRows={commentRows} />

      <ProductComments
        goodsId={goodsId || ""}
        commentRows={commentRows}
        commentTotal={commentTotal}
      />

      <ProductDescription content={detail?.content || ""} />

      <ProductActionBar
        onAddCart={() => {
          setBuyType("cart");
          setShowBuyPopup(true);
        }}
        onBuyNow={() => {
          setBuyType("buy");
          setShowBuyPopup(true);
        }}
      />

      <ServicePopup
        open={showServicePopup}
        serviceList={serviceList}
        onClose={() => setShowServicePopup(false)}
      />

      <BuyPopup
        open={showBuyPopup}
        detail={detail}
        type={buyType}
        onClose={() => setShowBuyPopup(false)}
      />
    </div>
  );
}
