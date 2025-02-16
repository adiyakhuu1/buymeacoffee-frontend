"use client";

import { useEffect, useState } from "react";
import EditCover from "./_components/EditCover";
import FrameEditPage from "./_components/FrameEditPage";
import FrameViewDonation from "./_components/FrameViewDonation";
import { useParams, useRouter } from "next/navigation";
import { data } from "../dashboard/page";
import { response } from "../account/signin/page";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ViewPage() {
  const [response, setResponse] = useState<data>();
  const [waitingfordata, setwaitingfordata] = useState(false);
  const router = useRouter();
  const [count, setCount] = useState(false);

  const params = useParams();
  const { userId } = params;
  useEffect(() => {
    setwaitingfordata(true);
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashbordInfo`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success) {
        router.push(`/${data.user.id}`);
      } else {
        router.push(`/dashboard}`);
      }
    };
    fetchData();
  }, [count]);
  return (
    <div className=" whitespace-nowrap flex items-center gap-3 fixed transform top-1/2 left-1/2 right-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2">
      <AiOutlineLoading3Quarters className="animate-spin" />
      <div className="animate-pulse">Please wait!</div>
    </div>
  );
}
