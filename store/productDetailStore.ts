import { create } from "zustand";
import {
  getGoodDetail,
  getGoodService,
  getGoodCommentListRows,
  getGoodCommentTotal,
} from "@/api/productDetail";

type ProductDetailStore = {
  detail: any | null;
  serviceList: any[];
  commentRows: any[];
  commentTotal: number;
  loading: boolean;
  error: string;

  fetchProductDetailPageData: (goodsId: string | number) => Promise<void>;
  clearProductDetailData: () => void;
};

const initialState = {
  detail: null,
  serviceList: [],
  commentRows: [],
  commentTotal: 0,
  loading: false,
  error: "",
};

export const useProductDetailStore = create<ProductDetailStore>((set) => ({
  ...initialState,

  fetchProductDetailPageData: async (goodsId) => {
    try {
      set({
        loading: true,
        error: "",
      });

      const [detailRes, serviceRes, commentRes, totalRes] = await Promise.all([
        getGoodDetail(goodsId),
        getGoodService(goodsId),
        getGoodCommentListRows(goodsId),
        getGoodCommentTotal(goodsId),
      ]);

      set({
        detail: detailRes.detail || null,
        serviceList: serviceRes.list || [],
        commentRows: commentRes.list || [],
        commentTotal: totalRes.total?.all || 0,
        loading: false,
      });
    } catch (error) {
      console.log("fetchProductDetailPageData error:", error);

      set({
        loading: false,
        error: "商品详情页数据获取失败",
      });
    }
  },

  clearProductDetailData: () => {
    set({ ...initialState });
  },
}));
