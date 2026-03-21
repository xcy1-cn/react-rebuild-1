import CartItem from "@/components/cart/CartItem";

type CartId = string | number;

type Props = {
  cartIds: CartId[];
  checkedIds: Array<string | number>;
  loading: boolean;
  onToggleItem: (id: string | number) => void;
  onChangeGoodsNum: (goodsId: string | number, num: number) => void;
};

export default function CartList({
  cartIds,
  checkedIds,
  loading,
  onToggleItem,
  onChangeGoodsNum,
}: Props) {
  if (loading) {
    return <div className="cart-loading">加载中...</div>;
  }

  return (
    <div className="cart-list">
      {cartIds.map((id) => {
        const checked = checkedIds.includes(id);

        return (
          <CartItem
            key={id}
            id={id}
            checked={checked}
            onToggleItem={onToggleItem}
            onChangeGoodsNum={onChangeGoodsNum}
          />
        );
      })}
    </div>
  );
}
