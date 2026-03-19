import { useState } from "react";
import CartHeader from "../../components/cart/CartHeader";
import CartList from "../../components/cart/CartList";
import CartFooter from "../../components/cart/CartFooter";
import type { CartItem } from "../../types/cart";

const mockCartList: CartItem[] = [
  {
    goodsId: 1,
    goodsName: "苹果 15 Pro Max",
    price: 8999,
    goodsNum: 1,
    selected: true,
    image: "https://via.placeholder.com/80",
    goodsSkuId: "0",
  },
  {
    goodsId: 2,
    goodsName: "华为 Mate 60",
    price: 6999,
    goodsNum: 2,
    selected: false,
    image: "https://via.placeholder.com/80",
    goodsSkuId: "0",
  },
];

const CartPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const selectedItems = mockCartList.filter((item) => item.selected);
  const selectedCount = selectedItems.reduce(
    (sum, item) => sum + item.goodsNum,
    0,
  );
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.goodsNum * item.price,
    0,
  );
  const isAllSelected =
    mockCartList.length > 0 && mockCartList.every((item) => item.selected);

  return (
    <div>
      <CartHeader
        totalCount={mockCartList.length}
        isEditing={isEditing}
        onToggleEditing={() => setIsEditing((prev) => !prev)}
      />

      <CartList list={mockCartList} />

      <CartFooter
        isEditing={isEditing}
        selectedCount={selectedCount}
        totalPrice={totalPrice}
        isAllSelected={isAllSelected}
      />
    </div>
  );
};

export default CartPage;
