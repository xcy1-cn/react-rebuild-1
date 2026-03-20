import { useEffect, useState } from "react";
import CartHeader from "../../components/cart/CartHeader";
import CartList from "../../components/cart/CartList";
import CartFooter from "../../components/cart/CartFooter";
import { useCartStore } from "../../store/useCartStore";

const CartPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const cartItems = useCartStore((s) => s.cartItems);
  const seedCart = useCartStore((s) => s.seedCart);

  useEffect(() => {
    if (cartItems.length === 0) {
      seedCart();
    }
  }, [cartItems.length, seedCart]);

  const selectedItems = cartItems.filter((item) => item.selected);

  const selectedCount = selectedItems.reduce(
    (sum, item) => sum + item.goodsNum,
    0,
  );

  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.goodsNum * item.price,
    0,
  );

  const isAllSelected =
    cartItems.length > 0 && cartItems.every((item) => item.selected);

  return (
    <div>
      <CartHeader
        totalCount={cartItems.length}
        isEditing={isEditing}
        onToggleEditing={() => setIsEditing((prev) => !prev)}
      />

      <CartList list={cartItems} isEditing={isEditing} />

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
