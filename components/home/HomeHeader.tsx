import { Link } from "react-router-dom";
import "@/components/home/Home.scss";
import { Carousel } from "antd";
import "antd/dist/reset.css";

type Props = {
  pics: any[];
  loading: boolean;
};

export default function HomeHeader({ pics, loading }: Props) {
  return (
    <>
      <div className="home-page-title">智慧商城</div>

      <div className="home-page-search">
        <Link to="/search">搜索商品</Link>
      </div>

      <div className="home-page-swiper">
        {loading ? (
          <div>加载中...</div>
        ) : (
          <Carousel autoplay dots>
            {pics.map((item) => (
              <div key={item.imgName}>
                <img src={item.imgUrl} alt={item.imgName} />
              </div>
            ))}
          </Carousel>
        )}
      </div>

      <div className="home-page-scrollTaps">
        <p className="volume">🔊</p>
        <span>智慧商城2.0全新上线，更多新品等你来选~</span>
      </div>
    </>
  );
}
