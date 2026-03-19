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
  return (
    <div
      style={{
        marginTop: "16px",
        paddingTop: "12px",
        borderTop: "1px solid #eee",
      }}
    >
      <div>全选：{isAllSelected ? "是" : "否"}</div>
      <div>已选商品数量：{selectedCount}</div>
      <div>总金额：¥ {totalPrice}</div>

      <button>{isEditing ? "删除" : "去结算"}</button>
    </div>
  );
};

export default CartFooter;
