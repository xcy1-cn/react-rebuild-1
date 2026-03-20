import { useEffect, useState } from "react";
import { getHomeData } from "@/api/home";

import HomeHeader from "@/components/home/HomeHeader";
import HomeMain from "@/components/home/HomeMain";
import HomeGoods from "@/components/home/HomeGoods";
// import "@/components/home/Home.scss";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  const [pics, setPics] = useState<any[]>([]);
  const [navs, setNavs] = useState<any[]>([]);
  const [discountPic, setDiscountPic] = useState<any>(null);
  const [goods, setGoods] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getHomeData();

        const items = res?.pageData?.items || [];
        console.log(res);
        
        setPics(items[1]?.data || []);
        setNavs(items[3]?.data || []);
        setDiscountPic(items[4] || null);
        setGoods(items[6]?.data || []);
      } catch (err) {
        console.log("接口错误", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <HomeHeader pics={pics} loading={loading} />

      <main className="home-main">
        <HomeMain navs={navs} discountPic={discountPic} loading={loading} />
        <HomeGoods goods={goods} loading={loading} />
      </main>
    </div>
  );
}
