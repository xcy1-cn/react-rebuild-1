import CartItem from "./CartItem";
import type { CartItem as CartItemType } from "../../types/cart";

interface Props {
  list: CartItemType[];
}

const CartList = ({ list }: Props) => {
  return (
    <div>
      {list.map((item) => (
        <CartItem key={item.goodsId} item={item} />
      ))}
    </div>
  );
};

export default CartList;
