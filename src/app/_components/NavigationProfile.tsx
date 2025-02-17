import { LuCoffee } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cookies } from "next/headers";
import { data } from "../dashboard/page";
import { Logout } from "./logout";

export async function NavigationProfile() {
  let dat = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashbordInfo`, {
      credentials: "include",
      headers: { Cookie: (await cookies()).toString() },
    });
    dat = await res.json();
  } catch (e) {
    console.error(e, "aldaa");
  }
  return (
    dat && (
      <div className="bg-slate-100 w-screen ">
        <div className=" h-[56px] bg-white pt-2 ">
          <div className="h-[40px] flex justify-between ">
            <div className=" w-[151px] h-[24px] font-bold text-base flex justify-around text-black mt-2 ml-[80px]">
              <p className="w-[27px] h-[27px] pl-[10px] mt-[4px] rounded-xs">
                <LuCoffee />
              </p>
              <Link href="/dashboard">
                <p> Buy Me Coffee</p>
              </Link>
            </div>

            {dat.user ? (
              <div className="w-[168px] h-[40px] flex justify-betweens mr-[80px]">
                <Avatar>
                  <AvatarImage src={`${dat.user.profile.avatarImage}`} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="font-medium font-sm ml-[8px] pt-2">
                  {dat.user.username}
                </p>

                <Select>
                  <SelectTrigger className="w-[180px] border-none outline-none">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="logout">Logout</SelectItem>
                  </SelectContent>
                </Select>
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
