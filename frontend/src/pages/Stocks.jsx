import { useEffect, useState } from "react";
import API from "../services/api";
import SeasonSelector from "../components/SeasonSelector";
import UserHeader from "../components/UserHeader";
import "./Stocks.css";

function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const userId = localStorage.getItem("userId");
  const seasonId = localStorage.getItem("seasonId") || 2;

  const selectedSeason = seasons.find(
    (season) => Number(season.id) === Number(seasonId)
  );

  const isTradingAllowed =
    selectedSeason?.status?.toUpperCase() === "ACTIVE";

  const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const fetchStocks = async () => {
    const res = await API.get("/stocks");
    setStocks(res.data);
  };

  const fetchSeasons = async () => {
    const res = await API.get("/seasons");
    setSeasons(res.data);
  };

  useEffect(() => {
    fetchStocks();
    fetchSeasons();
  }, []);

  const showMessage = (text, type = "info") => {
    setMessage(text);
    setMessageType(type);
  };

  const handleQuantityChange = (stockId, value) => {
    setQuantities({
      ...quantities,
      [stockId]: value,
    });
  };

  const validateTrade = (stockId) => {
    const quantity = Number(quantities[stockId]);

    if (!isTradingAllowed) {
      showMessage("Trading is allowed only for ACTIVE seasons.", "error");
      return null;
    }

    if (!quantity || quantity <= 0) {
      showMessage("Enter a valid quantity greater than 0.", "error");
      return null;
    }

    if (!Number.isInteger(quantity)) {
      showMessage("Quantity must be a whole number.", "error");
      return null;
    }

    return quantity;
  };

  const buyStock = async (stockId) => {
    const quantity = validateTrade(stockId);
    if (!quantity) return;

    try {
      const res = await API.post("/trade/buy", {
        userId: Number(userId),
        seasonId: Number(seasonId),
        stockId,
        quantity,
      });

      showMessage(res.data, "success");
      setQuantities({ ...quantities, [stockId]: "" });
    } catch (err) {
      showMessage(
        err.response?.data || "Buy failed. Please check wallet or season.",
        "error"
      );
    }
  };

  const sellStock = async (stockId) => {
    const quantity = validateTrade(stockId);
    if (!quantity) return;

    try {
      const res = await API.post("/trade/sell", {
        userId: Number(userId),
        seasonId: Number(seasonId),
        stockId,
        quantity,
      });

      showMessage(res.data, "success");
      setQuantities({ ...quantities, [stockId]: "" });
    } catch (err) {
      showMessage(
        err.response?.data || "Sell failed. Please check your holdings.",
        "error"
      );
    }
  };

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
      stock.companyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="stocks-page">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">T</div>
          <span>TradeArena</span>
        </div>

        <nav>
          <a href="/dashboard">Dashboard</a>
          <a className="active" href="/stocks">Stocks</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/transactions">Transactions</a>
          <a href="/leaderboard">Leaderboard</a>
          <a href="/seasons">Seasons</a>
        </nav>
      </aside>

      <main className="stocks-main">
        <header className="stocks-header">
          <div>
            <p className="eyebrow">Market Watch</p>
            <h1>Stocks</h1>
            <p>Buy, sell and track virtual stock prices.</p>
          </div>

          <div className="header-actions">
            <SeasonSelector />
            <UserHeader />
          </div>
        </header>

        {selectedSeason && (
          <div className={`season-trade-status ${isTradingAllowed ? "active" : "closed"}`}>
            Current Season: <strong>{selectedSeason.name}</strong> —{" "}
            {isTradingAllowed ? "Trading Open" : "Trading Closed"}
          </div>
        )}

        <div className="stocks-toolbar">
          <input
            type="text"
            placeholder="Search by symbol or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {message && (
          <div className={`stocks-message ${messageType}`}>
            {message}
          </div>
        )}

        <section className="stocks-grid">
          {filteredStocks.map((stock) => (
            <div className="stock-card" key={stock.id}>
              <div className="stock-top">
                <div>
                  <h3>{stock.symbol}</h3>
                  <p>{stock.companyName}</p>
                </div>

                <strong>{money(stock.currentPrice)}</strong>
              </div>

              <div className="stock-actions">
                <input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Qty"
                  value={quantities[stock.id] || ""}
                  onChange={(e) =>
                    handleQuantityChange(stock.id, e.target.value)
                  }
                  disabled={!isTradingAllowed}
                />

                <button
                  className="buy-btn"
                  onClick={() => buyStock(stock.id)}
                  disabled={!isTradingAllowed}
                >
                  Buy
                </button>

                <button
                  className="sell-btn"
                  onClick={() => sellStock(stock.id)}
                  disabled={!isTradingAllowed}
                >
                  Sell
                </button>
              </div>

              <a className="history-link" href={`/stocks/${stock.id}/history`}>
                View Price History
              </a>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Stocks;