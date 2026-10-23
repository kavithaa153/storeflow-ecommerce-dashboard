
import { useEffect, useState } from "react";
import Button from "../common/Button";
import "./product-form.css";

const emptyProduct = {
  name: "",
  category: "",
  price: "",
  stock: "",
  description: ""
};

export default function ProductForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false
}) {
  const [form, setForm] = useState(emptyProduct);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(
      initialData
        ? {
            name: initialData.name ?? "",
            category: initialData.category ?? "",
            price: String(initialData.price ?? ""),
            stock: String(initialData.stock ?? ""),
            description: initialData.description ?? ""
          }
        : emptyProduct
    );
    setErrors({});
  }, [initialData]);

  function validate() {
    const nextErrors = {};
    const name = form.name.trim();
    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!name) {
      nextErrors.name = "Product name is required.";
    } else if (name.length < 2) {
      nextErrors.name = "Enter at least 2 characters.";
    } else if (name.length > 100) {
      nextErrors.name = "Name cannot exceed 100 characters.";
    }

    if (!form.category) {
      nextErrors.category = "Select a category.";
    }

    if (form.price.trim() === "" || !Number.isFinite(price) || price <= 0) {
      nextErrors.price = "Enter a price greater than zero.";
    }

    if (
      form.stock.trim() === "" ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      nextErrors.stock = "Stock must be a whole number of zero or more.";
    }

    if (form.description.length > 500) {
      nextErrors.description = "Description cannot exceed 500 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));

    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) return;

    onSubmit({
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      description: form.description.trim()
    });
  }

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <div className="product-form-grid">
        <div className="field-group">
          <label className="field-label" htmlFor="product-name">
            Product name *
          </label>
          <input
            id="product-name"
            className="field-control"
            name="name"
            value={form.name}
            onChange={updateField}
            maxLength={100}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "product-name-error" : undefined}
            placeholder="e.g. Wireless Headphones"
          />
          {errors.name && (
            <span id="product-name-error" className="field-error">
              {errors.name}
            </span>
          )}
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="product-category">
            Category *
          </label>
          <select
            id="product-category"
            className="field-control"
            name="category"
            value={form.category}
            onChange={updateField}
            aria-invalid={Boolean(errors.category)}
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Accessories">Accessories</option>
            <option value="Footwear">Footwear</option>
            <option value="Home">Home</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <span className="field-error">{errors.category}</span>
          )}
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="product-price">
            Price (₹) *
          </label>
          <input
            id="product-price"
            className="field-control"
            type="number"
            name="price"
            value={form.price}
            onChange={updateField}
            min="0.01"
            step="0.01"
            aria-invalid={Boolean(errors.price)}
            placeholder="2499"
          />
          {errors.price && (
            <span className="field-error">{errors.price}</span>
          )}
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="product-stock">
            Stock quantity *
          </label>
          <input
            id="product-stock"
            className="field-control"
            type="number"
            name="stock"
            value={form.stock}
            onChange={updateField}
            min="0"
            step="1"
            aria-invalid={Boolean(errors.stock)}
            placeholder="50"
          />
          {errors.stock && (
            <span className="field-error">{errors.stock}</span>
          )}
        </div>

        <div className="field-group product-form-full">
          <label className="field-label" htmlFor="product-description">
            Description
          </label>
          <textarea
            id="product-description"
            className="field-control product-description"
            name="description"
            value={form.description}
            onChange={updateField}
            maxLength={500}
            rows={4}
            aria-invalid={Boolean(errors.description)}
            placeholder="Add a short product description..."
          />
          <span className="product-form-hint">
            {form.description.length}/500 characters
          </span>
          {errors.description && (
            <span className="field-error">{errors.description}</span>
          )}
        </div>
      </div>

      <div className="product-form-actions">
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {initialData ? "Save Changes" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
