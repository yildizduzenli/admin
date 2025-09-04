import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { AppBreadCrumb, AppEditor, AppFile, AppInput } from "@/components";
import { convertToSlug } from "../utils/slug";
import { getRedis, setRedis } from "../service/redis";
import DashboardLayout from "../layouts/Dashboard.layout";

const AddService = () => {
  const navigate = useNavigate();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [services, setServices] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    setError,
  } = useForm();

  const getServices = async () => {
    const response = await getRedis("services");
    const services = response;
    setServices(services || []);
  };

  useEffect(() => {
    getServices();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    if (!data?.image) {
      setError("image");
      return;
    }

    setIsSubmitLoading(true);
    try {
      const slug = await convertToSlug(data.title);
      const submitData = {
        ...data,
        slug,
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString(),
      };
      const newServices = [...services, submitData];
      await setRedis("services", newServices);

      navigate(`/service/list`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
      <AppBreadCrumb />

      <form
        className="w-full bg-white p-5 rounded-lg border border-gray-200 mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AppFile
          name="image"
          error={errors.image}
          register={register}
          rules={{ required: true }}
          label="Hizmet Fotoğrafı"
          isRequired={true}
          onChange={(url) => {
            setValue("image", url);
          }}
        />
        <AppInput
          label="Başlık"
          name="title"
          error={errors.title}
          rules={{ required: true }}
          register={register}
          placeholder="Başlık"
        />
        <AppInput
          label="Alt Başlık"
          name="subTitle"
          error={errors.subTitle}
          rules={{ required: true }}
          register={register}
          placeholder="Alt Başlık"
        />

        <AppEditor
          label={"İçerik"}
          name="content"
          error={errors.content}
          rules={{ required: true }}
          control={control}
          placeholder="İçerik"
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
    </>
  );
};

export default AddService;
