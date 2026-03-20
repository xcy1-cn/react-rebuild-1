import { Link } from "react-router-dom";
import '@/components/home/Home.scss'

type Props = {
  goods: any[];
  loading: boolean;
};

export default function HomeGoods({ goods, loading }: Props) {
  return (
    <div className="home-page-guess-u-like">
      <div className="home-page-guess-u-like-title">
        <span>—— 猜你喜欢 ——</span>
      </div>

      {loading ? (
        <div>加载中...</div>
      ) : (
        <div className="home-page-guess-u-like-items">
          {goods.map((item) => (
            <div className="item" key={item.goods_id}>
              <div className="left">
                <Link to={`/good/detail?goodsId=${item.goods_id}`}>
                  <img src={item.goods_image} />
                </Link>
              </div>

              <div className="right">
                <h3>{item.goods_name}</h3>

                <div className="sold">已售{item.goods_sales}件</div>

                <div className="price">
                  <span className="goods-price">¥{item.goods_price_max}</span>
                  <span className="goods-sales">¥{item.line_price_max}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
