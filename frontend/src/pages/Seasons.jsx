import { useEffect, useState } from "react";
import API from "../services/api";
import "./Seasons.css";
import UserHeader from "../components/UserHeader";

function Seasons() {
  const [seasons, setSeasons] = useState([]);
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId");

  const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const fetchSeasons = async () => {
    const res = await API.get("/seasons");
    setSeasons(res.data);
  };

  useEffect(() => {
    fetchSeasons();
  }, []);

  const joinSeason = async (seasonId) => {
    try {
      await API.post(`/wallet/create/${userId}/${seasonId}`);

      localStorage.setItem("seasonId", seasonId);

      setMessage("Season joined successfully. This season is now selected.");
    } catch (err) {
      setMessage("Failed to join season");
    }
  };

  const selectSeason = (seasonId) => {
    localStorage.setItem("seasonId", seasonId);
    setMessage("Season selected successfully.");
  };

  return (
    <div className="seasons-page">
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
          <a className="active" href="/seasons">Seasons</a>

        </nav>
      </aside>

      <main className="seasons-main">
        <header className="seasons-header">
          <div>
            <p className="eyebrow">Trading Competitions</p>
            <h1>Seasons</h1>
            <p>Join active seasons and switch between competitions.</p>
          </div>
          <UserHeader />
        </header>

        {message && <div className="season-message">{message}</div>}

        <section className="season-grid">
          {seasons.map((season) => (
            <div className="season-card" key={season.id}>
              <div className="season-top">
                <div>
                  <h3>{season.name}</h3>
                  <p>
                    {season.startDate} → {season.endDate}
                  </p>
                </div>

                <span className={`season-status ${season.status?.toLowerCase()}`}>
                  {season.status}
                </span>
              </div>

              <div className="season-balance">
                <span>Starting Balance</span>
                <strong>{money(season.startingBalance)}</strong>
              </div>

              <div className="season-actions">
                <button onClick={() => joinSeason(season.id)}>
                  Join Season
                </button>

                <button className="secondary" onClick={() => selectSeason(season.id)}>
                  Select
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Seasons;