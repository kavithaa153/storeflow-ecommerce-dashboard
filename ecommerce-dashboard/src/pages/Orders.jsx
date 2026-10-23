
import { useEffect, useMemo, useState } from "react";
import { PackageCheck, ShoppingCart, Clock, IndianRupee } from "lucide-react";
import DataTable from "../components/tables/DataTable";
import { initialOrders } from "../data/seed";
import "./orders.css";

const STORAGE_KEY = "ecommerce_dashboard_orders";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(price) || 0);

function Orders() {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      setToast("Unable to save orders in this browser.");
    }
  }, [orders]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const pendingCount = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const processingCount = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const deliveredCount = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const totalRevenue = orders
    .filter((order) => order.status === "Delivered")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  const columns = useMemo(
    () => [
      { key: "id", label: "Order ID" },
      { key: "customer", label: "Customer" },
      {
        key: "date",
        label: "Order date",
        render: (value) =>
          new Date(`${value}T00:00:00`).toLocaleDateString("en-IN")
      },
      {
        key: "total",
        label: "Order total",
        render: (value) => (
          <strong className="order-total">{formatPrice(value)}</strong>
        )
      },
      {
        key: "status",
        label: "Status",
        type: "status"
      }
    ],
    []
  );

  const updateStatus = (orderId, status) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    setToast(`Order ${orderId} updated to ${status}.`);
  };

  return (
    <main className="store-content orders-page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">SALES MANAGEMENT</span>
          <h1>Orders</h1>
          <p>Track orders, monitor progress, and manage fulfillment.</p>
        </div>
      </section>

      <section className="orders-summary-grid">
        <article className="orders-summary-card">
          <span>Total orders</span>
          <div className="orders-summary-value">
            <strong>{orders.length}</strong>
            <ShoppingCart size={21} />
          </div>
          <small>All recorded orders</small>
        </article>

        <article className="orders-summary-card">
          <span>Pending</span>
          <div className="orders-summary-value">
            <strong>{pendingCount}</strong>
            <Clock size={21} />
          </div>
          <small>Awaiting processing</small>
        </article>

        <article className="orders-summary-card">
          <span>Processing</span>
          <div className="orders-summary-value">
            <strong>{processingCount}</strong>
            <PackageCheck size={21} />
          </div>
          <small>Being prepared</small>
        </article>

        <article className="orders-summary-card">
          <span>Delivered revenue</span>
          <div className="orders-summary-value">
            <strong>{formatPrice(totalRevenue)}</strong>
            <IndianRupee size={21} />
          </div>
          <small>{deliveredCount} delivered orders</small>
        </article>
      </section>

      <section className="orders-table-section">
        <div className="orders-table-heading">
          <div>
            <h2>All orders</h2>
            <p>Search, sort, and update order status.</p>
          </div>
          <span>{orders.length} orders</span>
        </div>

        <DataTable
          data={orders}
          columns={columns}
          rowKey="id"
          searchable
          pageSize={5}
          emptyMessage="No orders found."
          actions={(order) => (
            <select
              className="order-status-select"
              aria-label={`Update status for ${order.id}`}
              value={order.status}
              onChange={(event) =>
                updateStatus(order.id, event.target.value)
              }
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          )}
        />
      </section>

      {toast && (
        <div className="product-toast" role="status">
          <span className="toast-check">✓</span>
          {toast}
        </div>
      )}
    </main>
  );
}

export default Orders;
