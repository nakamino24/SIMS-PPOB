import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Dashboard/Home";
import Profile from "./pages/Dashboard/Profile";
import TopUp from "./pages/Dashboard/TopUp";
import Transaction from "./pages/Dashboard/Transaction";
import History from "./pages/Dashboard/History";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/profile" element={<Navigate to="/profile" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/topup" element={<Navigate to="/topup" />} />
        <Route path="/topup" element={<TopUp />} />
        <Route path="/transaction" element={<Navigate to="/transaction" />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/history" element={<Navigate to="/history" />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
