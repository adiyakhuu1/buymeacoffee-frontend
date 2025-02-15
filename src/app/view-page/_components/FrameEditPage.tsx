"use client";

import { useState } from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { CldImage } from "next-cloudinary";
import EditProfile from "@/app/_components/EditProfile";
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
  user: {
    profile?: user;
  };
  owner?: boolean;
};
export default function FrameEditPage(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [about, setAbout] = useState(
    "I'm a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along."
  );

  return (
    <div className="max-w-[632px]">
      <div className="bg-white border border-[#E4E4E7] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-300">
              {image ? (
                <CldImage
                  width="64"
                  height="64"
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="Profile.png"
                  className="w-full h-full object-cover"
                  alt="Profile"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
                <label className="cursor-pointer">
                  <CameraIcon className="w-6 h-6 text-white" />
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>
            </div>
            <h1 className="text-xl font-semibold">
              {props.user.profile?.name}
            </h1>
          </div>
          {props.owner && (
            <button
              onClick={() => setIsOpen(true)}
              className="mt-4 px-4 py-2 bg-[#F4F4F5] text-[#18181B] rounded-md"
            >
              Edit Page
            </button>
          )}
        </div>
        <div className="border-t border-[#E4E4E7] my-4"></div>
        <div>
          <h2 className="text-lg font-semibold">
            About {props.user.profile?.name}
          </h2>
          <p className="text-gray-500">{props.user.profile?.about}</p>
        </div>
      </div>

      <div className="bg-white border border-[#E4E4E7] rounded-lg p-6">
        <h2 className="text-lg font-semibold">
          {props.user.profile?.socialMediaURL}
        </h2>
        <a
          href={props.user.profile?.socialMediaURL}
          target="_blank"
          className="text-blue-500"
        >
          {props.user.profile?.socialMediaURL}
        </a>
      </div>

      {/* Supporters Section */}
      <div className="bg-white border border-[#E4E4E7] rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold">Recent Supporters</h3>
        <div className="bg-white border border-[#E4E4E7] rounded-lg p-6 text-center">
          <p className="text-gray-500">Be the first one to support Jake ❤️</p>
        </div>
      </div>

      <EditProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
