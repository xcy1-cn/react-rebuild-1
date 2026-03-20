// 用户types
export type User = {
  name: string;
};

// 登录
type Data = {
  userId: number;
  token: string;
};

export type Form = {
  status: number;
  message: string;
  data: Data;
};

// navs/ orders / service1/ service2
type Item = {
  // 渲染的标签名
  label: string;
  // 跳转路径
  path: string;
  // 图标名称
  icon?: string;
  icons?: string;
};

export type Items = Item[];

// 登录的电话号码
export type Mobile = string;

// 登录后的个人信息
export type UserInfo = {
  address_id: number;
  avatar?: string;
  avatar_id?: number;
  balance: string;
  city: string;
  country: string;
  currentOauth?: string | number;
  expend_money: string;
  gender?: "未知" | string;
  grade?: number;
  grade_id: number;
  last_login_time: number;
  mobile: string;
  nick_name: string;
  pay_money: string;
  platform: "H5";
  points: number;
  province: string;
  user_id: number;
};
//获取余额，积分，优惠券
export type UserBalance = {
  balance: string;
  points: number;
  coupon: number;
};
//获取商品状态数量(全部/待支付/待收货/待发货)
export type UserGoods = {
  payment: number;
  delivery: number;
  received: number;
  refund: number;
};
