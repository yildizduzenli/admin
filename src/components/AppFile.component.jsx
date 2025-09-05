import { FileUploaderRegular } from "@uploadcare/react-uploader";
import { AppLabel } from ".";
import { useState } from "react";
import { X } from "lucide-react";

const AppFile = ({ onChange, isRequired, label, defaultValue }) => {
  const publicKey = import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY;
  const [url, setUrl] = useState(defaultValue);

  const handleFileAdded = (file) => {
    setUrl(file?.cdnUrl);
    onChange(file?.cdnUrl);
  };

  const handleFileRemoved = () => {
    setUrl(null);
    onChange(null);
  };

  return (
    <div className="w-full mb-4 flex flex-col gap-3 justify-center items-center">
      <AppLabel label={label} isRequired={isRequired} />
      <FileUploaderRegular
        pubkey={publicKey}
        imgOnly
        onFileUploadSuccess={handleFileAdded}
        onFileRemoved={handleFileRemoved}
        multiple={false}
      />

      {url && (
        <>
          <img src={url} className="w-full h-96 rounded-lg object-contain" />
        </>
      )}
    </div>
  );
};

export default AppFile;
