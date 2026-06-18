import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setMessage("");
    setMessageType("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      setMessage("Password must be at least 6 characters");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/register", form);

      setMessage("Registration successful. Redirecting to login...");
      setMessageType("success");

      setForm({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data || "Registration failed");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <section className="auth-left">
        <div className="brand-row">
          <div className="brand-mark">T</div>
          <span>TradeArena</span>
        </div>

        <div className="hero-content">
          <p className="hero-badge">Virtual Stock Trading Platform</p>

          <h1>
            Build your portfolio.
            <br />
            Compete like a trader.
          </h1>

          <p className="hero-text">
            Create an account, join active seasons, trade with virtual cash,
            and climb the leaderboard through portfolio growth.
          </p>

          <div className="market-card">
            <div>
              <span>Portfolio Balance</span>
              <h3>₹10,00,000</h3>
            </div>
            <p>Starting virtual wallet</p>
          </div>

          <div className="feature-list">
            <div>
              <span>₹</span>
              Virtual wallet with ₹10,00,000 starting balance
            </div>
            <div>
              <span>↗</span>
              Buy and sell stocks in active seasons
            </div>
            <div>
              <span>🏆</span>
              Leaderboard based on total portfolio value
            </div>
          </div>
        </div>
      </section>

      <section className="auth-right">
        <div className="auth-card">
          <p className="eyebrow">Create Account</p>
          <h2>Register now</h2>
          <p className="muted">Set up your TradeArena profile.</p>

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label>Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {message && (
            <p className={`form-message ${messageType}`}>{message}</p>
          )}

          <p className="switch-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Register;