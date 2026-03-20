import { memo } from "react";
import { Link } from "react-router-dom";

type CartItemType = {
  id: number | string;
  goods_id: number | string;
  goods_num: number;
  goods: {
    goods_name: string;
    goods_image: string;
    goods_price_max: number;
    stock_total: number;
  };
};

type Props = {
  item: CartItemType;
  checked: boolean;
  onToggleItem: (id: number | string) => void;
  onPlus: (goodsId: number | string) => void;
  onMinus: (goodsId: number | string) => void;
};

function CartItem({ item, checked, onToggleItem, onPlus, onMinus }: Props) {
  return (
    <div className="cart-item">
      <div className="cart-item__check">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggleItem(item.id)}
        />
      </div>

      <div className="cart-item__image">
        <Link to={`/good/detail?goodsId=${item.goods_id}`}>
          <img src={item.goods.goods_image} alt={item.goods.goods_name} />
        </Link>
      </div>

      <div className="cart-item__info">
        <Link to={`/good/detail?goodsId=${item.goods_id}`}>
          <h3>{item.goods.goods_name}</h3>
        </Link>

        <div className="cart-item__bottom">
          <span className="red">
            <span style={{ fontSize: 18 }}>￥</span>
            {item.goods.goods_price_max}
          </span>

          <div className="cart-stepper">
            <button
              onClick={() => onMinus(item.goods_id)}
              disabled={item.goods_num <= 1}
            >
              -
            </button>
            <span>{item.goods_num}</span>
            <button
              onClick={() => onPlus(item.goods_id)}
              disabled={item.goods_num >= item.goods.stock_total}
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
