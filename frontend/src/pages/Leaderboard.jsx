import { useEffect, useState } from "react";
import API from "../services/api";
import SeasonSelector from "../components/SeasonSelector";
import "./Leaderboard.css";
import UserHeader from "../components/UserHeader";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const seasonId = localStorage.getItem("seasonId") || 2;

  const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  useEffect(() => {
    setLoading(true);

    API.get(`/trade/leaderboard/${seasonId}`)
      .then((res) => {
        setLeaderboard(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [seasonId]);

  if (loading) {
    return <div className="leaderboard-loading">Loading leaderboard...</div>;
  }

  return (
    <div className="leaderboard-page">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">T</div>
          <span>TradeArena</span>
        </div>

        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/stocks">Stocks</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/transactions">Transactions</a>
          <a className="active" href="/leaderboard">Leaderboard</a>
          <a href="/seasons">Seasons</a>
        </nav>
      </aside>

      <main className="leaderboard-main">
        <header className="leaderboard-header">
          <div>
            <p className="eyebrow">Competition</p>
            <h1>Leaderboard</h1>
            <p>
              Rankings based on total portfolio value in the selected season.
            </p>
          </div>

          <SeasonSelector />
          <UserHeader />
        </header>

        {leaderboard.length > 0 && (
          <section className="top-rank-card">
            <div className="crown">#1</div>

            <div>
              <p>Current Leader</p>
              <h2>{leaderboard[0].userName}</h2>
              <span>
                Total Value: {money(leaderboard[0].totalValue)}
              </span>
            </div>

            <strong
              className={
                leaderboard[0].profitLoss >= 0 ? "green" : "red"
              }
            >
              {money(leaderboard[0].profitLoss)}
            </strong>
          </section>
        )}

        <section className="leaderboard-table-card">
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
              {leaderboard.map((user) => (
                <tr
                  key={user.rank}
                  className={user.rank <= 3 ? "top-row" : ""}
                >
                  <td>
                    <span className={`rank-badge rank-${user.rank}`}>
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

                  <td
                    className={
                      user.profitLoss >= 0 ? "green" : "red"
                    }
                  >
                    {money(user.profitLoss)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {leaderboard.length === 0 && (
            <div className="empty-state">
              No users in leaderboard yet.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Leaderboard;