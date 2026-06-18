import { useEffect, useState } from "react";
import API from "../services/api";
import SeasonSelector from "../components/SeasonSelector";
import "./Portfolio.css";
import UserHeader from "../components/UserHeader";

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const seasonId = localStorage.getItem("seasonId") || 2;

  const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  useEffect(() => {
    setLoading(true);

    API.get(`/trade/portfolio/details/${userId}/${seasonId}`)
      .then((res) => {
        setPortfolio(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [userId, seasonId]);

  if (loading) {
    return <div className="portfolio-loading">Loading portfolio...</div>;
  }

  return (
    <div className="portfolio-page">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">T</div>
          <span>TradeArena</span>
        </div>

        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/stocks">Stocks</a>
          <a className="active" href="/portfolio">Portfolio</a>
          <a href="/transactions">Transactions</a>
          <a href="/leaderboard">Leaderboard</a>
          <a href="/seasons">Seasons</a>
        </nav>
      </aside>

      <main className="portfolio-main">
        <header className="portfolio-header">
          <div>
            <p className="eyebrow">Holdings</p>
            <h1>Portfolio</h1>
            <p>Track your holdings, current value and profit/loss.</p>
          </div>

          <SeasonSelector />
          <UserHeader />
        </header>

        <section className="portfolio-table-card">
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Qty</th>
                <th>Avg Price</th>
                <th>Current Price</th>
                <th>Invested</th>
                <th>Current Value</th>
                <th>P/L</th>
                <th>P/L %</th>
              </tr>
            </thead>

            <tbody>
              {portfolio.map((item, index) => (
                <tr key={index}>
                  <td>
                    <strong>{item.symbol}</strong>
                    <small>{item.stockName}</small>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{money(item.averageBuyPrice)}</td>
                  <td>{money(item.currentPrice)}</td>
                  <td>{money(item.investedAmount)}</td>
                  <td>{money(item.currentValue)}</td>
                  <td className={item.profitLoss >= 0 ? "green" : "red"}>
                    {money(item.profitLoss)}
                  </td>
                  <td className={item.profitLossPercentage >= 0 ? "green" : "red"}>
                    {Number(item.profitLossPercentage || 0).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {portfolio.length === 0 && (
            <div className="empty-state">
              No holdings yet. Buy stocks from the Stocks page.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Portfolio;