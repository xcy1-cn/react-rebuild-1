import { useCartStore } from "../../store/useCartStore";

interface Props {
  isEditing: boolean;
  selectedCount: number;
  totalPrice: number;
  isAllSelected: boolean;
}

const CartFooter = ({
  isEditing,
  selectedCount,
  totalPrice,
  isAllSelected,
}: Props) => {
  const toggleAllSelected = useCartStore((s) => s.toggleAllSelected);
  const clearCart = useCartStore((s) => s.clearCart);

  return (
    <div
      style={{
        marginTop: "16px",
        paddingTop: "12px",
        borderTop: "1px solid #eee",
      }}
    >
      <label>
        <input
          type="checkbox"
          checked={isAllSelected}
          onChange={(e) => toggleAllSelected(e.target.checked)}
        />
        全选
      </label>

      <div>已选商品数量：{selectedCount}</div>
      <div>总金额：¥ {totalPrice}</div>

      <button onClick={isEditing ? clearCart : undefined}>
        {isEditing ? "删除所选/清空" : "去结算"}
      </button>
    </div>
  );
};

export default CartFooter;
