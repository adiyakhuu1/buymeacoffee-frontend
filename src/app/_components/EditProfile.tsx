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
import { CldImage } from "next-cloudinary";

interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfile({ isOpen, onClose }: EditProfileProps) {
  const [name, setName] = useState("Jake");
  const [about, setAbout] = useState(
    "I'm a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along."
  );
  const [socialUrl, setSocialUrl] = useState(
    "https://buymeacoffee.com/baconpancakes1"
  );
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setImage(data.secure_url);
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setLoading(false);
    }
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
              <CldImage
                width="96"
                height="96"
                src={image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <img src="Profile.png" className="w-full h-full object-cover" />
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-gray-200 outline-none"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-gray-200 outline-none"
            rows={3}></textarea>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">Social media URL</label>
          <input
            type="text"
            value={socialUrl}
            onChange={(e) => setSocialUrl(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-gray-200 outline-none"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
