import CartItem from "./CartItem"
import type { CartItem as CartItemType } from "../../types/cart"

interface Props {
  list: CartItemType[]
  isEditing: boolean
}

const CartList = ({ list, isEditing }: Props) => {
  return (
    <div>
      {list.map((item) => (
        <CartItem key={item.goodsId} item={item} isEditing={isEditing} />
      ))}
    </div>
  )
}

export default CartList