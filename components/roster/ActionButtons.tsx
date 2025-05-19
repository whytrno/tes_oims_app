"use client";

import React from "react";
import { CiFileOn } from "react-icons/ci";

interface ActionButtonsProps {
  onOpenUploadModal: () => void;
  onApprove: () => void;
  onSave: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onOpenUploadModal,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-x-2">
        {/* <button
          className="bg-black text-white rounded-lg py-2 px-4 flex gap-x-1 items-center cursor-pointer"
          onClick={() => {}}
        >
          <CiCirclePlus className="text-xl" />
          <p>Mulai Pengerjaan</p>
        </button> */}
        <button
          className="bg-blue-700 text-white rounded-lg py-2 px-4 flex gap-x-1 items-center cursor-pointer"
          onClick={onOpenUploadModal}
        >
          <CiFileOn className="text-xl" />
          <p>Import Dengan Excel</p>
        </button>
      </div>
      {/* <div className="flex gap-x-2">
        <button
          className="bg-blue-700 text-white rounded-lg py-2 px-4 flex gap-x-1 items-center cursor-pointer"
          onClick={onApprove}
        >
          <CiCircleCheck className="text-xl" />
          <p>Approve</p>
        </button>
        <button
          className="bg-green-700 text-white rounded-lg py-2 px-4 flex gap-x-1 items-center cursor-pointer"
          onClick={onSave}
        >
          <CiFileOn className="text-xl" />
          <p>Simpan</p>
        </button>
      </div> */}
    </div>
  );
};

export default ActionButtons;
