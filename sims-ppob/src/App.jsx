import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Dashboard/Home";
import Profile from "./pages/Dashboard/Profile";
import TopUp from "./pages/Dashboard/TopUp";
import Transaction from "./pages/Dashboard/Transaction";
import History from "./pages/Dashboard/History";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/topup" element={<TopUp />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
