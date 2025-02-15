"use client";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { data } from "../dashboard/page";
import z from "zod";
import { UserInfoForm } from "../utils/types";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type Props = {
  user: data;
};
const forSchema = z.object({
  name: z.string().min(6),
  about: z.string().min(15),
  socialMediaURL: z.string().url(),
  avatarImage: z.string().url(),
});
export default function PersonalInfo({ user }: Props) {
  const [avatarImage, setSelectedImage] = useState<string>(
    user.user.profile.avatarImage
  );
  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState(true);
  const [response, setResponse] = useState();
  const [changed, setChanged] = useState<UserInfoForm>(user.user.profile);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  useEffect(() => {
    const result = forSchema.safeParse(changed);
    if (result.success) {
      setValid(false);
    } else {
      setValid(true);
    }
    console.log(isValid, result.success);
  }, [changed]);
  const imageInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "qjhhbr3k");
      const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, {
        method: "POST",
        body: formData,
      });
      const response = await res.json();
      setSelectedImage(response.secure_url);
    }
  };
  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setChanged((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log("changed", changed);
  };
  const sendData = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/update`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          avatarImage: avatarImage,
          name: changed.name,
          about: changed.about,
          socialMediaURL: changed.socialMediaURL,
        }),
      }
    );
    const resp = await res.json();
    setResponse(resp);
    setLoading(false);
    console.log(resp);
  };
  return (
    <div>
      <div className="w-[650px] min-h-[570px] text-black gap-1 p-[24px] flex flex-col rounded-[9px] border-[#E4E4E7] border-[1px]">
        <h1 className="font-bold text-[16px] pb-5">Personal Info</h1>
        <h2 className="text-[14px] font-semibold">Add Photo</h2>
        <div className=" w-[160px] h-[160px] rounded-full bg-slate-700 relative mb-5">
          <input
            name="socialMediaURL"
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={imageInput}
          />
          {user.user.profile.avatarImage && (
            <div onClick={handleClick} className="absolute left-0 top-0">
              {avatarImage ? (
                <img
                  src={avatarImage}
                  alt="Selected"
                  className="w-[160px] h-[160px] rounded-full bg-slate-700 object-cover border "
                />
              ) : (
                <img
                  src={user.user.profile.avatarImage}
                  alt="Selected"
                  className="w-[160px] h-[160px] rounded-full bg-slate-700 object-cover border "
                />
              )}
            </div>
          )}
        </div>
        <h2 className="text-[14px] font-semibold">Name</h2>
        <input
          defaultValue={user.user.profile.name}
          onChange={onChange}
          type="text"
          name="name"
          className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2"
          placeholder="Name"
        />
        <h2 className="text-[14px] font-semibold">About</h2>
        <textarea
          onChange={onChange}
          defaultValue={user.user.profile.about}
          name="about"
          className="overflow rounded-[6px] border-[#E4E4E7] border-[1px] min-h-[100px] w-[600px] p-2 leading-6"
          placeholder={
            "I’m a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along."
          }
        />
        <h2 className="text-[14px] font-semibold">Social URL</h2>
        <input
          onChange={onChange}
          defaultValue={user.user.profile.socialMediaURL}
          name="socialMediaURL"
          type="text"
          className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2"
          placeholder="https://buymeacoffee.com/baconpancakes1"
        />
        <Button
          onClick={() => {
            console.log("still working");
            sendData();
          }}
          disabled={isValid || loading}
          className="mt-4 p-2 text-background"
        >
          {loading ? (
            <div className="flex gap-2">
              <div>Please Wait</div>

              <AiOutlineLoading3Quarters className="animate-spin" />
            </div>
          ) : (
            `Save Changes`
          )}
        </Button>
      </div>
    </div>
  );
}
