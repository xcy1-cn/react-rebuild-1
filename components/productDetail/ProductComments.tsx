import { Link } from "react-router-dom";

type ProductCommentsProps = {
  goodsId: string;
  commentRows: any[];
  commentTotal: number;
};

export default function ProductComments({
  goodsId,
  commentRows,
  commentTotal,
}: ProductCommentsProps) {
  return (
    <div className="goodDetail-commit">
      <div className="goodDetail-commit-title">
        <div style={{ fontSize: "20px" }}>商品评价 ({commentTotal}条)</div>

        <Link to={`/commentList?good_id=${goodsId}`}>
          <div className="summary">查看更多 ›</div>
        </Link>
      </div>

      <div className="goodDetail-commit-content">
        <div className="goodDetail-commit-content-item">
          {commentRows.map((item: any) => (
            <div className="item" key={item.comment_id}>
              <div className="item-title">
                <div className="avatar">
                  <img src={item.user?.avatar_url} alt="" />
                </div>
                <div className="username">{item.user?.nick_name}</div>
                <div className="stars">
                  {item.score === 10
                    ? "★★★★★"
                    : item.score === 20
                      ? "★★★"
                      : "★"}
                </div>
              </div>

              <div className="item-content">{item.content}</div>
              <div className="item-time">{item.create_time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
