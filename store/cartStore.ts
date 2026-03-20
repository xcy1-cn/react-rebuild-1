import { create } from "zustand";
import {
  getCartAdd,
  getCartList,
  getCartUpdate,
  getCartClear,
  getCartTotal,
} from "@/api/cart";

type AddCartPayload = {
  goodsId: string | number;
  goodsNum: number;
  goodsSkuId?: string | number;
};

type UpdateCartPayload = {
  goodsId: string | number;
  goodsNum: number;
};

type CartStore = {
  cartList: any[];
  cartTotal: number;
  loading: boolean;
  adding: boolean;
  error: string;

  fetchCartList: () => Promise<void>;
  fetchCartTotal: () => Promise<void>;
  addToCart: (payload: AddCartPayload) => Promise<boolean>;
  updateGoodsNum: (
    goodsId: string | number,
    goodsNum: number,
  ) => Promise<boolean>;
  clearCartItems: (cartIds: string | number[]) => Promise<boolean>;
};

export const useCartStore = create<CartStore>((set) => ({
  cartList: [],
  cartTotal: 0,
  loading: false,
  adding: false,
  error: "",

  fetchCartList: async () => {
    try {
      set({ loading: true, error: "" });
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
    }
  },

  addToCart: async (payload) => {
    try {
      set({
        adding: true,
        error: "",
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
      await getCartUpdate({
        goodsId,
        goodsNum,
      } as any);

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
      return false;
    }
  },

  clearCartItems: async (cartIds) => {
    try {
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
      return false;
    }
  },
}));
