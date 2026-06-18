import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setMessage("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("role", res.data.role);

      const seasonsRes = await API.get("/seasons");

const activeSeason = seasonsRes.data.find(
  (season) => season.status === "ACTIVE"
);

if (activeSeason) {
  localStorage.setItem("seasonId", activeSeason.id);
}

      setMessage("Login successful");

      setTimeout(() => {
        if (res.data.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 800);
    } catch (err) {
      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-left">
        <div className="brand-row">
          <div className="brand-mark">T</div>
          <span>TradeArena</span>
        </div>

        <h1>Trade smarter in a virtual market arena.</h1>
        <p>
          Practice buying, selling, tracking portfolio performance and climbing
          the leaderboard with real trading-style workflows.
        </p>

        <div className="market-preview">
          <div>
            <span>TCS</span>
            <strong>₹5,200.00</strong>
            <small className="positive">+4.59%</small>
          </div>

          <div>
            <span>INFY</span>
            <strong>₹1,820.00</strong>
            <small className="negative">-1.12%</small>
          </div>

          <div>
            <span>RELIANCE</span>
            <strong>₹2,920.00</strong>
            <small className="positive">+2.11%</small>
          </div>
        </div>
      </div>

      <div className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h2>Login to your account</h2>
        <p className="muted">Enter your credentials to continue trading.</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="albin@test.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        {message && <p className="form-message">{message}</p>}

        <p className="switch-text">
          New to TradeArena? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;