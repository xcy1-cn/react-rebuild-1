import { Link } from "react-router-dom";
import emptyImg from "@/assets/empty.png";

export default function CartEmpty() {
  return (
    <div className="cart-empty">
      <img src={emptyImg} alt="empty" />
      <div>您的购物车是空的，快去逛逛吧</div>
      <Link to="/home" className="cart-empty__btn">
        去逛逛
      </Link>
    </div>
  );
}
