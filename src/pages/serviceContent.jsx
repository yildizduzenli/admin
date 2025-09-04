import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/Dashboard.layout";
import {
  AppBreadCrumb,
  AppEditor,
  AppInput,
  AppScreenLoading,
  AppTextarea,
} from "../components";
import { useForm } from "react-hook-form";
import { getRedis, setRedis } from "../service/redis";

export default function ServiceContent() {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const getServiceContent = async () => {
    setInitialLoading(true);
    const response = await getRedis("serviceContent");
    reset(response);
    setInitialLoading(false);
  };

  useEffect(() => {
    getServiceContent();
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsSubmitLoading(true);
      const response = await setRedis("serviceContent", data);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
      {initialLoading ? (
        <AppScreenLoading />
      ) : (
        <div>
          <AppBreadCrumb />

          <form
            className="w-full bg-white p-5 rounded-lg border border-gray-200 mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <AppInput
              label="Hizmetler Sayfa Başlığı"
              name="servicesTitle"
              error={errors.servicesTitle}
              rules={{ required: true }}
              register={register}
              placeholder="Hizmetler Sayfa Başlığı"
            />
            <AppTextarea
              label="Hizmetler Sayfa Alt Başlığı"
              name="servicesSubtitle"
              error={errors.servicesSubtitle}
              rules={{ required: true }}
              register={register}
              placeholder="Hizmetler Sayfa Alt Başlığı"
            />

            <button
              type="submit"
              className={`w-full ${
                isSubmitLoading ? "cursor-wait" : "cursor-pointer"
              } flex items-center justify-center bg-indigo-500 text-indigo-50 hover:bg-indigo-600 transition-all duration-300 font-medium rounded-lg px-4 py-2.5 disabled:opacity-50`}
              disabled={isSubmitLoading}
            >
              Kaydet
              {isSubmitLoading && (
                <span className="w-4 h-4 ml-2 animate-spin inline-block border-2 border-current border-t-transparent text-white rounded-full" />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
