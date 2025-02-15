import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { useState } from "react";
import { FiAtSign, FiLock } from "react-icons/fi";
import LoginIllustration from "../../assets/Illustrasi Login.png";
import InputField from "../../components/InputField";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      toast.error("Email tidak valid");
      return false;
    }
    if (credentials.password.length < 8) {
      toast.error("Password harus minimal 8 karakter");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      toast.success("Login berhasil!");
      localStorage.setItem("token", result.token);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Login gagal, coba lagi.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/Logo.png" alt="Logo SIMS PPOB" className="h-12" />
            <p className="flex justify-center text-2xl font-bold mt-2 ml-2 text-black">
              SIMS PPOB
            </p>
          </div>

          <h2 className="text-xl font-medium mb-4 text-black text-center">
            Masuk atau buat akun untuk memulai
          </h2>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Input Email */}
            <InputField
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="Masukkan email anda"
              icon={<FiAtSign />}
            />
            <InputField
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Masukkan password anda"
              icon={<FiLock />}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              {loading ? "Loading..." : "Masuk"}
            </button>
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">
                {error.message || "Password yang anda masukkan salah"}
              </p>
            )}
          </form>

          <p className="text-center text-sm mt-4 text-gray-500">
            Belum punya akun?{" "}
            <a
              href="/register"
              className="text-red-500 hover:underline font-semibold"
            >
              Registrasi di sini
            </a>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center bg-pink-50">
        <img
          src={LoginIllustration}
          alt="Login Illustration"
          className="w-3/4 max-w-md"
        />
      </div>
    </div>
  );
};

export default Login;
