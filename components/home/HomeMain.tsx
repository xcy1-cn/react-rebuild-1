import { Link } from "react-router-dom";
import "@/components/home/Home.scss";

type Props = {
  navs: any[];
  discountPic: any;
  loading: boolean;
};

export default function HomeMain({ navs, discountPic, loading }: Props) {
  return (
    <>
      <div className="home-page-nav">
        {loading ? (
          <div>加载中...</div>
        ) : (
          <>
            <div className="home-page-nav-top">
              {navs.slice(0, 5).map((item) => (
                <div className="block" key={item.imgName}>
                  <Link to={item.link?.param?.path || "/category"}>
                    <img src={item.imgUrl} />
                  </Link>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="home-page-nav-bottom">
              {navs.slice(5).map((item) => (
                <div className="block" key={item.imgName}>
                  <Link to="/category">
                    <img src={item.imgUrl} />
                  </Link>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="home-page-discount">
        <Link to="/category">
          <img src={discountPic?.data?.[0]?.imgUrl} />
        </Link>
      </div>
    </>
  );
}
