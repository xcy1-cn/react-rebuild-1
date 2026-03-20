type Props = {
  totalNum: number;
  edit: boolean;
  showAction: boolean;
  onToggleEdit: () => void;
};

export default function CartHeader({
  totalNum,
  edit,
  showAction,
  onToggleEdit,
}: Props) {
  return (
    <div className="cart-header">
      <div className="cart-header__title">购物车</div>

      {showAction && (
        <div className="cart-header__toolbar">
          <span>
            共<span className="red">{totalNum}</span>件商品
          </span>

          {edit ? (
            <span className="cart-header__action" onClick={onToggleEdit}>
              编辑
            </span>
          ) : (
            <span className="cart-header__action red" onClick={onToggleEdit}>
              完成
            </span>
          )}
        </div>
      )}
    </div>
  );
}
