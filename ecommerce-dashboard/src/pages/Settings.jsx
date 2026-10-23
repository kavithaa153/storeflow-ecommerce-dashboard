
import { useEffect, useState } from "react";
import { Store, Bell, Globe, Save } from "lucide-react";
import "./settings.css";

const STORAGE_KEY = "ecommerce_dashboard_settings";

const defaultSettings = {
  storeName: "GreenCart Store",
  email: "admin@greencart.com",
  currency: "INR",
  timezone: "Asia/Kolkata",
  orderNotifications: true,
  stockNotifications: true,
  marketingNotifications: false
};

function Settings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return undefined;

    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    setSettings((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (!settings.storeName.trim()) {
      setToast("Please enter your store name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)) {
      setToast("Please enter a valid email address.");
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setToast("Settings saved successfully.");
    } catch {
      setToast("Unable to save settings in this browser.");
    }
  };

  return (
    <main className="store-content settings-page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">PREFERENCES</span>
          <h1>Settings</h1>
          <p>Manage your store information and dashboard preferences.</p>
        </div>
      </section>

      <form className="settings-form" onSubmit={handleSave}>
        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-icon">
              <Store size={20} />
            </div>
            <div>
              <h2>Store information</h2>
              <p>Configure your store's basic details.</p>
            </div>
          </div>

          <div className="settings-fields">
            <label className="settings-field">
              <span>Store name</span>
              <input
                name="storeName"
                value={settings.storeName}
                onChange={updateField}
                maxLength={80}
                required
              />
            </label>

            <label className="settings-field">
              <span>Contact email</span>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={updateField}
                required
              />
            </label>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-icon">
              <Globe size={20} />
            </div>
            <div>
              <h2>Regional preferences</h2>
              <p>Choose the currency and time zone for your store.</p>
            </div>
          </div>

          <div className="settings-fields">
            <label className="settings-field">
              <span>Currency</span>
              <select
                name="currency"
                value={settings.currency}
                onChange={updateField}
              >
                <option value="INR">Indian Rupee (INR ₹)</option>
                <option value="USD">US Dollar (USD $)</option>
                <option value="EUR">Euro (EUR €)</option>
                <option value="GBP">British Pound (GBP £)</option>
              </select>
            </label>

            <label className="settings-field">
              <span>Time zone</span>
              <select
                name="timezone"
                value={settings.timezone}
                onChange={updateField}
              >
                <option value="Asia/Kolkata">India Standard Time</option>
                <option value="Europe/London">United Kingdom</option>
                <option value="America/New_York">Eastern Time (US)</option>
                <option value="UTC">UTC</option>
              </select>
            </label>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-icon">
              <Bell size={20} />
            </div>
            <div>
              <h2>Notification preferences</h2>
              <p>Choose which notifications you want enabled.</p>
            </div>
          </div>

          <div className="settings-notifications">
            <label className="settings-toggle-row">
              <span>
                <strong>Order notifications</strong>
                <small>Receive alerts about order updates.</small>
              </span>
              <input
                type="checkbox"
                name="orderNotifications"
                checked={settings.orderNotifications}
                onChange={updateField}
              />
            </label>

            <label className="settings-toggle-row">
              <span>
                <strong>Low-stock notifications</strong>
                <small>Enable alerts for inventory that needs attention.</small>
              </span>
              <input
                type="checkbox"
                name="stockNotifications"
                checked={settings.stockNotifications}
                onChange={updateField}
              />
            </label>

            <label className="settings-toggle-row">
              <span>
                <strong>Marketing notifications</strong>
                <small>Enable promotional and marketing preferences.</small>
              </span>
              <input
                type="checkbox"
                name="marketingNotifications"
                checked={settings.marketingNotifications}
                onChange={updateField}
              />
            </label>
          </div>
        </section>

        <div className="settings-save-row">
          <button type="submit" className="settings-save-button">
            <Save size={17} />
            Save settings
          </button>
        </div>
      </form>

      {toast && (
        <div className="product-toast" role="status">
          <span className="toast-check">✓</span>
          {toast}
        </div>
      )}
    </main>
  );
}

export default Settings;
