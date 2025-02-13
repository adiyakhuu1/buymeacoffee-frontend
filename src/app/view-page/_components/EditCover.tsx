"use client";

import { ChangeEvent, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CameraIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// type EditCoverProps = {

//   user: Props
// };

type user = {
  id: string;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage: null | string;
  successMessage: string;
  userId: string;
};
type Props = {
  setCount: Function;
  count: boolean;
  user: {
    profile?: user;
  };
};
export default function EditCover({ user, setCount, count }: Props) {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleCancelCover = () => {
    setEditing(false);
  };
  const imageInput = async (e: ChangeEvent<HTMLInputElement>) => {
    setEditing(true);
    setUploading(true);
    if (e.target.files) {
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setImagePreview(objectUrl);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "qjhhbr3k");
      const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, {
        method: "POST",
        body: formData,
      });
      const response = await res.json();
      setUploading(false);
      setImage(response.secure_url);
      console.log(response.secure_url);
    }
  };
  const sendImage = async () => {
    if (image) {
      const res = await fetch(
        `http://localhost:4000/profile/updateCover/${user.profile?.userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image }),
        }
      );
      const data = await res.json();
      setCount(!count);
      console.log(data);
    }
  };
  return (
    <div className="w-full bg-[#F4F4F5] h-[319px] flex items-center justify-center">
      {uploading ? (
        <div>
          {user.profile?.backgroundImage && (
            <div>
              <Image
                src={imagePreview}
                alt="Cover"
                className="absolute inset-0 w-full h-full object-cover"
                width={1400}
                height={400}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          {user.profile?.backgroundImage && (
            <Image
              src={user.profile?.backgroundImage}
              alt="Cover"
              className="absolute inset-0 w-full h-full object-cover"
              width={1400}
              height={400}
            />
          )}
        </div>
      )}

      {editing ? (
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            disabled={uploading}
            onClick={() => {
              sendImage();
              handleCancelCover();
            }}
            className="bg-black text-white"
          >
            {" "}
            {uploading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin" />{" "}
                <div>Uploading</div>
              </>
            ) : (
              `Save Changes`
            )}{" "}
          </Button>
          <Button onClick={handleCancelCover} variant="outline">
            Cancel
          </Button>
        </div>
      ) : (
        <label className="cursor-pointer absolute top-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70">
          <CameraIcon className="w-5 h-5 inline-block mr-2" />{" "}
          {user.profile?.backgroundImage ? "Change cover" : "Add a cover image"}
          <input
            type="file"
            accept="image/*"
            onChange={imageInput}
            className="hidden"
          />
        </label>
      )}
      {uploading && (
        <p className="absolute bottom-4 text-white text-sm">Uploading...</p>
      )}
    </div>
  );
}
