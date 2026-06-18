import { useEffect, useState } from "react";
import API from "../services/api";
import SeasonSelector from "../components/SeasonSelector";
import "./UserDashboard.css";
import UserHeader from "../components/UserHeader";

function UserDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const seasonId = localStorage.getItem("seasonId") || 2;

  useEffect(() => {
    setLoading(true);

    API.get(`/trade/dashboard/user/${userId}/${seasonId}`)
      .then((res) => {
        setDashboard(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [userId, seasonId]);

  const money = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;
  };
  const joinSelectedSeason = async () => {
  try {
    await API.post(`/wallet/create/${userId}/${seasonId}`);
    window.location.reload();
  } catch (err) {
    console.error(err);
    alert("Failed to join season");
  }
};

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  if (!dashboard) {
  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">T</div>
          <span>TradeArena</span>
        </div>

        <nav>
          <a className="active" href="/dashboard">Dashboard</a>
          <a href="/stocks">Stocks</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/transactions">Transactions</a>
          <a href="/leaderboard">Leaderboard</a>
          <a href="/seasons">Seasons</a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-empty-card">
          <h2>No dashboard found for this season</h2>
          <p>
            You have selected a season that you have not joined yet. Join the
            season first to create your wallet and start trading.
          </p>

          <div className="empty-actions">
  <button onClick={joinSelectedSeason}>Join Season</button>
</div>
        </div>
      </main>
    </div>
  );
}

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">T</div>
          <span>TradeArena</span>
        </div>

        <nav>
          <a className="active" href="/dashboard">Dashboard</a>
          <a href="/stocks">Stocks</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/transactions">Transactions</a>
          <a href="/leaderboard">Leaderboard</a>
          <a href="/seasons">Seasons</a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Virtual Trading Arena</p>
            <h1>User Dashboard</h1>
            <p>Track your cash, portfolio value, rank and latest trades.</p>
          </div>

          <div className="header-actions">
            <SeasonSelector />

            <div className="rank-pill">
              Rank #{dashboard.rank}
            </div>
            <UserHeader />
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <span>Available Cash</span>
            <strong>{money(dashboard.cashBalance)}</strong>
          </div>

          <div className="stat-card">
            <span>Portfolio Value</span>
            <strong>{money(dashboard.portfolioValue)}</strong>
          </div>

          <div className="stat-card highlight">
            <span>Total Value</span>
            <strong>{money(dashboard.totalValue)}</strong>
          </div>

          <div className={`stat-card ${dashboard.profitLoss >= 0 ? "profit" : "loss"}`}>
            <span>Profit / Loss</span>
            <strong>{money(dashboard.profitLoss)}</strong>
          </div>

          <div className="stat-card">
            <span>Stocks Owned</span>
            <strong>{dashboard.stocksOwned}</strong>
          </div>

          <div className="stat-card">
            <span>Total Trades</span>
            <strong>{dashboard.totalTrades}</strong>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-title">
            <div>
              <h2>Recent Transactions</h2>
              <p>Your latest buy and sell activity</p>
            </div>
          </div>

          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Stock</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.recentTransactions?.map((tx, index) => (
                  <tr key={index}>
                    <td>
                      <span className={`trade-badge ${tx.transactionType.toLowerCase()}`}>
                        {tx.transactionType}
                      </span>
                    </td>
                    <td>
                      <strong>{tx.symbol}</strong>
                      <small>{tx.stockName}</small>
                    </td>
                    <td>{tx.quantity}</td>
                    <td>{money(tx.pricePerStock)}</td>
                    <td>{money(tx.totalAmount)}</td>
                    <td>{new Date(tx.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {dashboard.recentTransactions?.length === 0 && (
              <div className="empty-state">No recent transactions yet.</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserDashboard;