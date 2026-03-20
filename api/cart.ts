import type {
  ReqCartAdd,
  RepCartAdd,
  RepCartList,
  ReqCartUpdate,
  RepCartUpdate,
  RepCartClear,
  RepCartTotal,
} from "@/types/cart";
import { request } from "@/utils/request";

// 添加商品到购物车
export const getCartAdd = (data: ReqCartAdd) =>
  request<RepCartAdd>("cart/add", "post", {
    ...data
  });

// 获取购物车商品列表
export const getCartList = () => request<RepCartList>("cart/list", "get");

// 更新购物车商品数量
export const getCartUpdate = (data: ReqCartUpdate) =>
  request<RepCartUpdate>("cart/update", "post", {
    ...data,
  });

// 删除购物车商品
export const getCartClear = (cartIds: Array<string | number>) =>
  request<RepCartClear>("cart/clear", "post", {
    cartIds,
  });

// 获取购物车商品总数量
export const getCartTotal = () => request<RepCartTotal>("cart/total", "get");
