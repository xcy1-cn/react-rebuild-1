type Props = {
  edit: boolean;
  isCheckAll: boolean;
  totalPrice: number;
  checkedCount: number;
  disabled: boolean;

  onToggleAll: () => void;
  onCheckout: () => void;
  onDelete: () => void;
};

export default function CartFooter({
  edit,
  isCheckAll,
  totalPrice,
  checkedCount,
  disabled,
  onToggleAll,
  onCheckout,
  onDelete,
}: Props) {
  return (
    <div className="cart-footer">
      {/* 全选 */}
      <div className="cart-footer-left">
        <input type="checkbox" checked={isCheckAll} onChange={onToggleAll} />
        <span>全选</span>
      </div>

      {/* 右侧 */}
      <div className="cart-footer-right">
        <span>
          合计：
          <b>￥{totalPrice}</b>
        </span>

        {edit ? (
          <button disabled={disabled} onClick={onCheckout}>
            去结算 ({checkedCount})
          </button>
        ) : (
          <button disabled={disabled} onClick={onDelete}>
            删除
          </button>
        )}
      </div>
    </div>
  );
}
