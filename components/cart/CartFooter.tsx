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
      <div className="cart-footer__left">
        <label>
          <input type="checkbox" checked={isCheckAll} onChange={onToggleAll} />
          全选
        </label>
      </div>

      <div className="cart-footer__right">
        <span>合计：</span>
        <span className="red">
          <span style={{ fontSize: 18 }}>￥</span>
          {totalPrice}.00
        </span>

        {edit ? (
          <button
            className="cart-footer__btn"
            disabled={disabled}
            onClick={onCheckout}
          >
            {totalPrice !== 0 ? `去结算 (${checkedCount})` : "去结算"}
          </button>
        ) : (
          <button
            className="cart-footer__btn"
            disabled={disabled}
            onClick={onDelete}
          >
            删除
          </button>
        )}
      </div>
    </div>
  );
}
