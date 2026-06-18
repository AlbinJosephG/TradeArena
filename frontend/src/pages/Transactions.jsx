import { useEffect, useState } from "react";
import API from "../services/api";
import SeasonSelector from "../components/SeasonSelector";
import "./Transactions.css";
import UserHeader from "../components/UserHeader";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const seasonId = localStorage.getItem("seasonId") || 2;

  const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  useEffect(() => {
    setLoading(true);

    API.get(`/trade/transactions/details/${userId}/${seasonId}`)
      .then((res) => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [userId, seasonId]);

  if (loading) {
    return <div className="transactions-loading">Loading transactions...</div>;
  }

  return (
    <div className="transactions-page">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">T</div>
          <span>TradeArena</span>
        </div>

        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/stocks">Stocks</a>
          <a href="/portfolio">Portfolio</a>
          <a className="active" href="/transactions">Transactions</a>
          <a href="/leaderboard">Leaderboard</a>
          <a href="/seasons">Seasons</a>
        </nav>
      </aside>

      <main className="transactions-main">
        <header className="transactions-header">
          <div>
            <p className="eyebrow">Trade History</p>
            <h1>Transactions</h1>
            <p>View your latest buy and sell activity.</p>
          </div>

          <SeasonSelector />
          <UserHeader />
        </header>

        <section className="transactions-table-card">
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
              {transactions.map((tx, index) => (
                <tr key={index}>
                  <td>
                    <span
                      className={`trade-badge ${tx.transactionType.toLowerCase()}`}
                    >
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

          {transactions.length === 0 && (
            <div className="empty-state">
              No transactions yet. Buy or sell stocks to see history.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Transactions;