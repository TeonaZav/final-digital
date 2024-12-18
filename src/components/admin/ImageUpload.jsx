import { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { GoPlusCircle } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";
import { persistFormDataToSession } from "../../utils/formUtils";

const ImageUpload = ({
  fieldName,
  onChange,
  storageKey,
  onCancel = false,
  value,
}) => {
  const [fileUrl, setFileUrl] = useState(value || null);
  const fileInputRef = useRef(null);
  const {
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext();

  const handleFileProcessing = (file) => {
    if (file.size > 1048576) {
      setError(fieldName, {
        type: "manual",
        message: "ფაილის ზომა არ უნდა აღემატებოდეს 1mb-ს",
      });
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setFileUrl(objectUrl);
    onChange(file);

    persistFormDataToSession({ [fieldName]: file }, storageKey, fieldName);
  };

  useEffect(() => {
    if (value && !fileUrl) {
      setFileUrl(value);
    }
    if (onCancel) {
      setFileUrl(null);
    }
  }, [value, fileUrl]);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFileProcessing(file);
  };

  const handleRemoveImage = () => {
    setFileUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      const sessionData = JSON.parse(sessionStorage.getItem(storageKey)) || {};
      delete sessionData[fieldName];
      sessionStorage.setItem(storageKey, JSON.stringify(sessionData));
    }
    clearErrors(fieldName);
  
  };

  useEffect(() => {
    if (onCancel) {
      handleRemoveImage();
    }
  }, [onCancel]);

  return (
    <div
      className={`relative w-full h-32 flex justify-center items-center cursor-pointer border ${
        errors?.[fieldName] ? "border-red-500" : "border-gray-300"
      } border-dashed bg-gray-100 rounded-lg`}
    >
      <input
        ref={fileInputRef}
        id={fieldName}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      {fileUrl ? (
        <figure className="relative w-36 h-24 rounded-md">
          <img
            src={fileUrl}
            alt="Uploaded"
            className="w-full h-full object-contain rounded-md overflow-hidden"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute bottom-[-0.5rem] right-[-0.5rem] w-6 h-6 bg-white border border-gray-700 rounded-full flex justify-center items-center cursor-pointer"
          >
            <IoTrashOutline />
          </button>
        </figure>
      ) : (
        <GoPlusCircle />
      )}
    </div>
  );
};

export default ImageUpload;
