import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";

type ProductActionBarProps = {
  onAddCart: () => void;
  onBuyNow: () => void;
};

export default function ProductActionBar({
  onAddCart,
  onBuyNow,
}: ProductActionBarProps) {
  const cartTotal = useCartStore((state) => state.cartTotal);

  return (
    <div className="goodDetail-actionBar">
      <div className="action-bar">
        <Link className="action-bar-icon" to="/home">
          首页
        </Link>

        <Link className="action-bar-icon" to="/cart">
          购物车
          {cartTotal > 0 ? <span className="badge">{cartTotal}</span> : null}
        </Link>

        <button className="action-bar-button warning" onClick={onAddCart}>
          加入购物车
        </button>
        <button className="action-bar-button danger" onClick={onBuyNow}>
          立即购买
        </button>
      </div>
    </div>
  );
}
