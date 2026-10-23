
import { useEffect, useMemo, useState } from "react";
import { Boxes, AlertTriangle, PackageCheck, XCircle } from "lucide-react";
import DataTable from "../components/tables/DataTable";
import { initialProducts } from "../data/mockData";
import "./inventory.css";

const STORAGE_KEY = "ecommerce_dashboard_products";

const getStockStatus = (stock) => {
  const quantity = Number(stock);

  if (quantity === 0) return "Out of Stock";
  if (quantity <= 12) return "Low Stock";

  return "Active";
};

function Inventory() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [toast, setToast] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      setToast("Unable to save inventory changes.");
    }
  }, [products]);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = setTimeout(() => setToast(""), 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const totalUnits = products.reduce(
    (sum, product) => sum + Number(product.stock || 0),
    0
  );

  const lowStockCount = products.filter(
    (product) =>
      Number(product.stock) > 0 && Number(product.stock) <= 12
  ).length;

  const outOfStockCount = products.filter(
    (product) => Number(product.stock) === 0
  ).length;

  const filteredProducts = useMemo(() => {
    if (selectedFilter === "All") return products;

    return products.filter(
      (product) => getStockStatus(product.stock) === selectedFilter
    );
  }, [products, selectedFilter]);

  const updateStock = (product) => {
    const input = window.prompt(
      `Enter new stock quantity for ${product.name}:`,
      String(product.stock)
    );

    if (input === null) return;

    if (input.trim() === "" || !/^\d+$/.test(input.trim())) {
      setToast("Enter a valid whole-number quantity.");
      return;
    }

    const quantity = Number(input);

    if (!Number.isSafeInteger(quantity)) {
      setToast("Stock quantity is too large.");
      return;
    }

    setProducts((current) =>
      current.map((item) =>
        item.id === product.id
          ? {
              ...item,
              stock: quantity,
              status: getStockStatus(quantity)
            }
          : item
      )
    );

    setToast(`Stock updated for ${product.name}.`);
  };

  const columns = useMemo(
    () => [
      { key: "id", label: "Product ID" },
      { key: "name", label: "Product" },
      { key: "category", label: "Category" },
      {
        key: "stock",
        label: "Available units",
        render: (value) => (
          <strong className={Number(value) <= 12 ? "inventory-low" : ""}>
            {value} units
          </strong>
        )
      },
      {
        key: "status",
        label: "Stock status",
        accessor: (row) => getStockStatus(row.stock),
        type: "status"
      }
    ],
    []
  );

  return (
    <main className="store-content inventory-page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">STOCK CONTROL</span>
          <h1>Inventory</h1>
          <p>Monitor availability and keep your product stock updated.</p>
        </div>
      </section>

      <section className="inventory-summary-grid">
        <article className="inventory-summary-card">
          <span>Total products</span>
          <div className="inventory-summary-value">
            <strong>{products.length}</strong>
            <Boxes size={22} />
          </div>
        </article>

        <article className="inventory-summary-card">
          <span>Total units</span>
          <div className="inventory-summary-value">
            <strong>{totalUnits}</strong>
            <PackageCheck size={22} />
          </div>
        </article>

        <article className="inventory-summary-card">
          <span>Low stock</span>
          <div className="inventory-summary-value">
            <strong>{lowStockCount}</strong>
            <AlertTriangle size={22} />
          </div>
        </article>

        <article className="inventory-summary-card">
          <span>Out of stock</span>
          <div className="inventory-summary-value">
            <strong>{outOfStockCount}</strong>
            <XCircle size={22} />
          </div>
        </article>
      </section>

      <section className="inventory-table-section">
        <div className="inventory-table-heading">
          <div>
            <h2>Stock overview</h2>
            <p>Filter products and update available quantities.</p>
          </div>

          <select
            className="inventory-filter"
            value={selectedFilter}
            onChange={(event) => setSelectedFilter(event.target.value)}
            aria-label="Filter inventory by stock status"
          >
            <option value="All">All products</option>
            <option value="Active">Active</option>
            <option value="Low Stock">Low stock</option>
            <option value="Out of Stock">Out of stock</option>
          </select>
        </div>

        <DataTable
          data={filteredProducts}
          columns={columns}
          rowKey="id"
          searchable
          pageSize={5}
          emptyMessage="No products match this stock filter."
          actions={(product) => (
            <button
              type="button"
              className="inventory-update-button"
              onClick={() => updateStock(product)}
            >
              Update stock
            </button>
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

export default Inventory;
