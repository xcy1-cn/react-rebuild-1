import type { CartItem } from "@/types/cart";

type Props = {
  cartList: CartItem[];
  checkedIds: Array<string | number>;
  loading: boolean;

  onToggleItem: (id: string | number) => void;
  onChangeGoodsNum: (goodsId: string | number, num: number) => void;
};

export default function CartList({
  cartList,
  checkedIds,
  loading,
  onToggleItem,
  onChangeGoodsNum,
}: Props) {
  if (loading) {
    return <div className="cart-loading">加载中...</div>;
  }

  return (
    <div className="cart-list">
      {cartList.map((item) => {
        const checked = checkedIds.includes(item.id);

        return (
          <div className="cart-item" key={item.id}>
            {/* checkbox */}
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggleItem(item.id)}
            />

            {/* image */}
            <img
              src={item.goods.goods_image}
              alt=""
              className="cart-item-img"
            />

            {/* info */}
            <div className="cart-item-info">
              <h3>{item.goods.goods_name}</h3>

              <div className="cart-item-bottom">
                <span className="price">￥{item.goods.goods_price_max}</span>

                {/* stepper */}
                <div className="stepper">
                  <button
                    onClick={() =>
                      onChangeGoodsNum(item.goods_id, item.goods_num - 1)
                    }
                  >
                    -
                  </button>

                  <span>{item.goods_num}</span>

                  <button
                    onClick={() =>
                      onChangeGoodsNum(item.goods_id, item.goods_num + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
