import CartItem from "./CartItem";

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
  cartList: CartItemType[];
  checkedIds: Array<number | string>;
  onToggleItem: (id: number | string) => void;
  onPlus: (goodsId: number | string) => void;
  onMinus: (goodsId: number | string) => void;
};

export default function CartList({
  cartList,
  checkedIds,
  onToggleItem,
  onPlus,
  onMinus,
}: Props) {
  return (
    <div className="cart-list">
      {cartList.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          checked={checkedIds.includes(item.id)}
          onToggleItem={onToggleItem}
          onPlus={onPlus}
          onMinus={onMinus}
        />
      ))}
    </div>
  );
}
