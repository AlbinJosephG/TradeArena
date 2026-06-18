import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import API from "../services/api";
import UserHeader from "../components/UserHeader";
import "./StockHistory.css";

function StockHistory() {
  const { stockId } = useParams();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  useEffect(() => {
    API.get(`/stocks/${stockId}/price-history`)
      .then((res) => {
        setHistory(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [stockId]);

  const chartData = history.map((item, index) => ({
    name: `Move ${index + 1}`,
    price: item.newPrice,
  }));

  if (loading) {
    return <div className="history-loading">Loading stock history...</div>;
  }

  return (
    <div className="history-page">
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
          <a href="/leaderboard">Leaderboard</a>
          <a href="/seasons">Seasons</a>
        </nav>
      </aside>

      <main className="history-main">
        <header className="history-header">
          <a href="/stocks" className="back-btn">
  ← Back to Stocks
</a>
          <div>
            <p className="eyebrow">Market History</p>
            <h1>Stock Price History</h1>
            <p>Track price movement and percentage changes over time.</p>
          </div>
          
          <UserHeader />
        </header>

        {history.length > 0 && (
          <section className="history-summary">
            <div>
              <span>Stock</span>
              <strong>{history[0].symbol}</strong>
            </div>

            <div>
              <span>Latest Price</span>
              <strong>{money(history[history.length - 1].newPrice)}</strong>
            </div>

            <div>
              <span>Total Movements</span>
              <strong>{history.length}</strong>
            </div>
          </section>
        )}

        <section className="history-chart-card">
          <h2>Price Movement Chart</h2>

          {history.length === 0 ? (
            <div className="empty-state">No price history available yet.</div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </section>

        <section className="history-table-card">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Old Price</th>
                <th>New Price</th>
                <th>Change %</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {[...history].reverse().map((item, index) => (
                <tr key={index}>
                  <td>
                    <strong>{item.symbol}</strong>
                  </td>
                  <td>{money(item.oldPrice)}</td>
                  <td>{money(item.newPrice)}</td>
                  <td className={item.changePercent >= 0 ? "green" : "red"}>
                    {Number(item.changePercent || 0).toFixed(2)}%
                  </td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {history.length === 0 && (
            <div className="empty-state">No history records found.</div>
          )}
        </section>
      </main>
    </div>
  );
}

export default StockHistory;