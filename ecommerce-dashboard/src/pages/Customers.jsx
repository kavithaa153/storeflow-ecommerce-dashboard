
import { useEffect, useMemo, useState } from "react";
import { Users, UserCheck, UserX, IndianRupee } from "lucide-react";
import DataTable from "../components/tables/DataTable";
import { initialCustomers } from "../data/seed";
import "./customers.css";

const STORAGE_KEY = "ecommerce_dashboard_customers";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(amount) || 0);

function Customers() {
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialCustomers;
    } catch {
      return initialCustomers;
    }
  });

  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    } catch {
      setToast("Unable to save customer data.");
    }
  }, [customers]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const activeCount = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCount = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  const totalSpent = customers.reduce(
    (sum, customer) => sum + Number(customer.spent || 0),
    0
  );

  const columns = useMemo(
    () => [
      { key: "id", label: "Customer ID" },
      {
        key: "name",
        label: "Customer",
        render: (value, row) => (
          <div className="customer-name-cell">
            <div className="customer-avatar">
              {value?.charAt(0)?.toUpperCase() || "C"}
            </div>
            <div>
              <strong>{value}</strong>
              <span>{row.email}</span>
            </div>
          </div>
        )
      },
      { key: "orders", label: "Total orders" },
      {
        key: "spent",
        label: "Total spent",
        render: (value) => (
          <strong className="customer-spent">{formatPrice(value)}</strong>
        )
      },
      { key: "status", label: "Status", type: "status" }
    ],
    []
  );

  const updateStatus = (customerId, status) => {
    setCustomers((current) =>
      current.map((customer) =>
        customer.id === customerId
          ? { ...customer, status }
          : customer
      )
    );

    setToast(`Customer status updated to ${status}.`);
  };

  return (
    <main className="store-content customers-page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">CUSTOMER RELATIONSHIPS</span>
          <h1>Customers</h1>
          <p>Manage customer records and understand purchasing activity.</p>
        </div>
      </section>

      <section className="customers-summary-grid">
        <article className="customers-summary-card">
          <span>Total customers</span>
          <div className="customers-summary-value">
            <strong>{customers.length}</strong>
            <Users size={21} />
          </div>
          <small>All registered customers</small>
        </article>

        <article className="customers-summary-card">
          <span>Active customers</span>
          <div className="customers-summary-value">
            <strong>{activeCount}</strong>
            <UserCheck size={21} />
          </div>
          <small>Currently active</small>
        </article>

        <article className="customers-summary-card">
          <span>Inactive customers</span>
          <div className="customers-summary-value">
            <strong>{inactiveCount}</strong>
            <UserX size={21} />
          </div>
          <small>Currently inactive</small>
        </article>

        <article className="customers-summary-card">
          <span>Customer spending</span>
          <div className="customers-summary-value">
            <strong>{formatPrice(totalSpent)}</strong>
            <IndianRupee size={21} />
          </div>
          <small>Combined recorded spending</small>
        </article>
      </section>

      <section className="customers-table-section">
        <div className="customers-table-heading">
          <div>
            <h2>Customer directory</h2>
            <p>Search, sort, and update customer status.</p>
          </div>
          <span>{customers.length} customers</span>
        </div>

        <DataTable
          data={customers}
          columns={columns}
          rowKey="id"
          searchable
          pageSize={5}
          emptyMessage="No customers found."
          actions={(customer) => (
            <select
              className="customer-status-select"
              value={customer.status}
              aria-label={`Change status for ${customer.name}`}
              onChange={(event) =>
                updateStatus(customer.id, event.target.value)
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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

export default Customers;
