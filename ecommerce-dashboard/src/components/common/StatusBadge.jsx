
import "./status-badge.css";

const statusVariants = {
  active: "success",
  delivered: "success",
  paid: "success",
  "in stock": "success",
  shipped: "info",
  processing: "warning",
  pending: "warning",
  "low stock": "warning",
  cancelled: "danger",
  refunded: "danger",
  inactive: "neutral",
  "out of stock": "danger"
};

export default function StatusBadge({ status, variant }) {
  const normalizedStatus = String(status ?? "Unknown");
  const styleVariant =
    variant || statusVariants[normalizedStatus.toLowerCase()] || "neutral";

  return (
    <span className={`status-badge status-badge-${styleVariant}`}>
      <span className="status-badge-dot" aria-hidden="true" />
      {normalizedStatus}
    </span>
  );
}
