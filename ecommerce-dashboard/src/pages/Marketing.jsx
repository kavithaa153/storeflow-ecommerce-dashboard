
import { useState } from "react";
import {
  Megaphone,
  Plus,
  ArrowUpRight,
  MousePointerClick,
  ShoppingCart,
  Users,
  Tag,
  MoreHorizontal,
  CalendarDays,
  ArrowRight
} from "lucide-react";
import "./marketing.css";

const initialCampaigns = [
  {
    id: 1,
    name: "Summer Essentials",
    type: "Product promotion",
    status: "Active",
    budget: 12000,
    clicks: 1248,
    conversions: 86,
    color: "lime"
  },
  {
    id: 2,
    name: "Welcome Offer",
    type: "Customer acquisition",
    status: "Active",
    budget: 8000,
    clicks: 864,
    conversions: 54,
    color: "green"
  },
  {
    id: 3,
    name: "Weekend Specials",
    type: "Discount campaign",
    status: "Draft",
    budget: 5000,
    clicks: 0,
    conversions: 0,
    color: "neutral"
  }
];

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);

function Marketing() {
  const [campaigns, setCampaigns] = useState(() => {
    try {
      const saved = localStorage.getItem("storeflow_campaigns");
      return saved ? JSON.parse(saved) : initialCampaigns;
    } catch {
      return initialCampaigns;
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [campaignType, setCampaignType] = useState("Product promotion");
  const [budget, setBudget] = useState("5000");
  const [message, setMessage] = useState("");

  const activeCampaigns = campaigns.filter(
    (campaign) => campaign.status === "Active"
  );

  const totalClicks = campaigns.reduce(
    (sum, campaign) => sum + Number(campaign.clicks || 0),
    0
  );

  const totalConversions = campaigns.reduce(
    (sum, campaign) => sum + Number(campaign.conversions || 0),
    0
  );

  const totalBudget = campaigns.reduce(
    (sum, campaign) => sum + Number(campaign.budget || 0),
    0
  );

  function saveCampaign(event) {
    event.preventDefault();

    if (!campaignName.trim() || Number(budget) <= 0) {
      setMessage("Enter a campaign name and a valid budget.");
      return;
    }

    const campaign = {
      id: Date.now(),
      name: campaignName.trim(),
      type: campaignType,
      status: "Draft",
      budget: Number(budget),
      clicks: 0,
      conversions: 0,
      color: "neutral"
    };

    const updated = [campaign, ...campaigns];
    setCampaigns(updated);

    try {
      localStorage.setItem("storeflow_campaigns", JSON.stringify(updated));
    } catch {
      setMessage("Unable to save campaign in browser storage.");
      return;
    }

    setCampaignName("");
    setBudget("5000");
    setCampaignType("Product promotion");
    setMessage("Campaign created successfully.");
    setShowForm(false);
  }

  function toggleCampaign(id) {
    const updated = campaigns.map((campaign) =>
      campaign.id === id
        ? {
            ...campaign,
            status: campaign.status === "Active" ? "Paused" : "Active"
          }
        : campaign
    );

    setCampaigns(updated);

    try {
      localStorage.setItem("storeflow_campaigns", JSON.stringify(updated));
    } catch {
      setMessage("Unable to save the campaign update.");
    }
  }

  return (
    <main className="store-content marketing-page">
      <section className="marketing-hero">
        <div className="marketing-hero-copy">
          <span className="marketing-eyebrow">
            <Megaphone size={14} /> GROW YOUR BUSINESS
          </span>
          <h1>Marketing</h1>
          <p>
            Create campaigns, connect with customers, and track your marketing
            performance in one place.
          </p>
        </div>

        <button
          className="marketing-primary-button"
          onClick={() => {
            setMessage("");
            setShowForm(!showForm);
          }}
        >
          <Plus size={17} />
          Create campaign
        </button>
      </section>

      {message && (
        <div className="marketing-message" role="status">
          {message}
        </div>
      )}

      {showForm && (
        <section className="marketing-panel marketing-form-panel">
          <div className="marketing-section-heading">
            <div>
              <h2>Create a campaign</h2>
              <p>Set up a new campaign for your store.</p>
            </div>
            <button
              className="marketing-close-button"
              onClick={() => setShowForm(false)}
              aria-label="Close form"
            >
              ×
            </button>
          </div>

          <form className="marketing-form" onSubmit={saveCampaign}>
            <label>
              Campaign name
              <input
                value={campaignName}
                onChange={(event) => setCampaignName(event.target.value)}
                placeholder="e.g. Festive season offer"
                required
                maxLength={80}
              />
            </label>

            <label>
              Campaign type
              <select
                value={campaignType}
                onChange={(event) => setCampaignType(event.target.value)}
              >
                <option>Product promotion</option>
                <option>Customer acquisition</option>
                <option>Discount campaign</option>
                <option>Email marketing</option>
              </select>
            </label>

            <label>
              Planned budget (₹)
              <input
                type="number"
                min="1"
                max="100000000"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                required
              />
            </label>

            <button className="marketing-primary-button" type="submit">
              <Plus size={16} /> Save campaign
            </button>
          </form>
        </section>
      )}

      <section className="marketing-stats-grid">
        <article className="marketing-stat-card">
          <div className="marketing-stat-top">
            <span>Active campaigns</span>
            <span className="marketing-stat-icon lime">
              <Megaphone size={19} />
            </span>
          </div>
          <strong>{activeCampaigns.length}</strong>
          <span className="marketing-stat-note">Currently running</span>
        </article>

        <article className="marketing-stat-card">
          <div className="marketing-stat-top">
            <span>Total campaign clicks</span>
            <span className="marketing-stat-icon green">
              <MousePointerClick size={19} />
            </span>
          </div>
          <strong>{totalClicks.toLocaleString("en-IN")}</strong>
          <span className="marketing-stat-note">Recorded campaign activity</span>
        </article>

        <article className="marketing-stat-card">
          <div className="marketing-stat-top">
            <span>Conversions</span>
            <span className="marketing-stat-icon yellow">
              <ShoppingCart size={19} />
            </span>
          </div>
          <strong>{totalConversions.toLocaleString("en-IN")}</strong>
          <span className="marketing-stat-note">Recorded campaign conversions</span>
        </article>

        <article className="marketing-stat-card">
          <div className="marketing-stat-top">
            <span>Planned budget</span>
            <span className="marketing-stat-icon neutral">
              <Tag size={19} />
            </span>
          </div>
          <strong className="marketing-budget-value">
            {formatPrice(totalBudget)}
          </strong>
          <span className="marketing-stat-note">Total configured budgets</span>
        </article>
      </section>

      <section className="marketing-content-grid">
        <article className="marketing-panel marketing-campaigns-panel">
          <div className="marketing-section-heading">
            <div>
              <h2>Your campaigns</h2>
              <p>Manage your marketing activities.</p>
            </div>
            <span className="marketing-count">{campaigns.length} campaigns</span>
          </div>

          <div className="marketing-campaign-list">
            {campaigns.map((campaign) => (
              <article className="marketing-campaign-row" key={campaign.id}>
                <div className={`marketing-campaign-symbol ${campaign.color}`}>
                  <Megaphone size={20} />
                </div>

                <div className="marketing-campaign-info">
                  <strong>{campaign.name}</strong>
                  <span>{campaign.type}</span>
                  <div className="marketing-campaign-metrics">
                    <span>
                      <MousePointerClick size={13} />
                      {campaign.clicks.toLocaleString("en-IN")} clicks
                    </span>
                    <span>
                      <Users size={13} />
                      {campaign.conversions} conversions
                    </span>
                  </div>
                </div>

                <div className="marketing-campaign-end">
                  <span
                    className={`marketing-status ${campaign.status.toLowerCase()}`}
                  >
                    <span />
                    {campaign.status}
                  </span>
                  <strong>{formatPrice(campaign.budget)}</strong>
                  <button
                    className="marketing-action-button"
                    onClick={() => toggleCampaign(campaign.id)}
                    disabled={campaign.status === "Draft"}
                    title={
                      campaign.status === "Active"
                        ? "Pause campaign"
                        : "Activate campaign"
                    }
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </div>
              </article>
            ))}

            {campaigns.length === 0 && (
              <div className="marketing-empty-state">
                <Megaphone size={28} />
                <strong>No campaigns yet</strong>
                <span>Create your first campaign to get started.</span>
              </div>
            )}
          </div>
        </article>

        <article className="marketing-panel marketing-tips-panel">
          <div className="marketing-tip-illustration">
            <div className="marketing-tip-icon">
              <ArrowUpRight size={29} />
            </div>
            <div className="marketing-tip-decoration decoration-one" />
            <div className="marketing-tip-decoration decoration-two" />
          </div>

          <span className="marketing-eyebrow">GROWTH PLAYBOOK</span>
          <h2>Make every campaign count.</h2>
          <p>
            Start with a clear goal, choose the right audience, and review
            campaign results regularly.
          </p>

          <div className="marketing-tip-list">
            <div>
              <span>01</span>
              <p>Promote products with healthy inventory.</p>
            </div>
            <div>
              <span>02</span>
              <p>Set a budget before launching a campaign.</p>
            </div>
            <div>
              <span>03</span>
              <p>Measure conversions, not clicks alone.</p>
            </div>
          </div>

          <div className="marketing-tip-footer">
            <CalendarDays size={16} />
            Review your campaign performance weekly
            <ArrowRight size={15} />
          </div>
        </article>
      </section>
    </main>
  );
}

export default Marketing;
