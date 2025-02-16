"use client";

import React, { useState } from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { CldImage } from "next-cloudinary";
import EditProfile from "@/app/_components/EditProfile";
import Image from "next/image";
import { donation } from "@/app/utils/types";
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
type Props = {
  user: {
    recievedDonations?: donation[];
    sendDonation?: donation[];
    profile?: profile;
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
      <div className="bg-background  border border-background  rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-300">
              {props.user.profile?.avatarImage ? (
                <Image
                  src={`${props.user.profile?.avatarImage}`}
                  width={100}
                  height={100}
                  alt={`pfp`}
                />
              ) : (
                <img
                  src="Profile.png"
                  className="w-full h-full object-cover"
                  alt="Profile"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center ">
                <label className="cursor-pointer">
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
              className="mt-4 px-4 py-2 bg-background  text-[#18181B] rounded-md"
            >
              Edit Page
            </button>
          )}
        </div>
        <div className="border-t border-background  my-4"></div>
        <div>
          <h2 className="text-lg font-semibold">
            About {props.user.profile?.name}
          </h2>
          <p className="text-gray-500">{props.user.profile?.about}</p>
        </div>
      </div>

      <div className="bg-background border border-background rounded-lg p-6">
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
      <div className="bg-background border border-background rounded-lg p-6 flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Recent Supporters</h3>
        {props.user.recievedDonations ? (
          <div className="">
            {props.user.recievedDonations?.length > 0 ? (
              <div className="flex gap-5 flex-col ">
                {props.user.recievedDonations.map((dono) => (
                  <div className="flex whitespace-nowrap gap-3" key={dono.id}>
                    <div>
                      <Image
                        src={`${dono.donor.profile.avatarImage}`}
                        alt="wait"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div>
                      <div className=" font-semibold">
                        {dono.donor.profile.name} bought {dono.amount}$ coffee
                      </div>
                      <div>{dono.specialMessage}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#E4E4E7] rounded-lg p-6 text-center">
                <p className="text-gray-500">
                  Be the first one to support Jake ❤️
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white border border-[#E4E4E7] rounded-lg p-6 text-center">
            <p className="text-gray-500">Be the first one to support Jake ❤️</p>
          </div>
        )}
      </div>
      {props.user.profile && (
        <EditProfile
          profile={props.user.profile}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
