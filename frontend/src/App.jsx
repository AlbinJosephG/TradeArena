import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Stocks from "./pages/Stocks";
import Portfolio from "./pages/Portfolio";
import Transactions from "./pages/Transactions";
import Leaderboard from "./pages/Leaderboard";
import Seasons from "./pages/Seasons";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSeasons from "./pages/AdminSeasons";
import AdminStocks from "./pages/AdminStocks";
import StockHistory from "./pages/StockHistory";
import "./App.css";

function ProtectedAdmin({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "ADMIN") {
    return <Navigate to="/login" />;
  }

  return children;
}

function ProtectedUser({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role === "ADMIN") {
    return <Navigate to="/admin" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedUser>
              <UserDashboard />
            </ProtectedUser>
          }
        />

        <Route
          path="/stocks"
          element={
            <ProtectedUser>
              <Stocks />
            </ProtectedUser>
          }
        />

        <Route
          path="/portfolio"
          element={
            <ProtectedUser>
              <Portfolio />
            </ProtectedUser>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedUser>
              <Transactions />
            </ProtectedUser>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedUser>
              <Leaderboard />
            </ProtectedUser>
          }
        />

        <Route
          path="/seasons"
          element={
            <ProtectedUser>
              <Seasons />
            </ProtectedUser>
          }
        />

        <Route
          path="/stocks/:stockId/history"
          element={
            <ProtectedUser>
              <StockHistory />
            </ProtectedUser>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminDashboard />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/seasons"
          element={
            <ProtectedAdmin>
              <AdminSeasons />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/stocks"
          element={
            <ProtectedAdmin>
              <AdminStocks />
            </ProtectedAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;