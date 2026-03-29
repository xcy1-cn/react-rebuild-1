import "./aiDecisionScoreCard.scss";

type AiDecisionScoreData = {
  overallScore: number;
  priceScore: number;
  reviewScore: number;
  matchScore: number;
  risks: string[];
  conclusion: string;
};

type Props = {
  data: AiDecisionScoreData | null;
  loading: boolean;
  error?: string;
  onRefresh?: () => void;
};

function formatScore(score: number) {
  return Number(score || 0).toFixed(1);
}

export default function AiDecisionScoreCard({
  data,
  loading,
  error,
  onRefresh,
}: Props) {
  if (loading) {
    return (
      <section className="ai-decision-score-card">
        <div className="ai-decision-score-card__header">
          <div className="ai-decision-score-card__title">AI 购买决策评分</div>
        </div>
        <div className="ai-decision-score-card__status">AI 正在计算评分...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="ai-decision-score-card">
        <div className="ai-decision-score-card__header">
          <div className="ai-decision-score-card__title">AI 购买决策评分</div>
          {onRefresh ? (
            <button
              className="ai-decision-score-card__refresh"
              onClick={onRefresh}
            >
              重试
            </button>
          ) : null}
        </div>
        <div className="ai-decision-score-card__status ai-decision-score-card__status--error">
          {error}
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className="ai-decision-score-card">
      <div className="ai-decision-score-card__header">
        <div className="ai-decision-score-card__title">AI 购买决策评分</div>
        <div className="ai-decision-score-card__badge">AI</div>
      </div>

      <div className="ai-decision-score-card__overall">
        <div className="ai-decision-score-card__overall-label">推荐指数</div>
        <div className="ai-decision-score-card__overall-value">
          {formatScore(data.overallScore)}
          <span className="ai-decision-score-card__overall-unit">/ 10</span>
        </div>
      </div>

      <div className="ai-decision-score-card__grid">
        <div className="ai-decision-score-card__metric">
          <div className="ai-decision-score-card__metric-label">性价比</div>
          <div className="ai-decision-score-card__metric-value">
            {formatScore(data.priceScore)}
          </div>
        </div>

        <div className="ai-decision-score-card__metric">
          <div className="ai-decision-score-card__metric-label">口碑</div>
          <div className="ai-decision-score-card__metric-value">
            {formatScore(data.reviewScore)}
          </div>
        </div>

        <div className="ai-decision-score-card__metric">
          <div className="ai-decision-score-card__metric-label">匹配度</div>
          <div className="ai-decision-score-card__metric-value">
            {formatScore(data.matchScore)}
          </div>
        </div>
      </div>

      <div className="ai-decision-score-card__block">
        <div className="ai-decision-score-card__label">风险提示</div>
        <ul className="ai-decision-score-card__risk-list">
          {data.risks.map((item) => (
            <li key={item} className="ai-decision-score-card__risk-item">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="ai-decision-score-card__block">
        <div className="ai-decision-score-card__label">购买结论</div>
        <p className="ai-decision-score-card__text">{data.conclusion}</p>
      </div>

      {onRefresh ? (
        <button className="ai-decision-score-card__action" onClick={onRefresh}>
          重新计算
        </button>
      ) : null}
    </section>
  );
}
