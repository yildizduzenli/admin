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

export default function Contact() {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const getContact = async () => {
    setInitialLoading(true);
    const response = await getRedis("contact");
    reset(response);
    setInitialLoading(false);
  };

  useEffect(() => {
    getContact();
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsSubmitLoading(true);
      const response = await setRedis("contact", data);
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
              label="İletişim Sayfa Başlığı"
              name="contactTitle"
              error={errors.contactTitle}
              rules={{ required: true }}
              register={register}
              placeholder="İletişim Sayfa Başlığı"
            />
            <AppTextarea
              label="İletişim Sayfa Alt Başlığı"
              name="contactSubtitle"
              error={errors.contactSubtitle}
              rules={{ required: true }}
              register={register}
              placeholder="İletişim Sayfa Alt Başlığı"
            />
            <AppInput
              label="İletişim Bilgileri Başlığı"
              name="contactInfoTitle"
              error={errors.contactInfoTitle}
              rules={{ required: true }}
              register={register}
              placeholder="İletişim Bilgileri Başlığı"
            />
            <AppTextarea
              label="İletişim Bilgileri Alt Başlığı"
              name="contactInfoSubtitle"
              error={errors.contactInfoSubtitle}
              rules={{ required: true }}
              register={register}
              placeholder="İletişim Bilgileri Alt Başlığı"
            />
            <AppInput
              label="Mesaj Gönderildi Başlığı "
              name="messageSentTitle"
              error={errors.messageSentTitle}
              rules={{ required: true }}
              register={register}
              placeholder="Mesaj Gönderildi Başlığı "
            />
            <AppTextarea
              label="Mesaj Gönderildi Alt Başlık"
              name="messageSentSubtitle"
              error={errors.messageSentSubtitle}
              rules={{ required: true }}
              register={register}
              placeholder="Mesaj Gönderildi Alt Başlık"
            />
            <AppInput
              label="Adres Başlık"
              name="addressTitle"
              error={errors.addressTitle}
              rules={{ required: true }}
              register={register}
              placeholder="Adres Başlık"
            />
            <AppTextarea
              label="Adres Alt Başlık"
              name="addressSubtitle"
              error={errors.addressSubtitle}
              rules={{ required: true }}
              register={register}
              placeholder="Adres Alt Başlık"
            />
            <AppInput
              label="E-posta Başlık"
              name="emailTitle"
              error={errors.emailTitle}
              rules={{ required: true }}
              register={register}
              placeholder="E-posta Başlık"
            />
            <AppTextarea
              label="E-posta Alt Başlık"
              name="emailSubtitle"
              error={errors.emailSubtitle}
              rules={{ required: true }}
              register={register}
              placeholder="E-posta Alt Başlık"
            />
            <AppInput
              label="Telefon Başlık"
              name="phoneTitle"
              error={errors.phoneTitle}
              rules={{ required: true }}
              register={register}
              placeholder="Telefon Başlık"
            />
            <AppTextarea
              label="Telefon Alt Başlık"
              name="phoneSubtitle"
              error={errors.phoneSubtitle}
              rules={{ required: true }}
              register={register}
              placeholder="Telefon Alt Başlık"
            />
            <AppInput
              label="Adres"
              name="address"
              error={errors.address}
              rules={{ required: true }}
              register={register}
              placeholder="Adres"
            />
            <AppInput
              label="E-posta"
              name="email"
              error={errors.email}
              rules={{ required: true }}
              register={register}
              placeholder="E-posta"
            />
            <AppInput
              label="Telefon"
              name="phone"
              error={errors.phone}
              rules={{ required: true }}
              register={register}
              placeholder="Telefon"
            />
            <AppInput
              label="Instagram"
              name="instagram"
              error={errors.instagram}
              rules={{ required: true }}
              register={register}
              placeholder="Instagram"
            />
            <AppInput
              label="Linkedin"
              name="linkedin"
              error={errors.linkedin}
              rules={{ required: true }}
              register={register}
              placeholder="Linkedin"
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
