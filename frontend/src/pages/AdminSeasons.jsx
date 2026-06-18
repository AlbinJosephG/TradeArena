import { useEffect, useState } from "react";
import API from "../services/api";
import UserHeader from "../components/UserHeader";
import "./AdminSeasons.css";

function AdminSeasons() {
  const [seasons, setSeasons] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    startingBalance: "",
    status: "UPCOMING",
  });

  const fetchSeasons = async () => {
    const res = await API.get("/seasons");
    setSeasons(res.data);
  };

  useEffect(() => {
    fetchSeasons();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createSeason = async (e) => {
    e.preventDefault();

    await API.post("/seasons", {
      name: form.name,
      startDate: form.startDate,
      endDate: form.endDate,
      startingBalance: Number(form.startingBalance),
      status: form.status,
    });

    setMessage("Season created successfully");

    setForm({
      name: "",
      startDate: "",
      endDate: "",
      startingBalance: "",
      status: "UPCOMING",
    });

    fetchSeasons();
  };

  const updateStatus = async (season, status) => {
    await API.put(`/seasons/${season.id}`, {
      name: season.name,
      startDate: season.startDate,
      endDate: season.endDate,
      startingBalance: season.startingBalance,
      status,
    });

    setMessage(`Season marked as ${status}`);
    fetchSeasons();
  };

  const deleteSeason = async (id) => {
    await API.delete(`/seasons/${id}`);
    setMessage("Season deleted successfully");
    fetchSeasons();
  };

  const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="admin-seasons-page">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">T</div>
          <span>TradeArena Admin</span>
        </div>

        <nav>
          <a href="/admin">Admin Dashboard</a>
          <a className="active" href="/admin/seasons">
            Manage Seasons
          </a>
          <a href="/admin/stocks">Manage Stocks</a>
        </nav>
      </aside>

      <main className="admin-seasons-main">
        <header className="admin-seasons-header">
          <div>
            <p className="eyebrow">Competition Control</p>
            <h1>Manage Seasons</h1>
            <p>Create, activate, end and delete trading competitions.</p>
          </div>

          <UserHeader />
        </header>

        {message && <div className="admin-season-message">{message}</div>}

        <section className="season-create-card">
          <h2>Create New Season</h2>

          <form onSubmit={createSeason} className="season-form">
            <input
              name="name"
              placeholder="Season name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
              required
            />

            <input
              name="endDate"
              type="date"
              value={form.endDate}
              onChange={handleChange}
              required
            />

            <input
              name="startingBalance"
              type="number"
              placeholder="Starting balance"
              value={form.startingBalance}
              onChange={handleChange}
              required
            />

            <select name="status" value={form.status} onChange={handleChange}>
              <option value="UPCOMING">UPCOMING</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>

            <button type="submit">Create Season</button>
          </form>
        </section>

        <section className="admin-season-grid">
          {seasons.map((season) => (
            <div className="admin-season-card" key={season.id}>
              <div className="season-card-top">
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

              <div className="season-money">
                <span>Starting Balance</span>
                <strong>{money(season.startingBalance)}</strong>
              </div>

              <div className="admin-season-actions">
                <button onClick={() => updateStatus(season, "ACTIVE")}>
                  Activate
                </button>

                <button
                  className="end-btn"
                  onClick={() => updateStatus(season, "COMPLETED")}
                >
                  End
                </button>

                <button
                  className="upcoming-btn"
                  onClick={() => updateStatus(season, "UPCOMING")}
                >
                  Upcoming
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteSeason(season.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default AdminSeasons;