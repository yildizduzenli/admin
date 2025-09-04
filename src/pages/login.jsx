import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { AppInput, AppScreenLoading } from "../components";
import { emailPattern } from "../constants/patterns";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (submitData) => {
    setIsLoading(true);
    try {
      const envMail = "yildizduzenli.dev@gmail.com";
      const envPassword = "YildizDuzenli0912-_";

      if (submitData.mail === envMail && submitData.password === envPassword) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            mail: submitData.mail,
            name: "Yıldız Düzenli",
          })
        );
        setUser({
          mail: submitData.mail,
          name: "Yıldız Düzenli",
        });
      } else {
        setError("mail", { type: "wrongLogin" });
      }
    } catch (error) {
      console.log(error);
      setError("mail", { type: "wrongLogin" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="min-h-screen flex items-center justify-center  w-1/2 max-w-md mx-auto flex-col">
        <h1 className="text-4xl font-bold text-center">Yıldız Düzenli Admin</h1>
        <span className="text-2xl font-bold text-center mt-4">Giriş Yap</span>
        <form className="w-full mt-8" onSubmit={handleSubmit(onSubmit)}>
          <AppInput
            label="E-mail"
            name="mail"
            error={errors?.mail}
            rules={{ required: true, pattern: emailPattern }}
            register={register}
            placeholder="E-mail"
          />
          <AppInput
            label="Password"
            name="password"
            error={errors?.password}
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
