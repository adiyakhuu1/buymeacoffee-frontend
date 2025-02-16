"use client";
import { ProfileType } from "@/app/_typescript/ProfileType";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import z from "zod";

type Props = {
  user: user;
  owner?: boolean;
};
type user = {
  id: string;
  email: string;
  username: string;
  bankCard: string;
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
const donoSchema = z.object({
  amount: z.number().min(1),
  specialMessage: z.string().min(2),
  recipentId: z.string().min(10),
  socialURLOrBuyMeACoffee: z.string().url(),
});
export default function FrameViewDonation(props: Props) {
  const { userId } = useParams();
  const recipentId = userId;
  const [form, setForm] = useState({
    amount: 0,
    specialMessage: "",
    socialURLOrBuyMeACoffee: "",
    recipentId,
  });
  const [response, setReponse] = useState();
  const [isValid, setisValid] = useState(true);
  useEffect(() => {
    const result = donoSchema.safeParse(form);
    if (result.success) {
      setisValid(false);
    } else {
      setisValid(true);
    }
    console.log(result);
  }, [form]);

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  console.log(form);

  const sendDono = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/donation/create-donation`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    const respo = await res.json();
    setReponse(respo);
    console.log(respo);
  };

  return (
    <div className="max-w-lg bg-white border border-gray-300 rounded-lg p-6 z-3">
      <h2 className="text-xl font-semibold mb-4">
        Buy "{props.user.profile.name}" a Coffee
      </h2>

      <div className="mb-4">
        <h3 className="text-sm font-medium">Select amount:</h3>
        <div className="flex gap-2 mt-2">
          {[1, 2, 5, 10].map((amount) => (
            <button
              onClick={() => {
                setForm((prev) => {
                  return {
                    ...prev,
                    amount,
                  };
                });
              }}
              key={amount}
              className="px-4 py-2 flex items-center gap-2 border rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
            >
              ☕ ${amount}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium">
          Enter BuyMeCoffee or social account URL:
        </label>
        <input
          name="socialURLOrBuyMeACoffee"
          onChange={handleChange}
          type="text"
          placeholder="buymeacoffee.com/"
          className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-gray-200 outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium">Special message:</label>
        <textarea
          name="specialMessage"
          onChange={handleChange}
          placeholder="Please write your message here"
          className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-gray-200 outline-none"
          rows={3}
        ></textarea>
      </div>

      <Button
        onClick={sendDono}
        className="w-full py-2 rounded-lg text-background"
        disabled={isValid}
      >
        Support
      </Button>
    </div>
  );
}
