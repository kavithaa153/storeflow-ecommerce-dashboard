
import "./button.css";

export default function Button({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`app-button app-button-${variant} ${className}`.trim()}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      {...props}
    >
      {loading && <span className="button-spinner" aria-hidden="true" />}
      {loading ? "Please wait..." : children}
    </button>
  );
}
