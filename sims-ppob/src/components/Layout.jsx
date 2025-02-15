import PropTypes from "prop-types";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar />
      {/* Konten Halaman */}
      <main className="flex-1 container mx-auto p-6">{children}</main>
    </div>
  );
};

// ✅ Tambahkan validasi prop children
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
