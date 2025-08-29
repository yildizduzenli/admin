import { useState } from "react";
import DashboardLayout from "../layouts/Dashboard.layout";
import { AppBreadCrumb, AppInput } from "../components";
import { useForm } from "react-hook-form";

export default function Home() {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <DashboardLayout>
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
          <AppInput
            label="Hero Alt Başlık"
            name="heroSubtitle"
            error={errors.heroSubtitle}
            rules={{ required: true }}
            register={register}
            placeholder="Hero Alt Başlık"
          />
          <AppInput
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
          <AppInput
            label="Hakkımızda Alt Başlık"
            name="aboutSubtitle"
            error={errors.aboutSubtitle}
            rules={{ required: true }}
            register={register}
            placeholder="Hakkımızda Alt Başlık"
          />
          <AppInput
            label="Hizmetler Başlık"
            name="servicesTitle"
            error={errors.servicesTitle}
            rules={{ required: true }}
            register={register}
            placeholder="Hizmetler Başlık"
          />
          <AppInput
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
          <AppInput
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
            Save
            {isSubmitLoading && (
              <span className="w-4 h-4 ml-2 animate-spin inline-block border-2 border-current border-t-transparent text-white rounded-full" />
            )}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
