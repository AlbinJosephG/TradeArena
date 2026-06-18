import { useEffect, useState } from "react";
import API from "../services/api";
import UserHeader from "../components/UserHeader";
import "./AdminStocks.css";

function AdminStocks() {
  const [stocks, setStocks] = useState([]);
  const [message, setMessage] = useState("");
  const [editingStockId, setEditingStockId] = useState(null);

  const [form, setForm] = useState({
    symbol: "",
    companyName: "",
    currentPrice: "",
  });

  const [editForm, setEditForm] = useState({
    symbol: "",
    companyName: "",
    currentPrice: "",
  });

  const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const fetchStocks = async () => {
    const res = await API.get("/stocks");
    setStocks(res.data);
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const createStock = async (e) => {
    e.preventDefault();

    await API.post("/stocks", {
      symbol: form.symbol,
      companyName: form.companyName,
      currentPrice: Number(form.currentPrice),
    });

    setMessage("Stock created successfully");

    setForm({
      symbol: "",
      companyName: "",
      currentPrice: "",
    });

    fetchStocks();
  };

  const startEdit = (stock) => {
    setEditingStockId(stock.id);

    setEditForm({
      symbol: stock.symbol,
      companyName: stock.companyName,
      currentPrice: stock.currentPrice,
    });
  };

  const cancelEdit = () => {
    setEditingStockId(null);

    setEditForm({
      symbol: "",
      companyName: "",
      currentPrice: "",
    });
  };

  const updateStock = async (id) => {
    await API.put(`/stocks/${id}`, {
      symbol: editForm.symbol,
      companyName: editForm.companyName,
      currentPrice: Number(editForm.currentPrice),
    });

    setMessage("Stock updated successfully");
    setEditingStockId(null);
    fetchStocks();
  };

  const deleteStock = async (id) => {
    await API.delete(`/stocks/${id}`);
    setMessage("Stock deleted successfully");
    fetchStocks();
  };

  const randomPrice = async (id) => {
    await API.put(`/stocks/${id}/random-price`);
    setMessage("Stock price updated successfully");
    fetchStocks();
  };

  const randomAllPrices = async () => {
    await API.put("/stocks/random-prices");
    setMessage("All stock prices updated successfully");
    fetchStocks();
  };

  return (
    <div className="admin-stocks-page">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">T</div>
          <span>TradeArena Admin</span>
        </div>

        <nav>
          <a href="/admin">Admin Dashboard</a>
          <a href="/admin/seasons">Manage Seasons</a>
          <a className="active" href="/admin/stocks">
            Manage Stocks
          </a>
        </nav>
      </aside>

      <main className="admin-stocks-main">
        <header className="admin-stocks-header">
          <div>
            <p className="eyebrow">Market Control</p>
            <h1>Manage Stocks</h1>
            <p>Add, edit, delete and update virtual stock prices.</p>
          </div>

          <div className="header-actions">
            <button className="market-btn" onClick={randomAllPrices}>
              Random Market Move
            </button>

            <UserHeader />
          </div>
        </header>

        {message && <div className="admin-stock-message">{message}</div>}

        <section className="stock-create-card">
          <h2>Add New Stock</h2>

          <form onSubmit={createStock} className="stock-form">
            <input
              name="symbol"
              placeholder="Symbol e.g. TCS"
              value={form.symbol}
              onChange={handleChange}
              required
            />

            <input
              name="companyName"
              placeholder="Company name"
              value={form.companyName}
              onChange={handleChange}
              required
            />

            <input
              name="currentPrice"
              type="number"
              placeholder="Current price"
              value={form.currentPrice}
              onChange={handleChange}
              required
            />

            <button type="submit">Add Stock</button>
          </form>
        </section>

        <section className="admin-stock-table-card">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Company</th>
                <th>Current Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id}>
                  {editingStockId === stock.id ? (
                    <>
                      <td>
                        <input
                          name="symbol"
                          value={editForm.symbol}
                          onChange={handleEditChange}
                          className="table-input"
                        />
                      </td>

                      <td>
                        <input
                          name="companyName"
                          value={editForm.companyName}
                          onChange={handleEditChange}
                          className="table-input"
                        />
                      </td>

                      <td>
                        <input
                          name="currentPrice"
                          type="number"
                          value={editForm.currentPrice}
                          onChange={handleEditChange}
                          className="table-input"
                        />
                      </td>

                      <td>
                        <div className="stock-action-row">
                          <button
                            className="save-btn"
                            onClick={() => updateStock(stock.id)}
                          >
                            Save
                          </button>

                          <button className="cancel-btn" onClick={cancelEdit}>
                            Cancel
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <strong>{stock.symbol}</strong>
                      </td>

                      <td>{stock.companyName}</td>

                      <td>{money(stock.currentPrice)}</td>

                      <td>
                        <div className="stock-action-row">
                          <button
                            className="edit-btn"
                            onClick={() => startEdit(stock)}
                          >
                            Edit
                          </button>

                          <button
                            className="random-btn-small"
                            onClick={() => randomPrice(stock.id)}
                          >
                            Random
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() => deleteStock(stock.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {stocks.length === 0 && (
            <div className="empty-state">No stocks available.</div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminStocks;