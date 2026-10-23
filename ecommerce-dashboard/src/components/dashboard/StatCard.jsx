
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  positive = true,
  icon: Icon,
  color = "green",
  description = "vs. last month"
}) {
  return (
    <article className="stat-card">
      <div className="stat-card-top">
        <span className="stat-title">{title}</span>

        <div className={`stat-icon stat-icon-${color}`}>
          {Icon && <Icon size={20} strokeWidth={1.8} />}
        </div>
      </div>

      <div className="stat-value">{value}</div>

      <div className="stat-footer">
        <span
          className={`stat-change ${
            positive ? "change-positive" : "change-negative"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {change}
        </span>

        <span className="stat-description">{description}</span>
      </div>
    </article>
  );
}
