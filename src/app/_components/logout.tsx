"use client";

import { Button } from "@/components/ui/button";
import { SelectContent, SelectItem } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { Loading } from "./loading";
import { useRouter } from "next/navigation";
type response = {
  success: boolean;
  message: string;
};
export const Logout = () => {
  const router = useRouter();
  const [response, setresponse] = useState<response>();
  const [loading, setLoading] = useState(false);
  const LogoutPlease = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      credentials: "include",
    });
    const data = await res.json();
    setresponse(data);
    setLoading(false);
    console.log(data);
  };
  useEffect(() => {
    if (response?.success) {
      router.push(`/account/signin`);
    }
  }, [response]);
  return (
    <>
      <button onClick={LogoutPlease}>
        <IoIosLogOut className="text-3xl" />
      </button>
      {response && (
        <div>
          {response?.success ? (
            <div className=" text-green-500">Logged out successfullyy</div>
          ) : (
            <div className=" text-red-500">Something went wrong</div>
          )}
        </div>
      )}
      {loading && <Loading />}
    </>
  );
};
