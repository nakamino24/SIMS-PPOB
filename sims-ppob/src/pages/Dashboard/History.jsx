import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance } from "../../store/userSlice";
import { topUpBalanceAPI } from "../../services/transactionService";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";

const TopUp = () => {
  const dispatch = useDispatch();
  const { saldo } = useSelector((state) => state.user);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  const handleTopUp = async (e) => {
    e.preventDefault();

    const amountInt = parseInt(amount, 10);
    if (isNaN(amountInt) || amountInt < 10000 || amountInt > 1000000) {
      return toast.error("Masukkan jumlah antara Rp 10.000 - Rp 1.000.000.");
    }

    setLoading(true);
    try {
      await topUpBalanceAPI(amountInt);
      dispatch(fetchBalance());
      toast.success("Top-up berhasil!");
      setAmount("");
    } catch (error) {
      console.log(error);
      toast.error("Gagal melakukan top-up, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full min-h-screen flex flex-col items-center p-6">
        <h1 className="text-2xl font-semibold mb-6">Top Up Saldo</h1>

        {/* Info Saldo */}
        <div className="bg-gray-100 p-4 rounded-lg w-full max-w-md text-center mb-6">
          <p className="text-sm text-gray-500">Saldo Anda:</p>
          <p className="text-xl font-bold text-red-500">
            Rp {saldo.toLocaleString()}
          </p>
        </div>

        {/* Form Top Up */}
        <form className="w-full max-w-md space-y-4" onSubmit={handleTopUp}>
          <div>
            <label className="block text-sm font-medium">Jumlah Top-Up</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Masukkan jumlah (min: 10.000)"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded ${
              amount >= 10000 && amount <= 1000000
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? "Memproses..." : "Top Up Sekarang"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default TopUp;
