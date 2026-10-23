import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import Inventory from "../pages/Inventory";
import Analytics from "../pages/Analytics";
import Marketing from "../pages/Marketing";
import Settings from "../pages/Settings";
function PlaceholderPage({ title }) {
  return (
    <main className="store-content">
      <h1>{title}</h1>
      <p>Manage your store from one place.</p>
    </main>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/marketing" element={<Marketing />} />
      <Route path="/settings" element={<Settings />} />

      <Route
        path="/analytics"
        element={<PlaceholderPage title="Analytics" />}
      />
      <Route
        path="/marketing"
        element={<PlaceholderPage title="Marketing" />}
      />
      <Route
        path="/settings"
        element={<PlaceholderPage title="Settings" />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}