import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* 顶部 */}
      <header>
        <h3>电商项目</h3>
      </header>

      {/* 内容 */}
      <main>
        <Outlet />
      </main>

      {/* 底部导航 */}
      <footer>
        <Link to="/">首页</Link>
        <Link to="/category">分类</Link>
        <Link to="/cart">购物车</Link>
        <Link to="/profile">我的</Link>
      </footer>
    </div>
  );
};

export default Layout;
