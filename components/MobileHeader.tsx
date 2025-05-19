"use client";

import { CiCircleMore } from "react-icons/ci";
import BackButton from "./BackButton";
import { ActionMenu } from "@/types/layouts";
import { useState } from "react";

interface MobileHeaderProps {
  title: string;
  actionMenus?: ActionMenu[];
}

const MobileHeader = ({ title, actionMenus }: MobileHeaderProps) => {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

  return (
    <div className="h-16 bg-white px-4 grid grid-cols-3 items-center border-b border-gray-200">
      <BackButton />

      <p className="font-bold justify-self-center text-center">{title}</p>

      {isActionMenuOpen && (
        <div className="justify-self-end relative py-2">
          <button
            onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
            className="flex gap-x-2 items-center"
          >
            <p className="font-bold">Menu</p>
            <CiCircleMore />
          </button>

          <div className="absolute top-full right-0 bg-white shadow-md rounded-md p-2">
            {actionMenus?.map((menu, index) => (
              <button
                key={index}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 whitespace-nowrap"
              >
                {menu.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
