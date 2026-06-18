import { useEffect, useState } from "react";
import API from "../services/api";
import "./AdminDashboard.css";
import UserHeader from "../components/UserHeader";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [seasons, setSeasons] = useState([]);
const [selectedSeason, setSelectedSeason] = useState(
  localStorage.getItem("seasonId") || 2
);

  const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setDashboard(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const randomMarketMove = async () => {
    try {
      await API.put("/stocks/random-prices");
      setMessage("Market prices updated successfully");
      fetchDashboard();
    } catch (err) {
      setMessage("Failed to update market prices");
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading admin dashboard...</div>;
  }

  if (!dashboard) {
    return <div className="admin-loading">Admin dashboard not found</div>;
  }

  return (
    <div className="admin-page">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">T</div>
          <span>TradeArena</span>
        </div>

        <nav>
          <a className="active" href="/admin">Admin Dashboard</a>
          <a href="/admin/seasons">Manage Seasons</a>
          <a href="/admin/stocks">Manage Stocks</a>

        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p className="eyebrow">Admin Control Center</p>
            <h1>Admin Dashboard</h1>
            <p>Monitor users, trades, stocks and season performance.</p>
          </div>

          <button className="market-btn" onClick={randomMarketMove}>
            Random Market Move
          </button>

           <UserHeader />
        </header>

        {message && <div className="admin-message">{message}</div>}

        <section className="admin-stats-grid">
          <div className="admin-stat-card">
            <span>Total Users</span>
            <strong>{dashboard.totalUsers}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Total Stocks</span>
            <strong>{dashboard.totalStocks}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Total Trades</span>
            <strong>{dashboard.totalTrades}</strong>
          </div>

          <div className="admin-stat-card highlight">
            <span>Market Volume</span>
            <strong>{money(dashboard.marketVolume)}</strong>
          </div>

          <div className="admin-stat-card wide">
            <span>Active Season</span>
            <strong>{dashboard.activeSeason}</strong>
          </div>
        </section>

        <section className="admin-section">
          <div className="section-title">
            <div>
              <h2>Top Users</h2>
              <p>Top performers in the active season.</p>
            </div>
          </div>

          <div className="admin-table-card">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Cash Balance</th>
                  <th>Portfolio Value</th>
                  <th>Total Value</th>
                  <th>Profit/Loss</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.topUsers?.map((user) => (
                  <tr key={user.rank}>
                    <td>
                      <span className={`admin-rank rank-${user.rank}`}>
                        #{user.rank}
                      </span>
                    </td>
                    <td>
                      <strong>{user.userName}</strong>
                      <small>Season participant</small>
                    </td>
                    <td>{money(user.cashBalance)}</td>
                    <td>{money(user.portfolioValue)}</td>
                    <td>
                      <strong>{money(user.totalValue)}</strong>
                    </td>
                    <td className={user.profitLoss >= 0 ? "green" : "red"}>
                      {money(user.profitLoss)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {dashboard.topUsers?.length === 0 && (
              <div className="empty-state">No users in active season.</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;