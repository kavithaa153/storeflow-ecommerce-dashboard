
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { salesData } from "../../data/mockData";

export default function SalesChart() {
  return (
    <section className="sales-chart-card">
      <div className="chart-header">
        <div>
          <span className="chart-eyebrow">PERFORMANCE</span>
          <h2>Sales Overview</h2>
          <p>Track your revenue performance throughout the year.</p>
        </div>

        <select defaultValue="year" aria-label="Sales period">
          <option value="year">This year</option>
          <option value="month">Monthly view</option>
        </select>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={salesData}
            margin={{ top: 16, right: 12, left: 8, bottom: 4 }}
          >
            <defs>
              <linearGradient
                id="storeFlowRevenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#b7ff35" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#b7ff35" stopOpacity={0.04} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#e9eee2"
              strokeDasharray="4 5"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#777d70", fontSize: 12 }}
              tickMargin={12}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#777d70", fontSize: 12 }}
              tickFormatter={(value) =>
                value >= 1000
                  ? `₹${value / 1000}k`
                  : `₹${value}`
              }
              width={52}
            />

            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #e5eadf",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(20, 30, 10, 0.08)",
                padding: "12px"
              }}
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Revenue"
              ]}
              labelStyle={{
                color: "#20231d",
                fontWeight: 700,
                marginBottom: "4px"
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#78b900"
              strokeWidth={3}
              fill="url(#storeFlowRevenueGradient)"
              activeDot={{
                r: 5,
                fill: "#78b900",
                stroke: "#ffffff",
                strokeWidth: 2
              }}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
