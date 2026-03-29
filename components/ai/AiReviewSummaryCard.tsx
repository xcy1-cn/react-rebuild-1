import "./aiReviewSummaryCard.scss";

type AiReviewSummaryData = {
  summary: string;
  pros: string[];
  cons: string[];
  suitableUsers: string[];
  unsuitableUsers: string[];
  suggestion: string;
};

type Props = {
  data: AiReviewSummaryData | null;
  loading: boolean;
  error?: string;
  onRefresh?: () => void;
};

export default function AiReviewSummaryCard({
  data,
  loading,
  error,
  onRefresh,
}: Props) {
  if (loading) {
    return (
      <section className="ai-review-summary-card">
        <div className="ai-review-summary-card__header">
          <div className="ai-review-summary-card__title">AI 评论总结</div>
        </div>
        <div className="ai-review-summary-card__status">AI 正在分析评论...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="ai-review-summary-card">
        <div className="ai-review-summary-card__header">
          <div className="ai-review-summary-card__title">AI 评论总结</div>
          {onRefresh ? (
            <button
              className="ai-review-summary-card__refresh"
              onClick={onRefresh}
            >
              重试
            </button>
          ) : null}
        </div>
        <div className="ai-review-summary-card__status ai-review-summary-card__status--error">
          {error}
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="ai-review-summary-card">
        <div className="ai-review-summary-card__header">
          <div className="ai-review-summary-card__title">AI 评论总结</div>
        </div>
        <div className="ai-review-summary-card__status">
          当前评论较少，暂时无法生成有效总结
        </div>
      </section>
    );
  }

  return (
    <section className="ai-review-summary-card">
      <div className="ai-review-summary-card__header">
        <div className="ai-review-summary-card__title">AI 评论总结</div>
        {onRefresh ? (
          <button
            className="ai-review-summary-card__refresh"
            onClick={onRefresh}
          >
            重新生成
          </button>
        ) : null}
      </div>

      <div className="ai-review-summary-card__block">
        <div className="ai-review-summary-card__label">整体总结</div>
        <p className="ai-review-summary-card__text">{data.summary}</p>
      </div>

      <div className="ai-review-summary-card__block">
        <div className="ai-review-summary-card__label">优点</div>
        <div className="ai-review-summary-card__tags">
          {data.pros.map((item) => (
            <span key={item} className="ai-review-summary-card__tag">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="ai-review-summary-card__block">
        <div className="ai-review-summary-card__label">不足</div>
        <div className="ai-review-summary-card__tags">
          {data.cons.map((item) => (
            <span
              key={item}
              className="ai-review-summary-card__tag ai-review-summary-card__tag--weak"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="ai-review-summary-card__block">
        <div className="ai-review-summary-card__label">适合人群</div>
        <p className="ai-review-summary-card__text">
          {data.suitableUsers.join("、")}
        </p>
      </div>

      <div className="ai-review-summary-card__block">
        <div className="ai-review-summary-card__label">不太适合</div>
        <p className="ai-review-summary-card__text">
          {data.unsuitableUsers.join("、")}
        </p>
      </div>

      <div className="ai-review-summary-card__block">
        <div className="ai-review-summary-card__label">购买建议</div>
        <p className="ai-review-summary-card__text">{data.suggestion}</p>
      </div>
    </section>
  );
}
