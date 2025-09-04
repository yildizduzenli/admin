import { AppScreenLoading, AppTable, AppModal } from "@/components";
import { useEffect, useState } from "react";
import { dateToString, timeToString } from "@/utils/date";
import { Link, useNavigate } from "react-router";
import { SquarePen } from "lucide-react";
import { getRedis, deleteRedis } from "../service/redis";
import DashboardLayout from "../layouts/Dashboard.layout";

const ServiceList = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    setIsLoading(true);

    try {
      const response = await getRedis("services");

      setServices(response || []);

      setColumns([
        {
          accessorKey: "image",
          header: "Fotoğraf",
        },
        {
          accessorKey: "title",
          header: "Başlık",
        },
        {
          accessorKey: "subTitle",
          header: "Alt Başlık",
        },
        {
          accessorKey: "createDate",
          header: "Oluşturma Tarihi",
          accessorFn: (row) => {
            return `${timeToString(row?.createDate)} - ${dateToString(
              row?.createDate
            )} `;
          },
        },
        {
          accessorKey: "updateDate",
          header: "Güncelleme Tarihi",
          accessorFn: (row) => {
            return `${timeToString(row?.updateDate)} - ${dateToString(
              row?.updateDate
            )} `;
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (row) => {
    setServiceToDelete(row);
    setIsDeleteModalOpen(true);
  };

  const deleteService = async () => {
    try {
      await deleteRedis("services", serviceToDelete);
      setIsDeleteModalOpen(false);
      setServiceToDelete(null);
      getServices();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDelete = () => {
    setServiceToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const HeaderActions = () => {
    return (
      <Link
        to="/service/add"
        className="bg-white flex w-auto min-w-fit flex-row items-center gap-2  hover:bg-gray-100 transition-all text-sm duration-300 border border-gray-200 cursor-pointer text-gray-800 px-4 py-2 rounded-md"
      >
        <SquarePen className="w-4 h-4" />
        Hizmet Ekle
      </Link>
    );
  };

  return (
    <>
      {isLoading ? (
        <AppScreenLoading />
      ) : (
        <>
          <AppTable
            tableColumns={columns}
            data={services}
            pageKey="service"
            onDelete={handleDeleteClick}
            title="Tüm Hizmetler"
            isActionsActive={true}
            isPaginationActive={false}
            HeaderActions={HeaderActions}
          />

          <AppModal
            isOpen={isDeleteModalOpen}
            onClose={handleCancelDelete}
            title="Hizmeti Sil"
          >
            <p className="text-gray-700">
              Bu hizmeti silmek istediğinize emin misiniz?
            </p>

            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="w-full cursor-pointer bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all duration-300 font-medium rounded-lg px-4 py-2.5"
              >
                İptal
              </button>
              <button
                onClick={deleteService}
                className="w-full flex items-center justify-center cursor-pointer bg-red-500 text-white hover:bg-red-600 transition-all duration-300 font-medium rounded-lg px-4 py-2.5 disabled:opacity-50"
              >
                Sil
              </button>
            </div>
          </AppModal>
        </>
      )}
    </>
  );
};

export default ServiceList;
