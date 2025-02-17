"use client";

import { Button } from "@/components/ui/button";
import { SelectContent, SelectItem } from "@/components/ui/select";

export const Logout = () => {
  const LogoutPlease = async () => {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <Button
      onClick={LogoutPlease}
      className="bg-foreground text-background text-xs h-[20px] w-16">
      <div>Logout</div>
    </Button>
  );
};
