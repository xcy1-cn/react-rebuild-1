import { Outlet, Link } from "react-router-dom";
import './Layout.scss'
import { AppstoreOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

const Layout = () => {
  return (
    <div>
      {/* 内容 */}
      <main>
        <div className="content">
          <Outlet />
        </div>
      </main>

      {/* 底部导航 */}
      <footer>
        <div className="footer">
          <Link to="/">
            <div className="icon">
              <HomeOutlined />
              首页
            </div>
          </Link>
          <Link to="/category">
            <div className="icon">
              <AppstoreOutlined />
              AI推荐
            </div>
          </Link>
          <Link to="/cart">
            <div className="icon">
              <ShoppingCartOutlined />
              购物车
            </div>
          </Link>
          <Link to="/profile">
            <div className="icon">
              <UserOutlined />
              我的
            </div>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
