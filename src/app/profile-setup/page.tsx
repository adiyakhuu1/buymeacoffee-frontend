"use client";
import { Input } from "@/components/ui/input";
import { ProfileHeader } from "./_components/profile_header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ProfileSetup1 from "./_components/profile_setup_form_step1";
import ProfileSetup2 from "./_components/profile_setup_form_step2";
import Link from "next/link";
import { routeraaa } from "./random";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
type Props = {
  searchParams: Promise<{
    step: string;
  }>;
};

export default function Profile(props: Props) {
  // const { step } = await props.searchParams;
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  const router = useRouter();
  useEffect(() => {
    if (!step) {
      router.replace(`/profile-setup?step=1`);
    }
  }, []);
  return (
    <div className="flex flex-col">
      <div className="py-6">
        <ProfileHeader />
      </div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        {!step && <Link href={`/profile-setup?step=1`}>Redirecting</Link>}
      </div>
      {Number(step) == 1 && (
        <div className="flex justify-center items-center min-h-screen">
          <ProfileSetup1 />
        </div>
      )}

      {Number(step) == 2 && (
        <div className="flex justify-center items-center min-h-screen">
          <ProfileSetup2 />
        </div>
      )}

      <div className="flex justify-center items-center"></div>
    </div>
  );
}
