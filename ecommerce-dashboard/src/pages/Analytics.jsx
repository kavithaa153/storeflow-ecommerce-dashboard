
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";
import { IndianRupee, ShoppingBag, Package, TrendingUp } from "lucide-react";
import { initialOrders, initialProducts } from "../data/mockData";
import "./analytics.css";

const ORDER_KEY = "ecommerce_dashboard_orders";
const PRODUCT_KEY = "ecommerce_dashboard_products";

const COLORS = ["#C6FF35", "#A7B5D1", "#F5B971", "#E7A7A7"];

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(value) || 0);

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function Analytics() {
  const [orders] = useState(() =>
    readStorage(ORDER_KEY, initialOrders)
  );

  const [products] = useState(() =>
    readStorage(PRODUCT_KEY, initialProducts)
  );

  const revenue = orders
    .filter((order) => order.status === "Delivered")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const totalUnits = products.reduce(
    (sum, product) => sum + Number(product.stock || 0),
    0
  );

  const salesData = useMemo(() => {
    const grouped = {};

    orders
      .filter((order) => order.status === "Delivered")
      .forEach((order) => {
        const date = order.date;
        grouped[date] = (grouped[date] || 0) + Number(order.total || 0);
      });

    return Object.entries(grouped)
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([date, amount]) => ({
        date: new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short"
        }),
        revenue: amount
      }));
  }, [orders]);

  const orderStatusData = useMemo(() => {
    const grouped = {};

    orders.forEach((order) => {
      grouped[order.status] = (grouped[order.status] || 0) + 1;
    });

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value
    }));
  }, [orders]);

  const stockData = useMemo(
    () =>
      [...products]
        .sort((a, b) => Number(b.stock) - Number(a.stock))
        .slice(0, 5)
        .map((product) => ({
          name: product.name.length > 16
            ? `${product.name.slice(0, 16)}…`
            : product.name,
          stock: Number(product.stock) || 0
        })),
    [products]
  );

  return (
    <main className="store-content analytics-page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">BUSINESS INTELLIGENCE</span>
          <h1>Analytics</h1>
          <p>Review sales, order performance, and product inventory.</p>
        </div>
      </section>

      <section className="analytics-summary-grid">
        <article className="analytics-summary-card">
          <span>Delivered revenue</span>
          <div className="analytics-summary-value">
            <strong>{formatPrice(revenue)}</strong>
            <IndianRupee size={21} />
          </div>
          <small>Revenue from delivered orders</small>
        </article>

        <article className="analytics-summary-card">
          <span>Total orders</span>
          <div className="analytics-summary-value">
            <strong>{orders.length}</strong>
            <ShoppingBag size={21} />
          </div>
          <small>All recorded orders</small>
        </article>

        <article className="analytics-summary-card">
          <span>Delivered orders</span>
          <div className="analytics-summary-value">
            <strong>{deliveredOrders}</strong>
            <TrendingUp size={21} />
          </div>
          <small>Successfully completed</small>
        </article>

        <article className="analytics-summary-card">
          <span>Available stock</span>
          <div className="analytics-summary-value">
            <strong>{totalUnits}</strong>
            <Package size={21} />
          </div>
          <small>Units across all products</small>
        </article>
      </section>

      <section className="analytics-charts-grid">
        <article className="analytics-chart-card analytics-revenue-card">
          <div className="analytics-chart-heading">
            <div>
              <h2>Revenue trend</h2>
              <p>Delivered order revenue by date</p>
            </div>
          </div>

          {salesData.length ? (
            <div className="analytics-chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C6FF35" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#C6FF35" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eceee7" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₹${value}`}
                    width={75}
                  />
                  <Tooltip formatter={(value) => formatPrice(value)} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#7A9D1D"
                    strokeWidth={3}
                    fill="url(#revenueFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="analytics-empty">No delivered sales data available yet.</p>
          )}
        </article>

        <article className="analytics-chart-card">
          <div className="analytics-chart-heading">
            <div>
              <h2>Order status</h2>
              <p>Distribution of recorded orders</p>
            </div>
          </div>

          {orderStatusData.length ? (
            <>
              <div className="analytics-chart analytics-pie-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={58}
                      outerRadius={88}
                      paddingAngle={4}
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="analytics-legend">
                {orderStatusData.map((item, index) => (
                  <div key={item.name} className="analytics-legend-item">
                    <span
                      className="analytics-legend-dot"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{item.name}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="analytics-empty">No order data available yet.</p>
          )}
        </article>

        <article className="analytics-chart-card analytics-stock-card">
          <div className="analytics-chart-heading">
            <div>
              <h2>Stock by product</h2>
              <p>Five products with the highest available stock</p>
            </div>
          </div>

          {stockData.length ? (
            <div className="analytics-chart analytics-stock-chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockData} margin={{ left: 0, right: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eceee7" />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                    height={65}
                  />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar
                    dataKey="stock"
                    name="Available units"
                    fill="#C6FF35"
                    radius={[7, 7, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="analytics-empty">No product data available yet.</p>
          )}
        </article>
      </section>
    </main>
  );
}

export default Analytics;
