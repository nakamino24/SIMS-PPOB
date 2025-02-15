import { useState } from "react";
import { toast } from "react-toastify";
import LoginIllustration from "../../assets/Illustrasi Login.png";
import InputField from "../../components/InputField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Email tidak valid");
      return false;
    }
    if (form.password.length < 8) {
      toast.error("Password harus minimal 8 karakter");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Password dan konfirmasi password tidak sama");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await dispatch(registerUser(form)).unwrap();
      if (result) {
        toast.success("Registrasi berhasil! Silakan login.");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message || "Gagal melakukan registrasi.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Bagian Kiri - Form */}
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
            Lengkapi data untuk membuat akun
          </h2>

          <form onSubmit={handleSubmit}>
            <InputField
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="Masukkan email Anda"
            />
            <InputField
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleInputChange}
              placeholder="Nama depan"
            />
            <InputField
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleInputChange}
              placeholder="Nama belakang"
            />
            <InputField
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              placeholder="Buat password"
            />
            <InputField
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleInputChange}
              placeholder="Konfirmasi password"
            />
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Registrasi
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-500">
            Sudah punya akun?{" "}
            <a href="/login" className="text-red-500 hover:underline">
              Login di sini
            </a>
          </p>
        </div>
      </div>

      {/* Bagian Kanan - Ilustrasi */}
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

export default Register;
