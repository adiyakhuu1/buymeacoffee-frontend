'use client';
import { useState } from "react";
import { ExternalLinkIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const SideBar = () => {
  const [active, setActive] = useState("Home");
  const pathname = usePathname();

  return (
    <div className="w-[251px] h-[156px] p-4 flex flex-col mt-[44px] ml-[80px] mr-[74px]">
      <nav className="space-y-2">
        <Link href="/dashboard">
          <button
            className={`w-full text-left p-2 rounded-lg text-[14px] hover:bg-[#F4F4F5] ${pathname.includes("dashboard") ? "bg-[#F4F4F5]" : ""}`}
            onClick={() => setActive("Home")}
          >
            Home
          </button>
        </Link>
        <Link href="/explore">
          <button
            className={`w-full text-left p-2 rounded-lg text-[14px] hover:bg-[#F4F4F5] ${pathname.includes("explore") ? "bg-[#F4F4F5]" : ""}`}
            onClick={() => setActive("Explore")}
          >
            Explore
          </button>
        </Link>
        <Link href="/view-page">
          <button className="w-full text-left p-2 rounded-lg hover:bg-[#F4F4F5] flex items-center gap-1 text-[14px]">
            View page
            <span className="ml-2">
              <ExternalLinkIcon className="text-[#18181B] h-[12px] w-[12px]" />
            </span>
          </button>
        </Link>
        <Link href="/settings">
          <button
            className={`w-full text-left p-2 rounded-lg text-[14px] hover:bg-[#F4F4F5] ${pathname.includes("settings") ? "bg-[#F4F4F5]" : ""}`}
            onClick={() => setActive("Account settings")}
          >
            Account settings
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;




