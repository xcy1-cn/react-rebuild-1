import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";

type BuyPopupProps = {
  open: boolean;
  detail: any;
  type: "cart" | "buy";
  onClose: () => void;
};

export default function BuyPopup({
  open,
  detail,
  type,
  onClose,
}: BuyPopupProps) {
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  const addToCart = useCartStore((state) => state.addToCart);
  const adding = useCartStore((state) => state.adding);

  useEffect(() => {
    if (open) setCount(1);
  }, [open, detail]);

  if (!open) return null;

  const maxStock = detail?.stock_total || 1;

  function handleMinus() {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  }

  function handlePlus() {
    setCount((prev) => (prev < maxStock ? prev + 1 : prev));
  }

  async function handleConfirm() {
    const payload = {
      goodsId: detail?.goods_id,
      goodsNum: count,
      goodsSkuId: detail?.skuList?.[0]?.goods_sku_id,
    };

    if (type === "cart") {
      const success = await addToCart(payload);

      if (success) {
        onClose();
      }
      return;
    }

    navigate(
      `/checkout/order?mode=buyNow&type=detail&goodsId=${detail?.goods_id}&goodsNum=${count}&goodsSkuId=${detail?.skuList?.[0]?.goods_sku_id || ""}&goodsName=${encodeURIComponent(detail?.goods_name || "")}&goodsImage=${encodeURIComponent(detail?.goods_image || "")}&goodsPrice=${detail?.goods_price_max || ""}`,
    );

    onClose();
  }

  return (
    <div className="popup-mask" onClick={onClose}>
      <div
        className="popup-sheet popup-sheet--buy"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-drag-bar" />

        <div className="buy-popup-header">
          <div className="buy-popup-product">
            <div className="left">
              <img src={detail?.goods_image} alt="" />
            </div>

            <div className="middle">
              <span className="goods-price">¥{detail?.goods_price_max}</span>
              <span className="summary">库存：{detail?.stock_total}</span>
              <span className="summary">已选：{count} 件</span>
            </div>

            <div className="icon">
              <button className="close-btn" onClick={onClose}>
                ×
              </button>
            </div>
          </div>
        </div>

        <div className="buy-popup-body">
          <div className="counter">
            <div className="counter-label">购买数量</div>

            <div className="stepper">
              <button onClick={handleMinus}>-</button>
              <span>{count}</span>
              <button onClick={handlePlus}>+</button>
            </div>
          </div>
        </div>

        <div className="buy-popup-footer">
          {detail?.stock_total > 0 ? (
            <button
              className={`buy-btn ${type === "cart" ? "warning" : "danger"}`}
              onClick={handleConfirm}
              disabled={adding}
            >
              {type === "cart"
                ? adding
                  ? "加入中..."
                  : "加入购物车"
                : "立即购买"}
            </button>
          ) : (
            <button className="buy-btn gray" disabled>
              该商品已抢完
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
