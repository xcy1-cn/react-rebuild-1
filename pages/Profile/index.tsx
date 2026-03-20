import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUserStore } from "@/store/useUserStore";
import { getUserInfo, getUserBalance, getUserCounts } from "@/api/user";

import defaultAvatar from "@/assets/default-avatar.png";
import userHeaderBg from "@/assets/background/user-header2.png";

import "./index.scss";

type Item = {
  label: string;
  path: string;
  icon?: string;
  icons?: string;
};

export default function MyPage() {
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const mobile = useUserStore((state) => state.mobile);
  const myInfo = useUserStore((state) => state.myInfo);
  const assets = useUserStore((state) => state.assets);

  const setMyInfo = useUserStore((state) => state.setMyInfo);
  const setAssets = useUserStore((state) => state.setAssets);
  const setCounts = useUserStore((state) => state.setCounts);
  const clearUserState = useUserStore((state) => state.clearUserState);

  const token = user?.token;

  const orders: Item[] = [
    {
      label: "全部订单",
      path: "/my/order?orderType=all",
      icon: "description-o",
    },
    {
      label: "待支付",
      path: "/my/order?orderType=payment",
      icon: "pending-payment",
    },
    {
      label: "待发货",
      path: "/my/order?orderType=delivery",
      icon: "logistics",
    },
    {
      label: "待收货",
      path: "/my/order?orderType=received",
      icon: "send-gift-o",
    },
  ];

  const services1: Item[] = [
    { label: "收货地址", path: "/address", icons: "location-o" },
    { label: "领券中心", path: "/my/couponsCenter", icons: "gift-o" },
    { label: "优惠券", path: "/my/coupons", icons: "coupon-o" },
    { label: "我的帮助", path: "/my/help", icons: "question-o" },
  ];

  const services2: Item[] = [
    { label: "我的积分", path: "/my/integral", icons: "gold-coin-o" },
    { label: "退换/售后", path: "/my/returns", icons: "refund-o" },
  ];

  const maskedMobile = useMemo(() => {
    if (!mobile) return "未登录";
    return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
  }, [mobile]);

  const loginText = useMemo(() => {
    if (!mobile) return "点击登录账号";
    return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
  }, [mobile]);

  const fetchUserData = async () => {
    if (!token) return;

    try {
      const [userRes, balanceRes, countsRes] = await Promise.all([
        getUserInfo(token),
        getUserBalance(token),
        getUserCounts(token),
      ]);

      setMyInfo(userRes.data?.userInfo);
      setAssets(balanceRes.data?.assets);
      setCounts(countsRes.data?.counts);
    } catch (error) {
      console.log("fetchUserData error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handleLogin = () => {
    if (token) return;
    navigate("/login");
  };

  const handleLogout = () => {
    const ok = window.confirm("您确定要退出登录吗？");
    if (!ok) return;

    clearUserState();
  };

  return (
    <div className="my-page">
      <div
        className="my-page-top"
        style={{
          background: `url(${userHeaderBg}) no-repeat center / contain`,
        }}
      >
        <div className="my-page-top-info">
          <div className="my-page-top-info-avatar">
            <img
              src={myInfo?.avatar || defaultAvatar}
              alt="avatar"
              width={74}
              height={74}
            />
          </div>

          <div className="my-page-top-info-p" onClick={handleLogin}>
            <span>{maskedMobile}</span>
            <span>{loginText}</span>
          </div>
        </div>
      </div>

      <div className="my-page-nav">
        <div className="my-grid four-cols">
          <div className="my-grid-item">
            <Link to="/my/fount">
              <span>{assets?.balance ?? "--"}</span>
            </Link>
            <Link to="/my/fount">
              <span>账户余额</span>
            </Link>
          </div>

          <div className="my-grid-item">
            <Link to="/my/integral">
              <span>{assets?.points ?? "--"}</span>
            </Link>
            <Link to="/my/integral">
              <span>积分</span>
            </Link>
          </div>

          <div className="my-grid-item">
            <Link to="/my/coupons">
              <span>{assets?.coupon ?? "--"}</span>
            </Link>
            <Link to="/my/coupons">
              <span>优惠券</span>
            </Link>
          </div>

          <div className="my-grid-item my-grid-item--with-border">
            <Link to="/my/fount">
              <span className="icon-placeholder">💳</span>
            </Link>
            <Link to="/my/fount">
              <span>我的钱包</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="my-page-order">
        <div className="my-page-order-info">
          <div className="my-page-order-info-row">
            <div className="my-grid four-cols">
              {orders.map((item) => (
                <div className="my-grid-item" key={item.label}>
                  <Link to={item.path}>
                    <span className="icon-placeholder">
                      {renderIcon(item.icon)}
                    </span>
                  </Link>
                  <Link to={item.path}>
                    <span>{item.label}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="my-page-service">
        <div className="my-page-service-info">
          <div className="my-page-service-info-title">
            <h3>我的服务</h3>
          </div>

          <div className="my-page-service-info-row">
            <div className="row-top">
              <div className="my-grid four-cols">
                {services1.map((item) => (
                  <div className="my-grid-item" key={item.label}>
                    <Link to={item.path}>
                      <span className="icon-placeholder red">
                        {renderIcon(item.icons)}
                      </span>
                    </Link>
                    <Link to={item.path}>
                      <span>{item.label}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="row-bottom">
              <div className="my-grid four-cols">
                {services2.map((item) => (
                  <div className="my-grid-item" key={item.label}>
                    <Link to={item.path}>
                      <span className="icon-placeholder red">
                        {renderIcon(item.icons)}
                      </span>
                    </Link>
                    <Link to={item.path}>
                      <span>{item.label}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {!!token && (
        <div className="my-page-quit" onClick={handleLogout}>
          <div className="my-page-quit-text">
            <span>退出登录</span>
          </div>
        </div>
      )}
    </div>
  );
}

function renderIcon(name?: string) {
  switch (name) {
    case "description-o":
      return "📄";
    case "pending-payment":
      return "💰";
    case "logistics":
      return "📦";
    case "send-gift-o":
      return "🎁";
    case "location-o":
      return "📍";
    case "gift-o":
      return "🎀";
    case "coupon-o":
      return "🏷️";
    case "question-o":
      return "❓";
    case "gold-coin-o":
      return "🪙";
    case "refund-o":
      return "↩️";
    default:
      return "◻️";
  }
}
