import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductHeader from "@/components/productDetail/ProductHeader";
import ProductService from "@/components/productDetail/ProductService";
import ProductComments from "@/components/productDetail/ProductComments";
import ProductDescription from "@/components/productDetail/ProductDescription";
import ProductActionBar from "@/components/productDetail/ProductActionBar";
import ServicePopup from "@/components/productDetail/ServicePopup";
import BuyPopup from "@/components/productDetail/BuyPopup";

import "@/components/productDetail/productDetail.scss";
import {
  getGoodDetail,
  getGoodService,
  getGoodCommentListRows,
  getGoodCommentTotal,
} from "@/api/productDetail";
import { useProductDetailStore } from "@/store/productDetailStore";
import { useCartStore } from "@/store/cartStore";


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

  useEffect(() => {
    if (!goodsId) return;

    fetchProductDetailPageData(goodsId);

    return () => {
      clearProductDetailData();
    };
  }, [goodsId, fetchProductDetailPageData, clearProductDetailData]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="goodDetail">
      <ProductHeader detail={detail} />

      <ProductService
        serviceList={serviceList}
        onOpen={() => setShowServicePopup(true)}
      />

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
