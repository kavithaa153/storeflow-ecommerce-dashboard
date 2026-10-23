import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2, Package } from "lucide-react";
import { initialProducts } from "../data/mockData";
import ProductForm from "../components/products/ProductForm";
import DataTable from "../components/tables/DataTable";
import "./products.css";

const STORAGE_KEY = "ecommerce_dashboard_products";

const getProductStatus = (stock) => {
  if (Number(stock) === 0) return "Out of Stock";
  if (Number(stock) <= 12) return "Low Stock";
  return "Active";
};

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

function Products() {
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [toast, setToast] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      setToast("Unable to save changes in this browser.");
    }
  }, [products]);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const activeCount = products.filter(
    (product) => getProductStatus(product.stock) === "Active"
  ).length;

  const lowStockCount = products.filter(
    (product) => getProductStatus(product.stock) === "Low Stock"
  ).length;

  const outOfStockCount = products.filter(
    (product) => getProductStatus(product.stock) === "Out of Stock"
  ).length;

  const columns = useMemo(
    () => [
      {
        key: "id",
        label: "Product ID",
      },
      {
        key: "name",
        label: "Product",
        render: (value, row) => (
          <div className="product-name-cell">
            <div className="product-avatar">
              <Package size={18} />
            </div>
            <div>
              <strong>{value}</strong>
              <span>{row.category}</span>
            </div>
          </div>
        ),
      },
      {
        key: "category",
        label: "Category",
      },
      {
        key: "price",
        label: "Price",
        render: (value) => (
          <strong className="product-price">{formatPrice(value)}</strong>
        ),
      },
      {
        key: "stock",
        label: "Stock",
        render: (value) => (
          <span className={Number(value) <= 12 ? "stock-warning" : "stock-normal"}>
            {value} units
          </span>
        ),
      },
      {
        key: "status",
        label: "Status",
        accessor: (row) => getProductStatus(row.stock),
        type: "status",
      },
    ],
    []
  );

  const openAddForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = (formData) => {
    setIsSaving(true);

    try {
      if (editingProduct) {
        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.id === editingProduct.id
              ? {
                  ...product,
                  ...formData,
                  price: Number(formData.price),
                  stock: Number(formData.stock),
                  status: getProductStatus(formData.stock),
                }
              : product
          )
        );

        setToast("Product updated successfully.");
      } else {
        const newProduct = {
          id: `PRD-${Date.now().toString().slice(-8)}`,
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          status: getProductStatus(formData.stock),
        };

        setProducts((currentProducts) => [newProduct, ...currentProducts]);
        setToast("Product added successfully.");
      }

      closeForm();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = () => {
    if (!deleteProduct) return;

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== deleteProduct.id)
    );

    setToast("Product deleted successfully.");
    setDeleteProduct(null);
  };

  return (
    <main className="store-content products-page">
      <section className="page-heading products-heading">
        <div>
          <span className="eyebrow">CATALOG MANAGEMENT</span>
          <h1>Products</h1>
          <p>Manage your products, pricing, and stock levels.</p>
        </div>

        <button className="add-product-button" onClick={openAddForm}>
          <Plus size={19} />
          Add product
        </button>
      </section>

      <section className="product-summary-grid">
        <article className="product-summary-card">
          <span>Total products</span>
          <strong>{products.length}</strong>
          <small>Products in your catalog</small>
        </article>

        <article className="product-summary-card">
          <span>Active products</span>
          <strong>{activeCount}</strong>
          <small>Available for sale</small>
        </article>

        <article className="product-summary-card warning-summary">
          <span>Low stock</span>
          <strong>{lowStockCount}</strong>
          <small>12 units or fewer</small>
        </article>

        <article className="product-summary-card danger-summary">
          <span>Out of stock</span>
          <strong>{outOfStockCount}</strong>
          <small>Needs replenishment</small>
        </article>
      </section>

      <section className="products-table-section">
        <div className="products-table-heading">
          <div>
            <h2>Product inventory</h2>
            <p>Search, sort, edit, and manage your catalog.</p>
          </div>
          <span className="product-count">{products.length} items</span>
        </div>

        <DataTable
          title="All products"
          data={products}
          columns={columns}
          rowKey="id"
          searchable
          pageSize={5}
          emptyMessage="No products found. Add a product to get started."
          actions={(product) => (
            <div className="product-row-actions">
              <button
                type="button"
                className="product-action-button edit-action"
                aria-label={`Edit ${product.name}`}
                title="Edit product"
                onClick={() => openEditForm(product)}
              >
                <Pencil size={16} />
              </button>

              <button
                type="button"
                className="product-action-button delete-action"
                aria-label={`Delete ${product.name}`}
                title="Delete product"
                onClick={() => setDeleteProduct(product)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        />
      </section>

      {isFormOpen && (
        <div
          className="product-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <section
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
          >
            <div className="product-modal-heading">
              <div>
                <span className="eyebrow">
                  {editingProduct ? "UPDATE CATALOG" : "NEW ITEM"}
                </span>
                <h2 id="product-modal-title">
                  {editingProduct ? "Edit product" : "Add product"}
                </h2>
              </div>

              <button
                type="button"
                className="modal-close-button"
                onClick={closeForm}
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <ProductForm
              initialData={editingProduct}
              onSubmit={handleSaveProduct}
              onCancel={closeForm}
              loading={isSaving}
            />
          </section>
        </div>
      )}

      {deleteProduct && (
        <div className="product-modal-backdrop">
          <section
            className="product-confirm-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
          >
            <div className="delete-icon-circle">
              <Trash2 size={22} />
            </div>

            <h2 id="delete-dialog-title">Delete this product?</h2>
            <p>
              You are about to delete <strong>{deleteProduct.name}</strong>.
              This action cannot be undone.
            </p>

            <div className="product-dialog-actions">
              <button
                type="button"
                className="cancel-dialog-button"
                onClick={() => setDeleteProduct(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="confirm-delete-button"
                onClick={handleDeleteProduct}
              >
                Delete product
              </button>
            </div>
          </section>
        </div>
      )}

      {toast && (
        <div className="product-toast" role="status">
          <span className="toast-check">✓</span>
          {toast}
        </div>
      )}
    </main>
  );
}

export default Products;