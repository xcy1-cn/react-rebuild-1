import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCartStore } from "@/store/useCartStore";
import type { CartItem } from "@/types/cart";

import CartHeader from "@/components/cart/CartHeader";
import CartEmpty from "@/components/cart/CartEmpty";
import CartList from "@/components/cart/CartList";
import CartFooter from "@/components/cart/CartFooter";

import "./cart.scss";

export default function CartPage() {
  const navigate = useNavigate();

  const cartList = useCartStore((state) => state.cartList);
  const cartTotal = useCartStore((state) => state.cartTotal);
  const loading = useCartStore((state) => state.loading);
  const error = useCartStore((state) => state.error);

  const fetchCartList = useCartStore((state) => state.fetchCartList);
  const fetchCartTotal = useCartStore((state) => state.fetchCartTotal);
  const updateGoodsNum = useCartStore((state) => state.updateGoodsNum);
  const clearCartItems = useCartStore((state) => state.clearCartItems);

  // localStorage 登录态
  const [token, setToken] = useState<string | null>(null);

  // true: 编辑 / 结算模式
  // false: 删除模式
  const [edit, setEdit] = useState(true);

  // 当前勾选的购物车项 id
  const [checkedIds, setCheckedIds] = useState<Array<string | number>>([]);

  // 首次读取 token
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
  }, []);

  // 有 token 才请求购物车数据
  useEffect(() => {
    if (!token) return;

    const init = async () => {
      await Promise.all([fetchCartList(), fetchCartTotal()]);
    };

    init();
  }, [token, fetchCartList, fetchCartTotal]);

  // 当 cartList 更新时，过滤掉已失效的勾选项
  useEffect(() => {
    setCheckedIds((prev) =>
      prev.filter((id) => cartList.some((item) => item.id === id)),
    );
  }, [cartList]);

  // 未登录
  const notLogin = !token;

  // 已登录但购物车为空
  const isEmpty = !!token && !loading && cartList.length === 0;

  const isCheckAll = useMemo(() => {
    return cartList.length > 0 && checkedIds.length === cartList.length;
  }, [cartList, checkedIds]);

  const totalPrice = useMemo(() => {
    return cartList.reduce((sum: number, item: CartItem) => {
      if (!checkedIds.includes(item.id)) return sum;
      return sum + item.goods_num * item.goods.goods_price_max;
    }, 0);
  }, [cartList, checkedIds]);

  const checkedCount = useMemo(() => {
    return cartList.reduce((sum: number, item: CartItem) => {
      if (!checkedIds.includes(item.id)) return sum;
      return sum + item.goods_num;
    }, 0);
  }, [cartList, checkedIds]);

  const handleToggleEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleToggleItem = (id: string | number) => {
    setCheckedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      }
      return [...prev, id];
    });
  };

  const handleToggleAll = () => {
    if (isCheckAll) {
      setCheckedIds([]);
    } else {
      setCheckedIds(cartList.map((item) => item.id));
    }
  };

  const handleCheckout = () => {
    if (!checkedIds.length) return;
    navigate(`/checkout/order?ids=${checkedIds.join(",")}&mode=cart`);
  };

  const handleDelete = async () => {
    if (!checkedIds.length) return;

    const ok = window.confirm("您确定要删除选中的商品吗？");
    if (!ok) return;

    const success = await clearCartItems(checkedIds);
    if (!success) return;

    setCheckedIds([]);
  };

  const handleChangeGoodsNum = async (
    goodsId: string | number,
    nextGoodsNum: number,
  ) => {
    if (nextGoodsNum < 1) return;
    await updateGoodsNum(goodsId, nextGoodsNum);
  };

  return (
    <div className="cart-page">
      <CartHeader
        total={cartTotal}
        edit={edit}
        showAction={!notLogin && !isEmpty}
        onToggleEdit={handleToggleEdit}
      />

      {notLogin ? (
        <CartEmpty type="not-login" />
      ) : isEmpty ? (
        <CartEmpty type="empty" />
      ) : (
        <>
          <CartList
            cartList={cartList}
            checkedIds={checkedIds}
            loading={loading}
            onToggleItem={handleToggleItem}
            onChangeGoodsNum={handleChangeGoodsNum}
          />

          <CartFooter
            edit={edit}
            isCheckAll={isCheckAll}
            totalPrice={totalPrice}
            checkedCount={checkedCount}
            disabled={checkedIds.length === 0}
            onToggleAll={handleToggleAll}
            onCheckout={handleCheckout}
            onDelete={handleDelete}
          />
        </>
      )}

      {error && <div className="cart-page__error">{error}</div>}
    </div>
  );
}
