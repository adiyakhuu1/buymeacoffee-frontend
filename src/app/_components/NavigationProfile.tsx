"use client";
import { LuCoffee } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosLogOut } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cookies } from "next/headers";
import { data } from "../dashboard/page";
import { Logout } from "./logout";

export async function NavigationProfile() {
  const [dat, setData] = useState<data>();

  useEffect(() => {
    const fetData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashbordInfo`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setData(data);
      } catch (e) {
        console.error(e, "aldaa");
      }
    };
    fetData();
  }, []);
  return (
    dat && (
      <div className="bg-slate-100 w-screen ">
        <div className=" h-[56px] bg-white pt-2  content-center">
          <div className="h-[40px] flex justify-around ">
            <div className="h-[24px] font-bold text-base flex justify-around text-black mt-2 ml-[80px]">
              <p className=" h-[27px] pl-[10px] mt-[4px] rounded-xs">
                <LuCoffee />
              </p>
              <Link href="/dashboard">
                <p> Buy Me Coffee</p>
              </Link>
            </div>

            {dat.user ? (
              <div className=" h-[40px] flex gap-10 items-center">
                <Avatar>
                  <AvatarImage src={`${dat.user.profile.avatarImage}`} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className=" text-foreground">Hello, {dat.user.username}</p>
                <Logout />
              </div>
            ) : (
              <div className=" fixed right-10">
                <Link href={`/account/signin`}>Not signed in</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}
