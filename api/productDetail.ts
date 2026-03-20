import {request} from "@/utils/request";

export const getGoodDetail = (goodsId: string | number) =>{
 return request("goods/detail", "GET", { goodsId });
}
  

export const getGoodService = (goodsId: string | number) =>
  request('goods.service/list', 'GET', { goodsId });

export const getGoodCommentListRows = (
  goodsId: string | number,
  limit: number = 2,
) =>
  request("comment/listRows", "GET", {
    goodsId,
    limit,
  });

export const getGoodCommentTotal = (goodsId: string | number) =>
  request("comment/total", "GET", {
    goodsId,
  });
