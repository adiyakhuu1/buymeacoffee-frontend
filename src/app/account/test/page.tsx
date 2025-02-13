"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type form = {
  username: string;
  password: string;
};
export default function App() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          type="text"
          onChange={(e) =>
            setForm((p) => {
              return { ...p, username: e.target.value };
            })
          }
        />
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          onChange={(e) =>
            setForm((p) => {
              return { ...p, username: e.target.value };
            })
          }
        />
        <Button type="submit" className="text-background">
          Submit
        </Button>
      </div>
    </div>
  );
}
