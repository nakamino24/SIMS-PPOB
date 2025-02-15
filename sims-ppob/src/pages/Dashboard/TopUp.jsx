import { useState } from "react";
import { useDispatch } from "react-redux";
import { topUpBalance } from "../../store/transactionSlice";
import InputField from "../../components/InputField";
import BackgroundSaldo from "../../assets/Background Saldo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { fetchBalance, fetchProfile } from "../../store/userSlice";

const TopUp = () => {
  const dispatch = useDispatch();
  const { data: balanceData, isLoading: balanceLoading } = fetchBalance();
  const { data: profileData, isLoading: profileLoading } = fetchProfile();
  const [amount, setAmount] = useState("");
  const [showSaldo, setShowSaldo] = useState(true);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTopUp = () => {
    const numericAmount = parseInt(amount, 10);
    if (numericAmount < 10000 || numericAmount > 1000000) {
      alert("Nominal harus antara 10.000 - 1.000.000");
      return;
    }
    dispatch(topUpBalance(numericAmount))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          alert("Top Up berhasil!");
          setAmount("");
        } else {
          alert("Top Up gagal, silakan coba lagi.");
        }
      })
      .catch(() => {
        alert("Terjadi kesalahan, silakan coba lagi.");
      });
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center p-6">
      {/* Navbar */}
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
        {/* Profil */}
        <div className="flex items-center">
          <img
            src={
              profileData?.profilePicture || "https://via.placeholder.com/50"
            }
            alt="Profile"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold text-black">
              {profileLoading || !profileData
                ? "Loading..."
                : `Selamat datang, ${profileData.first_name || "User"}`}
            </h2>
          </div>
        </div>

        {/* Kartu Saldo */}
        <div
          className="relative w-80 h-28 bg-cover bg-center p-6 rounded-lg shadow-lg flex flex-col justify-between"
          style={{ backgroundImage: `url(${BackgroundSaldo})` }}
        >
          <p className="text-white text-sm font-medium">Saldo Anda</p>
          <p className="text-white text-3xl font-bold">
            {balanceLoading || !balanceData
              ? "••••••••"
              : showSaldo
              ? `Rp ${balanceData.balance.toLocaleString()}`
              : "••••••••"}
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

      {/* Input Top Up */}
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
        <p className="text-lg font-semibold mb-4">Silahkan masukkan</p>
        <h3 className="text-xl font-bold mb-4">Nominal Top Up</h3>
        <InputField
          type="number"
          name="Nominal"
          value={amount}
          onChange={handleChange}
          placeholder="Masukkan nominal topup"
        />

        {/* Tombol Nominal Cepat */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[10000, 20000, 50000, 100000, 250000, 500000].map((nominal) => (
            <button
              key={nominal}
              onClick={() => setAmount(nominal)}
              className="bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200"
            >
              Rp{nominal.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Tombol Top Up */}
        <button
          onClick={handleTopUp}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
        >
          Top Up
        </button>
      </div>
    </div>
  );
};

export default TopUp;
