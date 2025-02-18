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
import { Loading } from "../_components/loading";

export default function ViewPage() {
  const [response, setResponse] = useState<data>();
  const [waitingfordata, setwaitingfordata] = useState(false);
  const router = useRouter();
  const [count, setCount] = useState(false);

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
        router.replace(`/${data.user.id}`);
      } else {
        router.replace(`/dashboard`);
      }
      setwaitingfordata(false);
    };
    fetchData();
  }, [count]);
  return (
    <div>
      <Loading />
    </div>
  );
}
