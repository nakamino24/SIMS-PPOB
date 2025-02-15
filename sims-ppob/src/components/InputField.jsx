// src/components/InputField.jsx
import PropTypes from "prop-types";

const InputField = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  icon,
  error,
}) => (
  <div className="relative">
    {icon && (
      <span className="absolute left-3 top-2/4 transform -translate-y-2/4">
        {icon}
      </span>
    )}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 ${
        error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.element,
  error: PropTypes.string,
};

export default InputField;
