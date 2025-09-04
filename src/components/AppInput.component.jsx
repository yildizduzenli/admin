import { AppFormErrorMessage, AppLabel } from ".";
import { Calendar } from "lucide-react";

const AppInput = ({
  label,
  name,
  placeholder,
  register,
  error,
  rules,
  type = "text",
  ...props
}) => {
  return (
    <div className="w-full mb-4 relative flex flex-col gap-2">
      <AppLabel
        htmlFor={name}
        label={label}
        error={error}
        isRequired={rules?.required}
      />
      <input
        type={type}
        id={name}
        className={`w-full bg-white rounded-lg border border-gray-200 focus:border-indigo-500 outline-none focus:ring-2 focus:!ring-indigo-300 px-4 py-2 ${
          error && "border-red-500 focus:border-red-500 focus:!ring-red-500"
        }`}
        placeholder={placeholder}
        {...register(name, rules)}
        {...props}
      />
      {type === "date" && (
        <Calendar className="absolute right-3 top-8" width={16} height={16} />
      )}
      <AppFormErrorMessage label={label} error={error} />
    </div>
  );
};

export default AppInput;
