"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CameraIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
  profile: profile;
}
type profile = {
  id: string;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage: null | string;
  successMessage: string;
  userId: string;
};
export default function EditProfile({
  isOpen,
  onClose,
  profile,
}: EditProfileProps) {
  const [name, setName] = useState(profile.name);
  const [about, setAbout] = useState(profile.about);
  const [socialUrl, setSocialUrl] = useState(profile.socialMediaURL);
  const [image, setImage] = useState<string>("");
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

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
      setImage(response.secure_url);
      setLoading(true);
    }
  };
  const sendData = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          about,
          socialMediaURL: socialUrl,
          avatarImage: image,
        }),
      }
    );
    const respo = await res.json();
    setResponse(respo);
    // console.log(respo);
    setLoading(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[20px] text-[#09090B]">
            Edit profile
          </DialogTitle>
          <p className="text-[14px] text-[#71717A]">
            Make changes to your profile here. Click save when you're done.
          </p>
        </DialogHeader>

        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-300">
            {image ? (
              <Image src={image} width={100} height={100} alt={`pfp`} />
            ) : (
              <img
                src={`${profile.avatarImage}`}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
              <label className="cursor-pointer">
                <CameraIcon className="w-6 h-6 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          {loading && (
            <p className="text-sm text-gray-500 mt-2">Uploading...</p>
          )}
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            defaultValue={profile.name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-gray-200 outline-none"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">About</label>
          <textarea
            defaultValue={profile.about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-gray-200 outline-none"
            rows={3}
          ></textarea>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">Social media URL</label>
          <input
            type="text"
            defaultValue={profile.socialMediaURL}
            onChange={(e) => setSocialUrl(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-gray-200 outline-none"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <DialogClose asChild>
            <Button onClick={sendData} variant="outline">
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
