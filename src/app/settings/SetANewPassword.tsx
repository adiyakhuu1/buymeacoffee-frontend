"use client"

import { useEffect, useState } from "react";



export default function SetSNewPassword() {
  const [userId, setUserId] = useState("")
  useEffect(() => {
    const localId = localStorage.getItem("userId");
    setUserId(localId!)
  }, [])

  // const updatePassword = async () => {
  //     const response = await fetch(`http://localhost:4000/users/update/${userId}`, {
  //         method: "POST",

  //     });
  //     const data = await response.json();

  // }
  // updatePassword()


  return <div className="w-[650px] min-h-[250px] text-black gap-1 p-[24px] flex flex-col rounded-[9px] border-[#E4E4E7] border-[1px] ">
    <h1 className="font-bold text-[16px] pb-5">Set a new password</h1>
    <h2 className="text-[14px] font-semibold">New password</h2>
    <input type="password" className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2" placeholder="Enter new password" />
    <h2 className="text-[14px] font-semibold">Confirm password</h2>
    <input type="password" className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2" placeholder="Confirm password" />
    <button className="mt-4 p-2 bg-black text-white rounded">Save changes</button>

  </div>
}
