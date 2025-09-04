const AppLabel = ({ htmlFor, label, isRequired = false, error }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-gray-900 font-medium text-sm tracking-[-0.24px] ${error && "text-red-600"}`}
    >
      {label}
      {isRequired && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default AppLabel;
