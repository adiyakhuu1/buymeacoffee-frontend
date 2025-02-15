"use client";

import { useEffect, useState } from "react";
import EditCover from "./_components/EditCover";
import FrameEditPage from "./_components/FrameEditPage";
import FrameViewDonation from "./_components/FrameViewDonation";
import { useParams } from "next/navigation";
import { data } from "../dashboard/page";
import { response } from "../account/signin/page";
import Link from "next/link";

export default function ViewPage() {
  const [response, setResponse] = useState<data>();
  const [waitingfordata, setwaitingfordata] = useState(false);

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
      setResponse(data);
      setwaitingfordata(false);
      console.log(data);
    };
    fetchData();
  }, [count]);
  return (
    <>
      {response?.success ? (
        <div className="">
          <div className="relative">
            {response && (
              <EditCover
                setCount={setCount}
                count={count}
                user={response.user}
              />
            )}
          </div>
          <div className="relative flex justify-center">
            {/* <div className="w-[1280px] flex justify-between pt-[238px]"> */}
            <div className="flex flex-col items-center xl:flex-row gap-20 absolute -top-10">
              {response && <FrameEditPage user={response.user} />}

              <FrameViewDonation />
            </div>
            {/* </div> */}
          </div>
        </div>
      ) : !waitingfordata ? (
        <div>
          {response?.code !== `JWT_EXPIRED` ? (
            <div className="fixed transform top-1/2 left-1/2 bottom-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2  whitespace-nowrap font-extrabold text-2xl">
              Please Wait...
            </div>
          ) : (
            <Link
              className="fixed transform top-1/2 left-1/2 bottom-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-extrabold text-2xl"
              href={`/account/signin`}
            >
              Please Login 💩
            </Link>
          )}
        </div>
      ) : (
        <div>Updating page</div>
      )}
    </>
  );
}
