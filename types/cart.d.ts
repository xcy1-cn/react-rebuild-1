export type CartGoods = {
  goods_name: string;
  goods_image: string;
  goods_price_max: number;
  stock_total: number;
};

export type CartItem = {
  id: number | string;
  goods_id: number | string;
  goods_num: number;
  goods: CartGoods;
};

export type ReqCartAdd = {
  goodsId: number | string;
  goodsNum: number;
  goodsSkuId?: number | string;
};

export type RepCartAdd = {
  message?: string;
};

export type RepCartList = {
  list: CartItem[];
};

export type ReqCartUpdate = {
  goodsId: number | string;
  goodsNum: number;
  goodsSkuId: string
};

export type RepCartUpdate = {
  message?: string;
};

export type RepCartClear = {
  message?: string;
};

export type RepCartTotal = {
  total: number;
};
