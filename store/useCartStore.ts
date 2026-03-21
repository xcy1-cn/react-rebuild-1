import { create } from "zustand";
import {
  getCartAdd,
  getCartList,
  getCartUpdate,
  getCartClear,
  getCartTotal,
} from "@/api/cart";
import type { CartItem, ReqCartAdd, ReqCartUpdate } from "@/types/cart";

type CartId = string | number;

type CartStore = {
  cartIds: CartId[];
  cartItemsMap: Record<CartId, CartItem>;
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
  clearCartItems: (cartIds: CartId[]) => Promise<boolean>;
  clearCartState: () => void;
};

function normalizeCartList(list: CartItem[]) {
  const cartIds: CartId[] = [];
  const cartItemsMap: Record<CartId, CartItem> = {};

  list.forEach((item) => {
    cartIds.push(item.id);
    cartItemsMap[item.id] = item;
  });

  return {
    cartIds,
    cartItemsMap,
  };
}

/**
 * 通过 goodsId 找到对应的 cartId
 * 当前 cartItemsMap 是按 cart item 的 id 建立索引的
 * 但 updateGoodsNum 组件层传进来的是 goodsId
 */
function findCartIdByGoodsId(
  cartIds: CartId[],
  cartItemsMap: Record<CartId, CartItem>,
  goodsId: string | number,
): CartId | undefined {
  return cartIds.find((cartId) => cartItemsMap[cartId]?.goods_id === goodsId);
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartIds: [],
  cartItemsMap: {},
  cartTotal: 0,
  loading: false,
  adding: false,
  error: null,

  fetchCartList: async () => {
    try {
      set({ loading: true, error: null });

      const res = await getCartList();
      const list = res.list || [];
      const { cartIds, cartItemsMap } = normalizeCartList(list);

      set({
        cartIds,
        cartItemsMap,
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

  /**
   * 高性能版本：
   * 1. 先在本地只更新当前这一项 goods_num
   * 2. 再请求后端
   * 3. 失败则回滚
   * 4. 成功后只同步 cartTotal，不重新拉整个 cartList
   */
  updateGoodsNum: async (goodsId, goodsNum) => {
    const state = get();
    const { cartIds, cartItemsMap, cartTotal } = state;

    const targetCartId = findCartIdByGoodsId(cartIds, cartItemsMap, goodsId);

    if (targetCartId === undefined) {
      set({
        error: "未找到对应的购物车商品",
      });
      return false;
    }

    const oldItem = cartItemsMap[targetCartId];
    if (!oldItem) {
      set({
        error: "购物车商品数据不存在",
      });
      return false;
    }

    if (goodsNum < 1) return false;
    if (oldItem.goods_num === goodsNum) return true;

    const prevGoodsNum = oldItem.goods_num;
    const diff = goodsNum - prevGoodsNum;

    // 先做本地局部更新：只替换当前这一项的引用
    set((currentState) => ({
      error: null,
      cartItemsMap: {
        ...currentState.cartItemsMap,
        [targetCartId]: {
          ...currentState.cartItemsMap[targetCartId],
          goods_num: goodsNum,
        },
      },
      /**
       * 如果你的 cartTotal 表示“购物车商品总件数”，这里这样更新是合理的
       * 如果你的后端 total 表示“商品种类数”，则不要在这里加 diff
       */
      cartTotal: currentState.cartTotal + diff,
    }));

    try {
      const payload: ReqCartUpdate = {
        goodsId,
        goodsNum,
        goodsSkuId: "0",
      };

      await getCartUpdate(payload);

      // 成功后只同步总数，不再拉整个购物车列表
      try {
        const totalRes = await getCartTotal();
        set({
          cartTotal: totalRes.total || 0,
        });
      } catch (error) {
        console.log("fetchCartTotal after updateGoodsNum error:", error);
      }

      return true;
    } catch (error) {
      console.log("updateGoodsNum error:", error);

      // 失败回滚：只回滚当前这一项和 cartTotal
      set((currentState) => ({
        error: "更新购物车商品数量失败",
        cartItemsMap: {
          ...currentState.cartItemsMap,
          [targetCartId]: oldItem,
        },
        cartTotal,
      }));

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

      const list = listRes.list || [];
      const { cartIds: nextCartIds, cartItemsMap } = normalizeCartList(list);

      set({
        cartIds: nextCartIds,
        cartItemsMap,
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
      cartIds: [],
      cartItemsMap: {},
      cartTotal: 0,
      loading: false,
      adding: false,
      error: null,
    });
  },
}));
