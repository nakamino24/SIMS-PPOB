import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, amount, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex flex-col items-center">
          <div className="text-green-500 text-5xl">✅</div>
          <h2 className="text-xl font-semibold mt-4">{message}</h2>
          <p className="text-lg font-bold mt-2 text-gray-800">
            Rp{amount.toLocaleString()}
          </p>
          <button
            onClick={onClose}
            className="mt-4 text-red-500 font-semibold hover:underline"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
};

// 🔹 Tambahkan validasi PropTypes
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};

export default Modal;
