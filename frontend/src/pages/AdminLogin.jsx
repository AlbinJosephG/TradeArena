import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function AdminLogin() {
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
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (form.email === "admin@test.com" && form.password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("role", "ADMIN");
      navigate("/admin");
    } else {
      setMessage("Invalid admin credentials");
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-left">
        <div className="brand-row">
          <div className="brand-mark">A</div>
          <span>TradeArena Admin</span>
        </div>

        <h1>Admin control center for TradeArena.</h1>
        <p>Manage market movement, users, trades and competition analytics.</p>
      </div>

      <div className="auth-card">
        <p className="eyebrow">Admin Access</p>
        <h2>Admin Login</h2>
        <p className="muted">Only administrators can access this page.</p>

        <form onSubmit={handleAdminLogin}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="admin@test.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="admin123"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login as Admin</button>
        </form>

        {message && <p className="form-message error">{message}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;