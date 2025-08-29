import { useState } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { AppInput } from "../components";
import { emailPattern } from "../constants/patterns";

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (submitData) => {
    setIsLoading(true);
    try {
      const success = await login(submitData.mail, submitData.password);
      if (!success) {
        setError("Email veya şifre hatalı");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="min-h-screen flex items-center justify-center  w-1/2 max-w-md mx-auto flex-col">
        <h1 className="text-4xl font-bold text-center">Yıldız Düzenli Admin</h1>
        <span className="text-2xl font-bold text-center mt-4">Giriş Yap</span>
        <form className="w-full mt-8" onSubmit={handleSubmit(onSubmit)}>
          <AppInput
            label="E-mail"
            name="mail"
            error={errors.mail}
            rules={{ required: true, pattern: emailPattern }}
            register={register}
            placeholder="E-mail"
          />
          <AppInput
            label="Password"
            name="password"
            error={errors.password}
            rules={{ required: true }}
            type="password"
            register={register}
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-full cursor-pointer bg-indigo-500 text-indigo-50 font-medium rounded-lg px-4 py-2.5 disabled:opacity-50"
            disabled={isLoading}
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
