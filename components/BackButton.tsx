"use client";

import { useRouter } from "next/navigation";
import { CiCircleChevLeft } from "react-icons/ci";

const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="flex gap-x-2 items-center">
      <CiCircleChevLeft className="text-2xl" />
      <p className="font-bold">Back</p>
    </button>
  );
};

export default BackButton;
