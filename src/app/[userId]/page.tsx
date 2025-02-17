"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { user } from "@/app/utils/types";
import EditCover from "@/app/view-page/_components/EditCover";
import FrameEditPage from "@/app/view-page/_components/FrameEditPage";
import FrameViewDonation from "@/app/view-page/_components/FrameViewDonation";
import { Loading } from "../_components/loading";

type response = {
  data: {
    user: user;
  };
  success: boolean;
  owner: boolean;
};
export default function ViewPage() {
  const [data, setData] = useState<response>();
  const [count, setCount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState();

  const params = useParams();
  const { userId } = params;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/auth/dashboard/${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setData(data);
      setOwner(data.owner);
      setLoading(false);
    };
    fetchData();
  }, [count]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="">
          <div className="relative">
            {data?.data?.user && (
              <EditCover
                setCount={setCount}
                count={count}
                user={data.data.user}
                owner={owner}
              />
            )}
          </div>
          <div className="relative flex justify-center">
            {/* <div className="w-[1280px] flex justify-between pt-[238px]"> */}
            <div className="flex flex-col items-center xl:flex-row gap-20 absolute -top-10">
              {data?.data?.user && (
                <>
                  <FrameEditPage user={data.data.user} owner={owner} />
                  <FrameViewDonation user={data.data.user} />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
