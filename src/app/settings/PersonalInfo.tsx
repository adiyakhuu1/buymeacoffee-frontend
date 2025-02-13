"use client"
import { useState, useEffect } from "react";
import { response } from "../account/signin/page";

export default function PersonalInfo() {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    // const [responses, setResponse] = useState<response>({ message: "WAITING" });
    const [profileData, setProfileData] = useState([]);


    const localId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(`http://localhost:4000/profile/${localId}`);
            const data = await response.json();
            setProfileData(data)
        }
        fetchData()
    }, [])

    // const updatePassword = async () => {
    //     const response = await fetch(`http://localhost:4000/profile/${userId}`, {
    //         method: "POST",
    //     });
    //     const data = await response.json();
    // }
    // updatePassword()

    // const sendData = async () => {
    //     try {
    //         const send = await fetch(
    //             `${process.env.NEXT_PUBLIC_API_URL}/users/auth/sign-in`,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(login),
    //                 credentials: "include",
    //             }
    //         );
    //         const response = await send.json();
    //         setResponse(response);
    //         if (response.data.id) {
    //             localStorage.setItem("userId", response.data.id);
    //         }
    //         if (response.success) {
    //             if (response.profileSetup) {
    //                 router.push(`/dashboard`);
    //             } else {
    //                 router.push(`/profile-setup`);
    //             }
    //         }
    //     } catch (e) {
    //         console.error(e, "server hariu ogsongu");
    //         setResponse({ message: "SERVER_NOT_RESPONDING" });
    //         // setnoreponse(e.message);
    //     }
    // };


    useEffect(() => {
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(selectedImage);
            }
        };
    }, [selectedImage]);

    // console.log("ajksdhfakjhsd")

    return (
        <div>
            <div className="w-[650px] min-h-[570px] text-black gap-1 p-[24px] flex flex-col rounded-[9px] border-[#E4E4E7] border-[1px]">
                <h1 className="font-bold text-[16px] pb-5">Personal Info</h1>
                <h2 className="text-[14px] font-semibold">Add Photo</h2>
                <div className=" w-[160px] h-[160px] rounded-full bg-slate-700 relative mb-5">
                    <input
                        type="file"
                        accept="image/*"
                        className="opacity-0 w-[160px] h-[160px] rounded-full bg-slate-700 relative  p-2"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            setSelectedImage(file ? URL.createObjectURL(file) : undefined);
                        }}
                    />
                    {selectedImage && (
                        <div className="absolute left-0 top-0">
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="w-[160px] h-[160px] rounded-full bg-slate-700 object-cover border "
                            />
                        </div>

                    )}</div>
                <h2 className="text-[14px] font-semibold">Name</h2>
                <input type="text" className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2" placeholder="Name"  >{ }</input>
                <h2 className="text-[14px] font-semibold">About</h2>
                <textarea className="overflow rounded-[6px] border-[#E4E4E7] border-[1px] min-h-[100px] w-[600px] p-2 leading-6" placeholder={"I’m a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along."} />
                <h2 className="text-[14px] font-semibold">Social Media URL</h2>
                <input type="text" className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2" placeholder="https://buymeacoffee.com/baconpancakes1" />
                <button className="mt-4 p-2 bg-black text-white rounded">Save Changes</button>
            </div>
        </div>
    );
}
