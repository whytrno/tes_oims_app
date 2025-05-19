"use client";

import { useRef } from "react";
import { CiCircleRemove, CiSaveUp2 } from "react-icons/ci";
import * as XLSX from "xlsx";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload: (data: any[]) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onFileUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      if (typeof bstr !== "string") return;

      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      onFileUpload(data);
      onClose();
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="absolute top-0 left-0 h-screen w-screen z-50 flex items-center justify-center backdrop-blur-xl">
      <div className="border border-gray-300 bg-white rounded-lg divide-y divide-gray-300 w-1/4">
        <div className="flex justify-between px-4 py-2 items-center">
          <p>Upload File</p>
          <button onClick={onClose} className="cursor-pointer text-red-600">
            <CiCircleRemove className="text-xl" />
          </button>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="relative flex items-center justify-center h-40 w-full flex-col hover:bg-gray-100 cursor-pointer space-y-1"
        >
          <CiSaveUp2 className="text-3xl" />
          <p>Pilih File (.xlsx)</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx"
            onChange={handleFileUpload}
            hidden
          />
        </button>

        <div className="px-4 py-2">
          <p className="font-bold">Note:</p>
          <p>
            1. Download template excel{" "}
            <a href="" className="underline text-blue-600">
              Disini
            </a>
          </p>
          <p>2. Jangan rubah header, gunakan header yang sudah disediakan</p>
          <p>3. Category yang berlaku hanya Tes1 | Tes2</p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-black text-white py-2 rounded-b-lg cursor-pointer hover:bg-gray-800"
        >
          Import
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
