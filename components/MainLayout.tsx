"use client";

import { useEffect, useState } from "react";
import Footer from "./Footer";
import MobileFrame from "./MobileFrame";
import BackButton from "./BackButton";
import { ActionMenu } from "@/types/layouts";
import MobileHeader from "./MobileHeader";
import { useRouter } from "next/navigation";
import LoadingOverlay from "./LoadingOverlay";

type ListViewProps = {
  isListView: true;
  title: string;
};

type NonListViewProps = {
  isListView?: false;
  title?: string;
};

type MainLayoutProps = (ListViewProps | NonListViewProps) & {
  children: React.ReactNode;
  desktopOnly?: boolean;
  actionMenus?: ActionMenu[];
  noPadding?: boolean;
  loading?: boolean;
};

const MainLayout = ({
  children,
  isListView = false,
  desktopOnly = false,
  title,
  actionMenus = [],
  noPadding = false,
  loading = false,
}: MainLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const showMobileOverlay = desktopOnly && isMobile;

  return (
    <>
      {!desktopOnly ? (
        <MobileFrame>
          <div className="flex-1 flex flex-col bg-gray-100">
            {isListView && (
              <MobileHeader
                title={title ? title : ""}
                actionMenus={actionMenus}
              />
            )}

            <div
              className={`grow h-0 overflow-y-auto space-y-3 ${!noPadding && "p-5"}`}
            >
              {children}
            </div>

            {!isListView && <Footer />}
          </div>
        </MobileFrame>
      ) : (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100 relative">
          <div className="h-16 px-20 grid grid-cols-3 items-center bg-white border-b border-gray-300">
            <BackButton />
            <div className="justify-self-center font-bold">
              <p>{title}</p>
            </div>
          </div>

          <div className="flex-1 px-20 py-10">{children}</div>

          {/* Overlay hanya muncul jika mobile + desktopOnly */}
          {showMobileOverlay && (
            <div className="absolute inset-0 h-full w-full backdrop-blur-lg z-50 flex items-center justify-center px-4">
              <div className="bg-white shadow-xl rounded-xl max-w-md w-full py-6 px-8 text-center space-y-4">
                <h3 className="text-xl font-bold">Desktop Only!</h3>
                <p className="text-gray-700">
                  Halaman ini hanya dapat diakses melalui perangkat desktop atau
                  tablet dengan resolusi lebih besar.
                </p>
                <button
                  onClick={() => router.back()}
                  className="bg-black text-white py-2 w-full rounded-lg text-sm"
                >
                  Kembali
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {loading && <LoadingOverlay />}
    </>
  );
};

export default MainLayout;
