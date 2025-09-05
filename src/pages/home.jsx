import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/Dashboard.layout";
import {
  AppBreadCrumb,
  AppInput,
  AppScreenLoading,
  AppTextarea,
} from "../components";
import { useForm } from "react-hook-form";
import { getRedis, setRedis } from "../service/redis";

export default function Home() {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    getHomeData();
  }, []);

  const getHomeData = async () => {
    setInitialLoading(true);
    const response = await getRedis("homeData");
    reset(response);
    setInitialLoading(false);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitLoading(true);
      const response = await setRedis("homeData", data);
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
              label="Hero Başlık"
              name="heroTitle"
              error={errors.heroTitle}
              rules={{ required: true }}
              register={register}
              placeholder="Hero Başlık"
            />
            <AppTextarea
              label="Hero Alt Başlık"
              name="heroSubtitle"
              error={errors.heroSubtitle}
              rules={{ required: true }}
              register={register}
              placeholder="Hero Alt Başlık"
            />
            <AppInput
              label="Video URL (Youtube)"
              name="heroVideo"
              error={errors.heroVideo}
              rules={{ required: true }}
              register={register}
              placeholder="Video URL (Youtube)"
            />
            <AppTextarea
              label="Alıntı"
              name="quote"
              error={errors.quote}
              rules={{ required: true }}
              register={register}
              placeholder="Alıntı"
            />
            <AppInput
              label="Hakkımızda Başlık"
              name="aboutTitle"
              error={errors.aboutTitle}
              rules={{ required: true }}
              register={register}
              placeholder="Hakkımızda Başlık"
            />
            <AppTextarea
              label="Hakkımızda Alt Başlık"
              name="aboutSubtitle"
              error={errors.aboutSubtitle}
              rules={{ required: true }}
              register={register}
              placeholder="Hakkımızda Alt Başlık"
            />
            <AppInput
              label="İnstafeed Başlık"
              name="instafeedTitle"
              error={errors.instafeedTitle}
              rules={{ required: true }}
              register={register}
              placeholder="İnstafeed Başlık"
            />
            <AppTextarea
              label="İnstafeed Alt Başlık"
              name="instafeedSubtitle"
              error={errors.instafeedSubtitle}
              rules={{ required: true }}
              register={register}
              placeholder="İnstafeed Alt Başlık"
            />
            <AppInput
              label="İnsta 1. Post Id"
              name="instafeedIdOne"
              error={errors.instafeedIdOne}
              rules={{ required: true }}
              register={register}
              placeholder="İnsta 1. Post Id"
            />
            <AppInput
              label="İnsta 2. Post Id"
              name="instafeedIdTwo"
              error={errors.instafeedIdTwo}
              rules={{ required: true }}
              register={register}
              placeholder="İnsta 2. Post Id"
            />{" "}
            <AppInput
              label="İnsta 3. Post Id"
              name="instafeedIdThree"
              error={errors.instafeedIdThree}
              rules={{ required: true }}
              register={register}
              placeholder="İnsta 3. Post Id"
            />
            <AppInput
              label="Hizmetler Başlık"
              name="servicesTitle"
              error={errors.servicesTitle}
              rules={{ required: true }}
              register={register}
              placeholder="Hizmetler Başlık"
            />
            <AppTextarea
              label="Hizmetler Alt Başlık"
              name="servicesSubtitle"
              error={errors.servicesSubtitle}
              rules={{ required: true }}
              register={register}
              placeholder="Hizmetler Alt Başlık"
            />
            <AppInput
              label="CTA Başlık"
              name="ctaTitle"
              error={errors.ctaTitle}
              rules={{ required: true }}
              register={register}
              placeholder="CTA Başlık"
            />
            <AppTextarea
              label="CTA Alt Başlık"
              name="ctaSubtitle"
              error={errors.ctaSubtitle}
              rules={{ required: true }}
              register={register}
              placeholder="CTA Alt Başlık"
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
