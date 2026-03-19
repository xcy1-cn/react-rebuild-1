interface Props {
  totalCount: number;
  isEditing: boolean;
  onToggleEditing: () => void;
}

const CartHeader = ({ totalCount, isEditing, onToggleEditing }: Props) => {
  return (
    <div>
      <h2>购物车</h2>
      <div>共 {totalCount} 件商品</div>
      <button onClick={onToggleEditing}>{isEditing ? "完成" : "编辑"}</button>
    </div>
  );
};

export default CartHeader;
