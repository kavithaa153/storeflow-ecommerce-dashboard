
import {
  IndianRupee,
  ShoppingBag,
  Package,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  CheckCircle2
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import { initialOrders, initialProducts } from "../data/mockData";
import "./dashboard.css";
import watchImage from "../assets/watch-product.png";

const salesData = [
  { month: "Jan", sales: 12000 },
  { month: "Feb", sales: 20000 },
  { month: "Mar", sales: 14000 },
  { month: "Apr", sales: 28000 },
  { month: "May", sales: 24000 },
  { month: "Jun", sales: 28500 },
  { month: "Jul", sales: 32000 },
  { month: "Aug", sales: 40000 },
  { month: "Sep", sales: 35000 },
  { month: "Oct", sales: 46000 },
  { month: "Nov", sales: 42000 },
  { month: "Dec", sales: 60000 }
];

const categoryColors = ["#84CC16", "#171914", "#C6FF35", "#D9DDD4"];

const money = value =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(value) || 0);

function Dashboard() {
  const orders = initialOrders || [];
  const products = initialProducts || [];

  const deliveredOrders = orders.filter(
    order => String(order.status).toLowerCase() === "delivered"
  );

  const revenue = deliveredOrders.reduce(
    (sum, order) => sum + Number(order.total || order.amount || 0),
    0
  );

  const categoryMap = products.reduce((result, product) => {
    const category = product.category || "Other";
    result[category] = (result[category] || 0) + 1;
    return result;
  }, {});

  const categories = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value
  }));

  const topProducts = [...products]
    .sort((a, b) => Number(b.stock || 0) - Number(a.stock || 0));

  const recentOrders = [...orders].slice(-5).reverse();

  const totalStock = products.reduce(
    (sum, product) => sum + Number(product.stock || 0),
    0
  );

  const monthlyTotal = salesData.reduce(
    (sum, item) => sum + item.sales,
    0
  ) / 12;

  return (
    <main className="premium-dashboard">
      <section className="premium-welcome">
        <div className="premium-welcome-copy">
          <span className="premium-eyebrow">STORE OVERVIEW</span>
          <h1>
            Welcome Back, Shoplyti <span>👋</span>
          </h1>
          <p>Here's what's happening with your store today.</p>
        </div>

        <div className="premium-mini-stats">
          <div>
            <strong>10K+</strong>
            <span>Happy Customers</span>
          </div>
          <div>
            <strong>50K+</strong>
            <span>Orders Delivered</span>
          </div>
          <div>
            <strong>50+</strong>
            <span>Team Members</span>
          </div>
        </div>
      </section>

      <section className="premium-top-layout">
        <div className="premium-left-stack">
          <article className="premium-revenue-card">
            <div className="premium-summary-label">
              <span className="premium-summary-icon">
                <IndianRupee size={20} />
              </span>
              <span>Total Revenue</span>
            </div>

            <strong className="premium-summary-value">
              {money(revenue)}
            </strong>

            <span className="premium-summary-caption">
              Delivered orders
            </span>

            <div className="premium-month-change">
              <span>From last month</span>
              <strong>+12.5%</strong>
            </div>

            <div className="premium-sparkline" aria-label="Revenue trend">
              <i /><i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </article>

          <article className="premium-orders-highlight">
            <div className="premium-highlight-top">
              <span className="premium-highlight-icon">
                <ShoppingBag size={20} />
              </span>
              <div>
                <span>Total Orders</span>
                <strong>{orders.length.toLocaleString("en-IN")}</strong>
              </div>
            </div>

            <div className="premium-highlight-bottom">
              <div>
                <span>Increase</span>
                <strong>+8.2%</strong>
              </div>

              <svg
                viewBox="0 0 160 55"
                role="img"
                aria-label="Orders trending upward"
              >
                <path d="M3 46 C24 42, 28 12, 49 23 S79 52, 101 28 S131 24, 157 3" />
              </svg>
            </div>
          </article>
        </div>

        <article className="premium-panel premium-sales-panel">
          <div className="premium-panel-heading">
            <div>
              <span className="premium-section-kicker">PERFORMANCE</span>
              <h2>This month's sales report</h2>
              <div className="premium-monthly-total">
                <strong>{money(monthlyTotal)}</strong>
                <span><ArrowUpRight size={15} /> 34%</span>
              </div>
            </div>

            <label className="premium-select">
              <CalendarDays size={14} />
              <select aria-label="Sales period" defaultValue="monthly">
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <ChevronDown size={14} />
            </label>
          </div>

          <div className="premium-sales-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData.slice(0, 7)}
                margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="storeSalesFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#A8F33D" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#C6FF35" stopOpacity={0.2} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="#E8EBE2"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#74796F", fontSize: 11 }}
                  dy={8}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#74796F", fontSize: 11 }}
                  tickFormatter={value => value === 0 ? "0k" : `${value / 1000}k`}
                  width={34}
                  domain={[0, 45000]}
                  ticks={[0, 10000, 20000, 30000, 40000]}
                />

                <Tooltip
                  formatter={value => [money(value), "Sales"]}
                  contentStyle={{
                    border: "1px solid #E5E9DC",
                    borderRadius: 10,
                    fontSize: 12
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#83B913"
                  strokeWidth={2.5}
                  fill="url(#storeSalesFill)"
                  activeDot={{
                    r: 4,
                    fill: "#83B913",
                    stroke: "#fff",
                    strokeWidth: 2
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="premium-panel premium-featured-panel">
          <div className="premium-panel-heading">
            <h2>Top Selling Products</h2>

            <label className="premium-select">
              <select aria-label="Product period" defaultValue="monthly">
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
              <ChevronDown size={14} />
            </label>
          </div>

          <div className="premium-product-visual">
            <img
              src={watchImage}
              alt="Premium smartwatch"
              className="premium-watch-image"
            />
          </div>

          <div className="premium-featured-product">
            <div>
              <strong>Apple Watch Ultra 2 GPS</strong>
              <span>Electronics</span>
              <span className="premium-stock">
                <CheckCircle2 size={13} />
                {Number(topProducts[0]?.stock || 86)} units available
              </span>
            </div>
            <strong>{money(topProducts[0]?.price || 79900)}</strong>
          </div>
        </article>
      </section>

      <section className="premium-bottom-grid">
        <article className="premium-panel premium-orders-panel">
          <div className="premium-panel-heading">
            <h2>Recent Orders</h2>
            <span className="premium-period-label">
              {recentOrders.length} orders
            </span>
          </div>

          <div className="premium-table-wrap">
            <table className="premium-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order, index) => {
                  const status = String(order.status || "Pending");
                  const statusClass = status.toLowerCase().replace(/\s+/g, "-");

                  return (
                    <tr key={order.id || order.orderId || index}>
                      <td>{order.id || order.orderId || `ORD-${index + 1}`}</td>
                      <td>{order.customer || order.customerName || "Customer"}</td>
                      <td>{order.product || order.productName || "Order item"}</td>
                      <td>{money(order.total || order.amount || 0)}</td>
                      <td>
                        <span className={`premium-order-status ${statusClass}`}>
                          {status}
                        </span>
                      </td>
                      <td>{order.date || order.orderDate || "—"}</td>
                    </tr>
                  );
                })}

                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan="6" className="premium-table-empty">
                      No orders available yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>

        <article className="premium-panel premium-category-panel">
          <div className="premium-panel-heading">
            <h2>Sales by Category</h2>
            <span className="premium-period-label">Overview</span>
          </div>

          {categories.length > 0 ? (
            <div className="premium-category-content">
              <div className="premium-donut-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categories}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="62%"
                      outerRadius="88%"
                      paddingAngle={3}
                      stroke="none"
                    >
                      {categories.map((category, index) => (
                        <Cell
                          key={category.name}
                          fill={categoryColors[index % categoryColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div className="premium-donut-center">
                  <span>Total Products</span>
                  <strong>{products.length}</strong>
                </div>
              </div>

              <div className="premium-category-legend">
                {categories.map((category, index) => (
                  <div key={category.name}>
                    <span
                      className="premium-legend-dot"
                      style={{
                        backgroundColor: categoryColors[index % categoryColors.length]
                      }}
                    />
                    <span className="premium-legend-name">{category.name}</span>
                    <strong>{category.value}</strong>
                    <span className="premium-legend-percent">
                      {products.length
                        ? Math.round(category.value / products.length * 100)
                        : 0}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="premium-empty">
              <Package size={28} />
              <span>Add products to see category distribution.</span>
            </div>
          )}

          <div className="premium-stock-summary">
            <span><Package size={14} /> Total inventory</span>
            <strong>{totalStock} units</strong>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
