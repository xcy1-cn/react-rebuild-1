import type { Form, ResData } from "@/types/login";
import { request } from "@/utils/request";

// login
export const loginByMessage = (mobile: string, smsCode: string) =>
  request<ResData>("passport/login", "POST", {
    form: {
      mobile,
      smsCode,
      isParty: false,
      partyData: {},
    },
  });

// login - codeRef
export const loginCodeRef = () => request("/captcha/image", "get");

//获取用户信息
export const getUserInfo = (token: string) =>
  request("user/info", "get", {
    token,
  });
//获取余额，积分，优惠券
export const getUserBalance = (token: string) =>
  request("user/assets", "get", {
    token,
  });
//获取商品状态数量(全部/待支付/待收货/待发货)
export const getUserCounts = (token: string) =>
  request("order/todoCounts", "get", {
    token,
  });
