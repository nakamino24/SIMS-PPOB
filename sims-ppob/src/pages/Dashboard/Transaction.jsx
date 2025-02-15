import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchServices, createTransaction } from "../../store/transactionSlice";
import { fetchBalance, fetchProfile } from "../../store/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import PBB from "../../assets/PBB.png";
import Listrik from "../../assets/Listrik.png";
import Pulsa from "../../assets/Pulsa.png";
import PDAM from "../../assets/PDAM.png";
import PGN from "../../assets/PGN.png";
import Televisi from "../../assets/Televisi.png";
import Musik from "../../assets/Musik.png";
import Game from "../../assets/Game.png";
import VoucherMakanan from "../../assets/Voucher Makanan.png";
import PaketData from "../../assets/Paket Data.png";

import BackgroundSaldo from "../../assets/Background Saldo.png";

const services = {
  1: { name: "PBB", price: 50000, image: PBB },
  2: { name: "Listrik", price: 100000, image: Listrik },
  3: { name: "Pulsa", price: 25000, image: Pulsa },
  4: { name: "PDAM", price: 75000, image: PDAM },
  5: { name: "PGN", price: 60000, image: PGN },
  6: { name: "TV Langganan", price: 120000, image: Televisi },
  7: { name: "Musik", price: 30000, image: Musik },
  8: { name: "Voucher Game", price: 45000, image: Game },
  9: { name: "Voucher Makanan", price: 35000, image: VoucherMakanan },
  10: { name: "Paket Data", price: 55000, image: PaketData },
};

const Transaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { saldo } = useSelector((state) => state.transaction);
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const { data: profileData, isLoading: profileLoading } = fetchProfile();
  const { data: balanceData, isLoading: balanceLoading } = fetchBalance();
  const [loading, setLoading] = useState(false);
  const [showSaldo, setShowSaldo] = useState(false);

  const selectedService = services[serviceId];

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleTransaction = () => {
    if (!selectedService) return toast.error("Layanan tidak ditemukan.");
    if (saldo < selectedService.price)
      return toast.error("Saldo tidak mencukupi.");

    setLoading(true);
    dispatch(createTransaction({ serviceId }))
      .unwrap()
      .then(() => {
        toast.success("Transaksi berhasil!");
        navigate("/history");
      })
      .catch(() => toast.error("Transaksi gagal, coba lagi."))
      .finally(() => setLoading(false));
  };

  if (!selectedService) {
    return (
      <p className="text-center text-lg mt-10">Layanan tidak ditemukan.</p>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center p-6">
      <div className="w-full flex justify-between items-center max-w-5xl mb-6">
        {/* Logo dan Judul */}
        <div className="flex items-center space-x-4">
          <a href="/dashboard" className="flex items-center">
            <img
              src="/Logo.png"
              alt="Logo SIMS PPOB"
              className="w-10 h-10 object-contain"
            />
          </a>
          <h1 className="text-lg text-black font-bold">SIMS PPOB</h1>
        </div>

        {/* Link Navigasi */}
        <div className="space-x-4 text-sm">
          <a href="/topup" className="text-gray-600 hover:text-black">
            Top Up
          </a>
          <a href="/transaction" className="text-gray-600 hover:text-black">
            Transaction
          </a>
          <a href="/profile" className="text-gray-600 hover:text-black">
            Akun
          </a>
        </div>
      </div>

      <div className="w-full max-w-5xl flex justify-between items-center mb-6">
        <div className="flex items-center text-black">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="w-12 h-12 rounded-full mr-4"
          />
          <h2 className="text-lg text-blackfont-semibold">
            {profileLoading
              ? "Loading..."
              : `Selamat datang, ${profileData?.first_name || "User"}`}
          </h2>
        </div>

        {/* Saldo */}
        <div
          className="relative w-80 h-28 bg-cover bg-center p-6 rounded-lg shadow-lg flex flex-col justify-between"
          style={{ backgroundImage: `url(${BackgroundSaldo})` }}
        >
          <p className="text-white text-sm font-medium">Saldo Anda</p>
          <p className="text-white text-3xl font-bold">
            <p className="text-white text-3xl font-bold">
              {balanceLoading
                ? "••••••••"
                : showSaldo
                ? `Rp ${(balanceData?.balance || 0).toLocaleString()}`
                : "••••••••"}
            </p>
          </p>
          <button
            onClick={() => setShowSaldo(!showSaldo)}
            className="flex items-center text-white text-sm font-medium bg-transparent"
          >
            {showSaldo ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            <span className="ml-2">
              {showSaldo ? "Sembunyikan Saldo" : "Lihat Saldo"}
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <img
          src={selectedService.image}
          alt={selectedService.name}
          className="w-24 h-24 mb-4"
        />
        <h2 className="text-xl font-semibold">{selectedService.name}</h2>
        <p className="text-lg font-bold text-red-500">
          Rp{" "}
          {selectedService?.price
            ? selectedService.price.toLocaleString()
            : "0"}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Saldo Anda: Rp {(saldo || 0).toLocaleString()}
        </p>
      </div>

      {/* Tombol Bayar */}
      <button
        onClick={handleTransaction}
        disabled={loading}
        className={`mt-6 w-full max-w-md py-2 px-4 rounded ${
          saldo >= selectedService.price
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {loading ? "Memproses..." : "Bayar Sekarang"}
      </button>
    </div>
  );
};

export default Transaction;
