import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../types/cart";

type AddCartPayload = Omit<CartItem, "goodsNum" | "selected">;
type CartStore = {
  cartItems: CartItem[];

  addToCart: (item: AddCartPayload) => void;
  removeFromCart: (goodsId: number) => void;
  updateGoodsNum: (goodsId: number, goodsNum: number) => void;
  toggleSelected: (goodsId: number) => void;
  toggleAllSelected: (selected: boolean) => void;
  clearCart: () => void;
  seedCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      seedCart: () => {
        set({
          cartItems: [
            {
              goodsId: 1,
              goodsName: "苹果 15 Pro Max",
              price: 8999,
              goodsNum: 1,
              selected: true,
              image: "https://via.placeholder.com/80",
              goodsSkuId: "0",
            },
            {
              goodsId: 2,
              goodsName: "华为 Mate 60",
              price: 6999,
              goodsNum: 2,
              selected: false,
              image: "https://via.placeholder.com/80",
              goodsSkuId: "0",
            },
          ],
        });
      },

      addToCart: (item) => {
        const current = get().cartItems;
        const existing = current.find((i) => i.goodsId === item.goodsId);

        if (existing) {
          set({
            cartItems: current.map((i) =>
              i.goodsId === item.goodsId
                ? { ...i, goodsNum: i.goodsNum + 1 }
                : i,
            ),
          });
          return;
        }

        set({
          cartItems: [
            ...current,
            {
              ...item,
              goodsNum: 1,
              selected: true,
            },
          ],
        });
      },

      removeFromCart: (goodsId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.goodsId !== goodsId),
        }));
      },

      updateGoodsNum: (goodsId, goodsNum) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.goodsId === goodsId
              ? { ...item, goodsNum: goodsNum < 1 ? 1 : goodsNum }
              : item,
          ),
        }));
      },

      toggleSelected: (goodsId) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.goodsId === goodsId
              ? { ...item, selected: !item.selected }
              : item,
          ),
        }));
      },

      toggleAllSelected: (selected) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) => ({
            ...item,
            selected,
          })),
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
