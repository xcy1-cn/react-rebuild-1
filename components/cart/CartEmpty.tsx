import { useNavigate } from "react-router-dom";

type Props = {
  type?: "empty" | "not-login";
};

export default function CartEmpty({ type = "empty" }: Props) {
  const navigate = useNavigate();

  if (type === "not-login") {
    return (
      <div className="cart-empty">
        <p>您还未登录，请先登录</p>
        <button onClick={() => navigate("/login")}>去登录</button>
      </div>
    );
  }

  return (
    <div className="cart-empty">
      <p>购物车是空的，快去逛逛吧</p>
      <button onClick={() => navigate("/")}>去逛逛</button>
    </div>
  );
}
