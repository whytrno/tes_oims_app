"use client";

import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const MobileFrame = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  // Ini memastikan bahwa komponen hanya akan melakukan render
  // setelah mount di client
  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (!mounted) {
    return null; // Hindari render sebelum mount
  }

  if (isMobile) {
    return <div className="flex flex-col w-screen h-screen">{children}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen py-5">
      <div className="outline-4 flex-1 rounded-lg w-[375px] flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default MobileFrame;
