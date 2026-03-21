import { useCartStore } from "@/store/useCartStore";
import { memo } from "react";

type CartId = string | number;

type Props = {
  id: CartId;
  checked: boolean;
  onToggleItem: (id: string | number) => void;
  onChangeGoodsNum: (goodsId: string | number, num: number) => void;
};

 function CartItem({
  id,
  checked,
  onToggleItem,
  onChangeGoodsNum,
}: Props) {
  console.log('render cart item:', id);
  
  const item = useCartStore((state) => state.cartItemsMap[id]);

  if (!item) return null;

  return (
    <div className="cart-item">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggleItem(id)}
      />

      <img src={item.goods.goods_image} alt="" className="cart-item-img" />

      <div className="cart-item-info">
        <h3>{item.goods.goods_name}</h3>

        <div className="cart-item-bottom">
          <span className="price">￥{item.goods.goods_price_max}</span>

          <div className="stepper">
            <button
              onClick={() =>
                onChangeGoodsNum(item.goods_id, item.goods_num - 1)
              }
            >
              -
            </button>

            <span>{item.goods_num}</span>

            <button
              onClick={() =>
                onChangeGoodsNum(item.goods_id, item.goods_num + 1)
              }
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CartItem);