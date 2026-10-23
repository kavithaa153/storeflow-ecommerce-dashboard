
import { BrowserRouter, NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Search,
  Bell,
  Settings,
  ChevronDown,
  ShoppingBag
} from "lucide-react";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/common/Footer";
import "./styles/top-navigation.css";

const navigation = [
  { label: "Dashboard", path: "/" },
  { label: "Orders", path: "/orders" },
  { label: "Products", path: "/products" },
  { label: "Customers", path: "/customers" },
  { label: "Analytics", path: "/analytics" },
  { label: "Marketing", path: "/marketing" }
];

function StoreLayout() {
  const [search, setSearch] = useState("");

  return (
    <div className="store-app">
      <header className="top-navigation">
        <NavLink to="/" className="store-brand">
          <span className="store-brand-icon">
            <ShoppingBag size={22} />
          </span>
          <span>StoreFlow</span>
        </NavLink>

        <nav className="top-nav-links">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `top-nav-link ${isActive ? "top-nav-link-active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="top-nav-actions">
          <label className="top-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search..."
              aria-label="Search dashboard"
            />
          </label>

          <NavLink
            to="/settings"
            className="top-icon-button"
            aria-label="Settings"
          >
            <Settings size={19} />
          </NavLink>

          <button
            type="button"
            className="top-icon-button"
            aria-label="Notifications"
          >
            <Bell size={19} />
          </button>

          <button
            type="button"
            className="top-profile"
            aria-label="Admin profile"
          >
            <span className="top-avatar">A</span>
            <ChevronDown size={15} />
          </button>
        </div>
      </header>

      <main className="store-main">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreLayout />
    </BrowserRouter>
  );
}
