"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { data } from "../dashboard/page";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Loading } from "../_components/loading";
type Props = {
  user: data;
};
type response = {
  success?: boolean;
  message?: string;
  id?: string;
  code?: string;
};
const passwordSchema = z
  .object({
    password1: z.string().min(8),
    password2: z.string().min(8),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Pass taarsangui",
  });
export default function SetSNewPassword(props: Props) {
  const router = useRouter();
  const [password, setPassword] = useState({
    password1: "",
    password2: "",
  });
  const [isValid, setIsValid] = useState<boolean>(true);
  const [response, setresponse] = useState<response>();
  const [isOTPsent, setOpenDialog] = useState(false);
  const [OTPID, setOTPID] = useState("");
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  useEffect(() => {
    const result = passwordSchema.safeParse(password);
    if (result.success) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [password]);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setPassword((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    if (response?.code === "JWT_EXPIRED") {
      router.push("/account/signin");
    }
  }, [response]);
  const sendOTP = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/auth/reset/password`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: props.user.user.id }),
      }
    );
    const response = await res.json();
    setOTPID(response.id);
    if (response.success) {
      setOpenDialog(true);
    }
    // console.log(response);
    setLoading(false);
  };
  const CheckOTP = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/auth/reset/change-password`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: OTPID,
          otp: OTP,
          password: password.password2,
        }),
      }
    );
    const response = await res.json();
    // console.log(response);
    setresponse(response);

    setLoading(false);
  };
  // console.log(password);
  return (
    <div className="w-[650px] min-h-[350px] text-black gap-1 p-[24px] flex flex-col rounded-[9px] border-[#E4E4E7] border-[1px] ">
      <h1 className="font-bold text-[16px] pb-5">Set a new password</h1>
      <h2 className="text-[14px] font-semibold">New password</h2>
      <input
        name="password1"
        onChange={onChange}
        type="password"
        className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2"
        placeholder="Enter new password"
      />
      <h2 className="text-[14px] font-semibold">Confirm password</h2>
      <input
        name="password2"
        onChange={onChange}
        type="password"
        className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2"
        placeholder="Confirm password"
      />
      {isOTPsent && (
        <>
          <div className="flex justify-between">
            <label htmlFor="OTP">OTP</label>
            <button onClick={sendOTP}>Send Mail again</button>
          </div>
          <Input
            onChange={(e) => {
              setOTP(e.target.value);
            }}
            id="OTP"
          />
        </>
      )}
      {isOTPsent ? (
        <>
          <Button
            onClick={CheckOTP}
            disabled={isValid || loading}
            className="mt-4 p-2 text-background"
          >
            {loading ? (
              <div className=" flex gap-3">
                <Loading />
                <AiOutlineLoading3Quarters className="animate-spin" />
              </div>
            ) : (
              "Save changes"
            )}
          </Button>
        </>
      ) : (
        <Button
          onClick={() => {
            sendOTP();
          }}
          disabled={isValid || loading}
          className="mt-4 p-2 text-background"
        >
          {loading ? <div>Please wait</div> : "Send mail"}
        </Button>
      )}
      {response?.success && (
        <div
          className={` ${
            response.success ? `text-green-500` : `text-red-500`
          } `}
        >
          {response?.message}
        </div>
      )}
    </div>
  );
}
