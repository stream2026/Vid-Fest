import React from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

function Uploader({ setData }) {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 100000,
    onDrop: (acceptedFiles) => {
      alert(acceptedFiles[0].name);
      setData(acceptedFiles[0])
    },
  });
  return (
    <div className="w-full text-center">
      <div
        {...getRootProps()}
        className="px-6 py-8 border-3 border-black bg-gray-300 rounded-md cursor-pointer">
        <input {...getInputProps()} />
        <span className="mx-auto flex-colo text-subMain text-3xl">
          <FiUploadCloud />
        </span>
        <p className="text-sm mt-2">Drag your file here</p>
        <em className="text-xs text-border">
          (only .jpg and .png files will be accepted)
        </em>
      </div>
    </div>
  );
}

export default Uploader;
