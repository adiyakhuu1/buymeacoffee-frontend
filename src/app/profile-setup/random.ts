"use client";
import { useRouter } from "next/navigation";

const router = useRouter();
export const routeraaa = (step: string) => {
  if (!step) {
    router.replace(`/profile-setup?step=1`);
  }
};
