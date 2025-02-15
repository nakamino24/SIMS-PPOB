import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png"; // Logo aplikasi

const Navbar = () => {
  return (
    <nav className="bg-white text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/dashboard" className="text-lg font-bold flex items-center">
          <img src={Logo} alt="Logo" className="h-8 mr-2" />
          SIMS PPOB
        </Link>

        {/* Navigasi */}
        <div className="space-x-6 text-sm">
          <Link to="/topup" className="hover:underline">
            Top Up
          </Link>
          <Link to="/transaction" className="hover:underline">
            Transaksi
          </Link>
          <Link to="/profile" className="hover:underline">
            Akun
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
