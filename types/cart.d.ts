export type CartItem = {
  goodsId: number;
  goodsName: string;
  price: number;
  goodsNum: number;
  selected: boolean;
  image: string;
  goodsSkuId: string;
};

// 购物车所需types

// 添加商品到购物车
// request-body
export type ReqCartAdd = {
  goodsId: string | number
  goodsNum: number
  goodsSkuId?: '0' | string
}
// response-data
export type RepCartAdd = {
  cartTotal: number | string
}
// Re
export type ListRe = {
  cartId: string | number
  goodsId: string | number
  goodsNum: string | number
  goodsPrice: string | number
  goodsSkuId: '0'
}

// 获取购物车商品列表
// response-data
export type RepCartList = {
  id: number
  goods_id: number | string
  goods_sku_id: string
  goods_num: number
  user_id: number
  is_delete: number
  store_id: number
  create_time: string
  update_time: string
  goods: Goods
}

type Goods = {
  alone_grade_equity: string[]
  delivery_id: number
  goods_id: number
  goods_image: string
  goods_images: GoodsImage[]
  goods_name: string
  goods_no: string
  goods_price_max: string
  goods_price_min: string
  goods_sales: number
  is_alone_grade: number
  is_alone_points_discount: number
  is_enable_grade: number
  is_points_discount: number
  is_points_gift: number
  is_user_grade: boolean
  line_price_max: string
  line_price_min: string
  points_discount_config: string
  selling_point: string
  skuInfo: SkuInfo
  spec_type: number
  status: number
  stock_total: number
  video_cover_id: number
  video_id: number
}
interface GoodsImage {
  channel: number
  cover: string
  domain: string
  external_url: string
  file_ext: string
  file_id: number
  file_name: string
  file_path: string
  file_size: number
  file_type: number
  group_id: number
  is_delete: number
  is_recycle: number
  preview_url: string
  storage: string
  update_time: string
  uploader_id: number
}
interface SkuInfo {
  create_time: string
  goods_id: number
  goods_price: string
  goods_props: null
  goods_sku_id: string
  goods_sku_no: string
  goods_weight: number
  id: number
  image_id: number
  line_price: string
  spec_value_ids: null
  stock_num: number
  store_id: number
  update_time: string
}
// 更新购物车商品
// request
export type ReqCartUpdate = ReqCartAdd
// response
export type RepCartUpdate = RepCartAdd

// 删除购物车商品
// response
export type RepCartClear = RepCartAdd

// 获取购物车商品总数量
export type RepCartTotal = RepCartAdd

// 待提交更新购物车数据
export type cartRe = {
  goodId: string
  goodsNum: string
  goodsSkuld: string
}
