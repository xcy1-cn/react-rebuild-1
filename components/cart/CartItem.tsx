import type { CartItem as CartItemType } from "../../types/cart";

interface Props {
  item: CartItemType;
}

const CartItem = ({ item }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        padding: "12px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <input type="checkbox" checked={item.selected} readOnly />

      <img
        src={item.image}
        alt={item.goodsName}
        width={80}
        height={80}
        style={{ objectFit: "cover" }}
      />

      <div>
        <div>{item.goodsName}</div>
        <div>¥ {item.price}</div>
        <div>数量：{item.goodsNum}</div>
      </div>
    </div>
  );
};

export default CartItem;
