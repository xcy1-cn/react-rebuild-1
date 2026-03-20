// 请求Body参数
export type Form = {
  isParty: boolean;
  mobile: string;
  partyData: Object;
  smsCode: string;
};

// 响应参数
export type ResData = {
  userId: number;
  token: string;
};
