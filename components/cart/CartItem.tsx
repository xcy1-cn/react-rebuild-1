// import type { CartItem as CartItemType } from "@/types/cart";

import { useCartStore } from "@/store/useCartStore";

type CartId = string | number;
type Props = {
  id: CartId;
  checked: boolean;
  onToggleItem: (id: string | number) => void;
  onChangeGoodsNum: (goodsId: string | number, num: number) => void;
};

export default function CartItem({ id, checked, onToggleItem, onChangeGoodsNum }: Props) {

  const item = useCartStore((state) => state.cartItemsMap[id]);

  if (!item) return null;
  return (
    <div className="cart-item">
      {/* checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggleItem(id)}
      />

      {/* image */}
      <img src={item.goods.goods_image} alt="" className="cart-item-img" />

      {/* info */}
      <div className="cart-item-info">
        <h3>{item.goods.goods_name}</h3>

        <div className="cart-item-bottom">
          <span className="price">￥{item.goods.goods_price_max}</span>

          {/* stepper */}
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
