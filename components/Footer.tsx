import Link from "next/link";
import { CiGrid41, CiUser } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="flex justify-around py-4 bg-white border-t border-gray-200">
      <Link
        href={""}
        className="flex flex-col gap-y-1 items-center justify-center"
      >
        <CiGrid41 className="text-2xl" />
        <p>Home</p>
      </Link>
      <Link
        href={""}
        className="flex flex-col gap-y-1 items-center justify-center"
      >
        <CiUser className="text-2xl" />
        <p>Profile</p>
      </Link>
    </div>
  );
};

export default Footer;
