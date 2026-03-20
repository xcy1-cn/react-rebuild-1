import { request } from "@/utils/request.ts";

// home data
export const getHomeData = (pageId?: string | number) =>
  request("page/detail", "get", {
    pageId: pageId ?? 0,
  });
