import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProfile, fetchBalance } from "../../store/userSlice";
import { fetchServices } from "../../store/transactionSlice";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Import gambar layanan & banner
import BackgroundSaldo from "../../assets/Background Saldo.png";
import Banner1 from "../../assets/Banner 1.png";
import Banner2 from "../../assets/Banner 2.png";
import Banner3 from "../../assets/Banner 3.png";
import Banner4 from "../../assets/Banner 4.png";
import Banner5 from "../../assets/Banner 5.png";

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

// Data service
const services = [
  { id: 1, name: "PBB", image: PBB },
  { id: 2, name: "Listrik", image: Listrik },
  { id: 3, name: "Pulsa", image: Pulsa },
  { id: 4, name: "PDAM", image: PDAM },
  { id: 5, name: "PGN", image: PGN },
  { id: 6, name: "TV Langganan", image: Televisi },
  { id: 7, name: "Musik", image: Musik },
  { id: 8, name: "Voucher Game", image: Game },
  { id: 9, name: "Voucher Makanan", image: VoucherMakanan },
  { id: 10, name: "Paket Data", image: PaketData },
];

// Data banner promo
const promoBanners = [Banner1, Banner2, Banner3, Banner4, Banner5];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: profileData, isLoading: profileLoading } = fetchProfile();
  const { data: balanceData, isLoading: balanceLoading } = fetchBalance();
  const [showSaldo, setShowSaldo] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
    dispatch(fetchServices());
  }, [dispatch]);

  const handleServiceClick = (serviceId) => {
    navigate(`/transaction?serviceId=${serviceId}`);
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center p-6">
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

        {/* Service Icons */}
        <div className="flex overflow-x-auto justify-center space-x-6 w-full py-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center text-center cursor-pointer"
              onClick={() => handleServiceClick(service.id)}
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-16 h-16 object-contain"
              />
              <p className="text-xs mt-2 text-black">{service.name}</p>
            </div>
          ))}
        </div>

        {/* Banner Promosi */}
        <h2 className="text-lg text-black font-semibold mb-4">
          Temukan promo menarik
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl">
          {promoBanners.map((banner, index) => (
            <img
              key={index}
              src={banner}
              alt={`Promo ${index + 1}`}
              className="rounded-lg"
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
