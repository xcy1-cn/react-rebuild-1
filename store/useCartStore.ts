import { create } from "zustand";
import {
  getCartAdd,
  getCartList,
  getCartUpdate,
  getCartClear,
  getCartTotal,
} from "@/api/cart";
import type { CartItem, ReqCartAdd, ReqCartUpdate } from "@/types/cart";

type CartStore = {
  cartList: CartItem[];
  cartTotal: number;
  loading: boolean;
  adding: boolean;
  error: string | null;

  fetchCartList: () => Promise<void>;
  fetchCartTotal: () => Promise<void>;
  addToCart: (payload: ReqCartAdd) => Promise<boolean>;
  updateGoodsNum: (
    goodsId: string | number,
    goodsNum: number,
  ) => Promise<boolean>;
  clearCartItems: (cartIds: Array<string | number>) => Promise<boolean>;
  clearCartState: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cartList: [],
  cartTotal: 0,
  loading: false,
  adding: false,
  error: null,

  fetchCartList: async () => {
    try {
      set({ loading: true, error: null });
      const res = await getCartList();

      set({
        cartList: res.list || [],
        loading: false,
      });
    } catch (error) {
      console.log("fetchCartList error:", error);
      set({
        loading: false,
        error: "获取购物车列表失败",
      });
    }
  },

  fetchCartTotal: async () => {
    try {
      const res = await getCartTotal();

      set({
        cartTotal: res.total || 0,
      });
    } catch (error) {
      console.log("fetchCartTotal error:", error);
      set({
        error: "获取购物车数量失败",
      });
    }
  },

  addToCart: async (payload) => {
    try {
      set({
        adding: true,
        error: null,
      });

      await getCartAdd(payload);

      const totalRes = await getCartTotal();

      set({
        cartTotal: totalRes.total || 0,
        adding: false,
      });

      return true;
    } catch (error) {
      console.log("addToCart error:", error);
      set({
        adding: false,
        error: "加入购物车失败",
      });
      return false;
    }
  },

  updateGoodsNum: async (goodsId, goodsNum) => {
    try {
      set({ error: null });

      const payload: ReqCartUpdate = {
        goodsId,
        goodsNum,
        goodsSkuId: '0',
      };

      await getCartUpdate(payload);

      const [listRes, totalRes] = await Promise.all([
        getCartList(),
        getCartTotal(),
      ]);

      set({
        cartList: listRes.list || [],
        cartTotal: totalRes.total || 0,
      });

      return true;
    } catch (error) {
      console.log("updateGoodsNum error:", error);
      set({
        error: "更新购物车商品数量失败",
      });
      return false;
    }
  },

  clearCartItems: async (cartIds) => {
    try {
      set({ error: null });

      await getCartClear(cartIds);

      const [listRes, totalRes] = await Promise.all([
        getCartList(),
        getCartTotal(),
      ]);

      set({
        cartList: listRes.list || [],
        cartTotal: totalRes.total || 0,
      });

      return true;
    } catch (error) {
      console.log("clearCartItems error:", error);
      set({
        error: "删除购物车商品失败",
      });
      return false;
    }
  },

  clearCartState: () => {
    set({
      cartList: [],
      cartTotal: 0,
      loading: false,
      adding: false,
      error: null,
    });
  },
}));
