import { useState } from "react";
import { Carousel } from "antd";

type ProductHeaderProps = {
  detail: any;
};

export default function ProductHeader({ detail }: ProductHeaderProps) {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <div className="nav">
        <div className="nav-bar">
          <button className="nav-back" onClick={() => window.history.back()}>
            ←
          </button>
          <div className="nav-title">商品详情页</div>
        </div>
      </div>

      <div className="goodDetail-swiper">
        <div className="my-swipe">
          <Carousel autoplay dots afterChange={(index) => setCurrent(index)}>
            {detail?.goods_images?.length ? (
              detail.goods_images.map((item: any) => (
                <div key={item.file_id}>
                  <div className="swiper-item">
                    <img src={item.external_url} alt="" />
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div className="swiper-item">
                  <img src={detail?.goods_image} alt="" />
                </div>
              </div>
            )}
          </Carousel>

          <div className="custom-indicator">
            {detail?.goods_images?.length
              ? `${current + 1}/${detail.goods_images.length}`
              : "1/1"}
          </div>
        </div>
      </div>

      <div className="goodDetail-info">
        <div className="goodDetail-info-price">
          <div className="price">
            <span className="goods-price">¥{detail?.goods_price_max}</span>
            <span className="goods-sales">¥{detail?.line_price_max}</span>
          </div>
          <div className="sales">已售{detail?.goods_sales}件</div>
        </div>

        <div className="item1">
          <div className="info">
            <h3>{detail?.goods_name}</h3>
          </div>
        </div>
      </div>
    </>
  );
}
