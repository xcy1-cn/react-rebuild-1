import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  User,
  Mobile,
  UserInfo,
  UserBalance,
  UserGoods,
} from "@/types/user";

type UserStore = {
  user?: User;
  mobile?: Mobile;
  myInfo?: UserInfo;
  assets?: UserBalance;
  counts?: UserGoods;

  setUser: (user: User) => void;
  delUser: () => void;

  setMobile: (mobile: string) => void;
  delMobile: () => void;

  setMyInfo: (info: UserInfo) => void;
  delMyInfo: () => void;

  setAssets: (assets: UserBalance) => void;
  delAssets: () => void;

  setCounts: (counts: UserGoods) => void;
  delCounts: () => void;

  clearUserState: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: undefined,
      mobile: undefined,
      myInfo: undefined,
      assets: undefined,
      counts: undefined,

      setUser: (user) => set({ user }),
      delUser: () => set({ user: undefined }),

      setMobile: (mobile) => set({ mobile }),
      delMobile: () => set({ mobile: undefined }),

      setMyInfo: (myInfo) => set({ myInfo }),
      delMyInfo: () => set({ myInfo: undefined }),

      setAssets: (assets) => set({ assets }),
      delAssets: () => set({ assets: undefined }),

      setCounts: (counts) => set({ counts }),
      delCounts: () => set({ counts: undefined }),

      clearUserState: () =>
        set({
          user: undefined,
          mobile: undefined,
          myInfo: undefined,
          assets: undefined,
          counts: undefined,
        }),
    }),
    {
      name: "zhi-hui-user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
