import { NavLink } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, ShoppingBag } from "lucide-react";
import "./footer.css";

const workspaceLinks = [
  { label: "Dashboard", path: "/" },
  { label: "Orders", path: "/orders" },
  { label: "Products", path: "/products" },
  { label: "Customers", path: "/customers" }
];

const exploreLinks = [
  { label: "Analytics", path: "/analytics" },
  { label: "Marketing", path: "/marketing" },
  { label: "Settings", path: "/settings" }
];

function FooterLinks({ title, links }) {
  return (
    <div className="footer-link-column">
      <h3>{title}</h3>
      {links.map((link) => (
        <NavLink key={link.path} to={link.path}>
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-main">
        <section className="footer-brand-section">
          <NavLink to="/" className="footer-brand">
            <span className="footer-brand-icon">
              <ShoppingBag size={20} />
            </span>
            <span>StoreFlow</span>
          </NavLink>

          <p>
            A simpler way to manage your store, understand your business,
            and keep everything moving.
          </p>

          <span className="footer-workspace-badge">
            <CheckCircle2 size={14} />
            Your store workspace
          </span>
        </section>

        <FooterLinks title="Workspace" links={workspaceLinks} />
        <FooterLinks title="Explore" links={exploreLinks} />

        <NavLink to="/analytics" className="footer-promo">
          <div className="footer-promo-top">
            <span>GROW YOUR BUSINESS</span>
            <ArrowUpRight size={21} />
          </div>

          <h3>Make better decisions with your store data.</h3>

          <div className="footer-promo-bottom">
            <span>Explore your store performance</span>
            <ArrowUpRight size={16} />
          </div>
        </NavLink>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} StoreFlow. All rights reserved.</span>
        <span>Designed for smoother store management.</span>
      </div>
    </footer>
  );
}