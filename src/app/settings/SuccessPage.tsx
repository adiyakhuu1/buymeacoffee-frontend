"use client";
import { useState } from "react";
import { data } from "../dashboard/page";
import { Loading } from "../_components/loading";
import { Button } from "@/components/ui/button";
import { response } from "../account/signin/page";

type Props = {
  user: data;
};
export default function SuccessPage(props: Props) {
  const [message, setMessage] = useState("");
  const [response, setresponse] = useState<response>();
  const [loading, setLoading] = useState(false);
  const sendData = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/update/successMessage`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ successMessage: message }),
      }
    );
    const data = await res.json();
    setresponse(data);
    setLoading(false);
    // console.log(data);
  };
  return (
    <div className="w-[650px] min-h-[250px] text-black gap-1 p-[24px] flex flex-col rounded-[9px] border-[#E4E4E7] border-[1px] ">
      <h1 className="font-bold text-[16px] pb-5">Success page</h1>
      <h2 className="text-[14px] font-semibold">Confirmation message</h2>
      <textarea
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        defaultValue={`${props.user.user.profile.successMessage}`}
        className="rounded-[6px] border-[#E4E4E7] border-[1px] min-h-[100px]"
        placeholder="Thank you for supporting me! It means lot to have your support. it's a step toward creating a more inclusive and accepting community of artists."
      />
      <Button
        disabled={loading || message.length === 0}
        onClick={sendData}
        className=" text-background mt-2"
      >
        Save changes
      </Button>
      {response && (
        <div>
          {response?.success ? (
            <div className=" text-green-500">Saved Successfully!</div>
          ) : (
            <div className="text-red-500">Something went wrong</div>
          )}
        </div>
      )}

      {loading && <Loading />}
    </div>
  );
}
