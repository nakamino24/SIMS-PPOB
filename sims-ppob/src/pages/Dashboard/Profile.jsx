import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  updateProfile,
  uploadProfilePicture,
} from "../../store/userSlice";
import {
  PencilIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import InputField from "../../components/InputField";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateProfile(form)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") setIsEditing(false);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 100 * 1024) {
      setSelectedImage(file);
    } else {
      alert("File harus berformat JPG/PNG dan maksimal 100 KB");
    }
  };

  const handleUploadImage = () => {
    if (selectedImage) {
      dispatch(uploadProfilePicture(selectedImage));
    }
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center p-6">
      {/* Logo dan Navigasi */}
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

      {/* Foto Profil */}
      <div className="relative mb-6">
        <img
          src={profile?.image_url || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto"
        />
        <div className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
          <label htmlFor="profileImage" className="cursor-pointer">
            <PencilIcon className="h-6 w-6 text-red-500" />
          </label>
          <input
            id="profileImage"
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">
        {profile?.firstName} {profile?.lastName}
      </h2>

      {/* Form Profil */}
      <form className="space-y-4">
        <InputField
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
        />
        <InputField
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="Nama Depan"
          icon={<UserIcon className="h-5 w-5 text-gray-400" />}
        />
        <InputField
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Nama Belakang"
          icon={<UserIcon className="h-5 w-5 text-gray-400" />}
        />

        {/* Tombol */}
        {isEditing ? (
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleSave}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
            >
              Batal
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Edit Profil
          </button>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full mt-4 bg-white border border-red-500 text-red-500 py-2 rounded hover:bg-red-50"
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default Profile;
