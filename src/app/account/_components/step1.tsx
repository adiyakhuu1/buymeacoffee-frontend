"use client";
import { Skeleton } from "@/app/_components/Skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export type form = {
  username: string;
  password: string;
  email: string;
};
type response = {
  message: string;
  yes?: string;
  no?: string;
};
export default function SignupStep1() {
  const router = useRouter();
  const [response, setResponse] = useState<response>();
  const [loading, setLoading] = useState<boolean>();
  const [form, setForm] = useState<form>({
    username: "",
    password: "",
    email: "",
  });
  useEffect(() => {
    const formString = localStorage.getItem("signup-info");
    const formL = formString
      ? JSON.parse(formString)
      : { username: "", password: "", email: "" };
    setForm(formL);
  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  const nextStep = () => {
    if (response?.yes) {
      router.replace(`/account/signup?step=2`);
    }
  };
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    setLoading(true);
    setResponse({ message: "" });
    if (form.username) {
      timeout = setTimeout(async () => {
        const send = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/auth/${form.username}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const response = await send.json();
        setResponse(response);
        setLoading(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [form.username]);
  useEffect(() => {
    localStorage.setItem("signup-info", JSON.stringify(form));
  }, [form]);

  const save = () => {
    localStorage.setItem("signup-info", JSON.stringify(form));
  };
  console.log(form);
  return (
    <div className="relative min-h-screen w-full">
      <div className="flex justify-end p-10">
        <Link href={`/account/signin`}>
          <Button className="bg-secondary text-foreground hover:bg-foreground hover:text-background">
            Log in
          </Button>
        </Link>
      </div>
      <div className="w-[407px] h-[256px] absolute flex flex-col justify-evenly top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="">
          <h3 className="font-bold text-2xl">Create you account</h3>
          <p className="text-muted-foreground text-sm">
            choose an username for you page
          </p>
        </div>
        <div>
          <div>
            <label htmlFor="username">Username</label>
            <Input
              className={`border ${
                form.username && response?.no
                  ? "border-red-500"
                  : response?.yes
                  ? "border-green-400"
                  : "border-gray-300"
              }`}
              defaultValue={form.username}
              onChange={(e) => {
                handleChange(e);
              }}
              name="username"
              id="username"
              placeholder="Enter username here"
            />
          </div>
          {response?.message ? (
            <div
              className={`${
                form.username && response?.no
                  ? "text-red-500"
                  : response?.yes
                  ? "text-green-400"
                  : "text-gray-300"
              }`}>
              {response?.message}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <AiOutlineLoading3Quarters className="animate-spin" />
              <div className="animate-pulse">Checking</div>
            </div>
          )}
        </div>

        <Button
          onClick={(e) => {
            if (form.username.length < 6 || !response?.yes) {
              e.preventDefault();
            } else {
              save();
              nextStep();
            }
          }}
          disabled={form.username.length < 6 || !response?.yes}
          className="w-full text-background">
          Continue
        </Button>
      </div>
    </div>
  );
}
