"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import z from "zod";
type response = {
  success?: boolean;
  message?: string;
  id?: string;
  code?: string;
};
const emailSchema = z.string().email();
const newPasswordSchema = z
  .object({
    firstPass: z.string().min(8),
    secondPass: z.string().min(8),
  })
  .refine((data) => data.firstPass === data.secondPass, {
    message: "Pass taarsangui",
    path: ["secondPass"],
  });
export function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otpId, setOtpId] = useState<string>("");
  const [response, setresponse] = useState<response>();
  const [otp, setOtp] = useState("");
  const [valid, isValid] = useState(false);
  const [isValidNewPassword, setIsValidNewPassword] = useState(false);
  const [isOtpMatched, setOtpState] = useState(false);
  const [userExist, setuserExist] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let interval = setTimeout(() => {
      if (response?.code === "PASS_CHANGED_SUCCESSFULLY") {
        router.refresh();
      }
    }, 2000);
    return () => {
      clearTimeout(interval);
    };
  }, [response]);
  // new pass
  const [newPassword, setNewPassword] = useState({
    firstPass: "",
    secondPass: "",
  });
  useEffect(() => {
    const result = emailSchema.safeParse(email);
    if (result.success) {
      isValid(true);
    } else {
      isValid(false);
    }
  }, [email]);
  useEffect(() => {
    const result = newPasswordSchema.safeParse(newPassword);
    if (result.success) {
      setIsValidNewPassword(true);
    } else {
      setIsValidNewPassword(false);
    }
  }, [newPassword]);
  const handleCheck = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/auth/reset/password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
          credentials: "include",
        }
      );
      const data = await res.json();
      setresponse(data);
      setLoading(false);
      console.log("step 1 data", data);
      if (data.success) {
        setuserExist(true);
        if (data?.id) {
          setOtpId(data?.id);
        }
      }
      console.log(data);
    } catch (e) {
      console.error(e, "aldaa");
    }
  };
  const changePassword = async () => {
    setLoading(true);
    console.log({ otp, email, otpId });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/auth/reset/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            otp,
            email,
            id: otpId,
            password: newPassword.secondPass,
          }),
        }
      );
      const data = await res.json();
      setresponse(data);
      setLoading(false);
      if (data.success) {
        setOtpState(true);
      }

      console.log(data);
    } catch (e) {
      console.error(e, "aldaa");
    }
  };

  // const changePassword = async () => {
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/users/auth/reset/change-password`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ password: newPassword.secondPass, email }),
  //       }
  //     );
  //     const data = await res.json();
  //     setresponse(data);
  //     console.log(data);
  //   } catch (e) {
  //     console.error(e, "aldaa");
  //   }
  // };
  return (
    <div className="relative h-[600px] w-full">
      <div className="w-[407px] h-[256px] absolute flex flex-col gap-3 justify-evenly top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div>
          <h3 className="font-bold text-2xl">Reset Password</h3>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            id="email"
            placeholder="Enter email here"
          />
        </div>

        {userExist && (
          <>
            <div>
              <label htmlFor="otp">OTP</label>
              <Input
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                name="otp"
                id="otp"
                placeholder="Enter OTP here"
              />
              <div
                className={`${
                  response?.success ? `text-green-500` : `text-red-500`
                }`}>
                {response?.message === "OTP_MATCHED" && "OTP Matched"}
                {response?.message === "OTP_NOT_MATCHED" && "OTP didn't match"}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col w-full gap-3">
                <div>
                  <label htmlFor="password">Enter new passsword</label>
                  <Input
                    onChange={(e) => {
                      setNewPassword((p) => {
                        return {
                          ...p,
                          firstPass: e.target.value,
                        };
                      });
                    }}
                    type="password"
                  />
                </div>
                <div>
                  <label htmlFor="2password">Confirm new passsword</label>
                  <Input
                    id="2password"
                    onChange={(e) => {
                      setNewPassword((p) => {
                        return {
                          ...p,
                          secondPass: e.target.value,
                        };
                      });
                    }}
                    type="password"
                  />
                </div>

                {response?.code === "PASS_CHANGED_SUCCESSFULLY" ? (
                  <div className="text-green-500 flex flex-col justify-between">
                    <div>Password changed successfully.</div>
                    <DialogClose asChild>
                      <Button className="text-background">Close</Button>
                    </DialogClose>
                  </div>
                ) : (
                  <Button
                    onClick={changePassword}
                    disabled={!isValidNewPassword || loading}
                    className="text-background">
                    {loading ? (
                      <div className="flex gap-2 items-center">
                        <div>Please Wait</div>
                        <AiOutlineLoading3Quarters className="animate-spin" />
                      </div>
                    ) : (
                      <div>Save changes</div>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
        {!userExist && (
          <Button
            disabled={!valid || loading}
            onClick={handleCheck}
            className="w-full text-background">
            Send Code
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
          </Button>
        )}
      </div>
    </div>
  );
}
