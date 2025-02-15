"use client";

import { useEffect, useState } from "react";
import EditCover from "../view-page/_components/EditCover";
import FrameEditPage from "../view-page/_components/FrameEditPage";
import FrameViewDonation from "../view-page/_components/FrameViewDonation";
import { useParams } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { data } from "../dashboard/page";

type response = {
  data: {
    user: {
      profile: {
        id: string;
        name: string;
        about: string;
        avatarImage: string;
        socialMediaURL: string;
        backgroundImage: null | string;
        successMessage: string;
        userId: string;
      };
    };
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
      console.log(data);
    };
    fetchData();
  }, [count]);
  return (
    <>
      {loading ? (
        <div className="fixed top-1/2 left-1/2 right-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div>Please wait</div>
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
        </div>
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
                <FrameEditPage user={data.data.user} owner={owner} />
              )}
              <FrameViewDonation />
            </div>
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
}
