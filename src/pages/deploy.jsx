import { useEffect, useState } from "react";

const Deploy = () => {
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    const deployCookie = localStorage.getItem("deploy");
    if (deployCookie === "deploying") {
      setIsDeploying(true);
    } else {
      setIsDeploying(false);
    }
  }, []);

  const deploy = async () => {
    try {
      setIsDeploying(true);
      localStorage.setItem("deploy", "deploying");

      setTimeout(() => {
        localStorage.setItem("deploy", "deployed");
      }, 10 * 60 * 100);

      const DEPLOY_URL = import.meta.env.VITE_DEPLOY_URL;
      await fetch(DEPLOY_URL, {
        method: "GET",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="text-2xl font-bold text-center">Yayınla</h1>
      <h2 className="text-center mt-2 text-base text-gray-500">
        Yaptığınız değişiklikleri yayına almak için aşağıdaki butona tıklayınız.
        Yaklaşık 10 dakika içerisinde değişiklikleriniz yayına alınacaktır.
      </h2>
      <button
        onClick={deploy}
        disabled={isDeploying}
        className="w-fit cursor-pointer mx-auto mt-4 flex items-center justify-center bg-indigo-500 text-indigo-50 hover:bg-indigo-600 transition-all duration-300 font-medium rounded-lg px-8 py-2.5 disabled:opacity-50"
      >
        {isDeploying ? "Yayınlanıyor..." : "Yayınla"}
      </button>
    </>
  );
};

export default Deploy;
