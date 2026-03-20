type Props = {
  total: number;
  edit: boolean;
  showAction: boolean;
  onToggleEdit: () => void;
};

export default function CartHeader({
  total,
  edit,
  showAction,
  onToggleEdit,
}: Props) {
  return (
    <div className="cart-header">
      <div className="cart-header-left">
        <h2>购物车</h2>
      </div>

      {showAction && (
        <div className="cart-header-right">
          <span>共 {total} 件商品</span>
          <button onClick={onToggleEdit}>{edit ? "编辑" : "完成"}</button>
        </div>
      )}
    </div>
  );
}
