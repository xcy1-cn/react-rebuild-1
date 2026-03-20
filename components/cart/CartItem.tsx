import type { CartItem as CartItemType } from "../../types/cart";
import { useCartStore } from "../../store/useCartStore";
import React from "react";

interface Props {
  item: CartItemType;
  isEditing: boolean;
}

const CartItem = ({ item, isEditing }: Props) => {
  const toggleSelected = useCartStore((s) => s.toggleSelected);
  const updateGoodsNum = useCartStore((s) => s.updateGoodsNum);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        padding: "12px 0",
        borderBottom: "1px solid #eee",
        alignItems: "center",
      }}
    >
      <input
        type="checkbox"
        checked={item.selected}
        onChange={() => toggleSelected(item.goodsId)}
      />

      <img
        src={item.image}
        alt={item.goodsName}
        width={80}
        height={80}
        style={{ objectFit: "cover" }}
      />

      <div style={{ flex: 1 }}>
        <div>{item.goodsName}</div>
        <div>¥ {item.price}</div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => updateGoodsNum(item.goodsId, item.goodsNum - 1)}
          >
            -
          </button>
          <span>{item.goodsNum}</span>
          <button
            onClick={() => updateGoodsNum(item.goodsId, item.goodsNum + 1)}
          >
            +
          </button>
        </div>
      </div>

      {isEditing && (
        <button onClick={() => removeFromCart(item.goodsId)}>删除</button>
      )}
    </div>
  );
};

export default React.memo(CartItem);
