import Image from "next/image";

const LoadingOverlay = () => {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <Image
          src={"/logo.png"}
          alt="OIMS Logo"
          width={50}
          height={50}
          priority
        />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
