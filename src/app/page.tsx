import Image from "next/image";
import { useState } from "react";
import EditProfile from "./_components/EditProfile";
import SideBar from "./_components/SideBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loading } from "./_components/loading";

export default function Home() {
  return (
    <>
      <div className="bg-secondary">
        {/* Navigation */}
        <div className="flex justify-around p-3">
          <Image
            src={`/img/bmc-brand-logo.svg`}
            alt="logo"
            height={50}
            width={100}
          />

          <div className="flex gap-3">
            <Link href={`/account/signin`}>
              <Button className="p-2 rounded-full font-bold bg-background border-background hover:text-background">
                Log in
              </Button>
            </Link>
            <Link href={`/account/signup`}>
              <Button className="bg-yellow-400 p-2 rounded-full font-bold  hover:text-background">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
        {/* hero */}
        <div className="flex justify-center p-20">
          <div className="flex flex-col w-[40%] items-center gap-6">
            <div className="flex gap-2">
              <Image
                src={`/img/star-svgrepo-com.svg`}
                alt="star"
                width={24}
                height={24}
              />
              <Image
                src={`/img/star-svgrepo-com.svg`}
                alt="star"
                width={24}
                height={24}
              />
              <Image
                src={`/img/star-svgrepo-com.svg`}
                alt="star"
                width={24}
                height={24}
              />
              <Image
                src={`/img/star-svgrepo-com.svg`}
                alt="star"
                width={24}
                height={24}
              />
              <Image
                src={`/img/star-svgrepo-com.svg`}
                alt="star"
                width={24}
                height={24}
              />
              <div>Loved by 1,000,000+ creators</div>
            </div>
            <h1 className="font-bold text-[96px] text-center leading-none">
              Fund your creative work
            </h1>
            <p className=" text-xl text-center">
              Accept support. Start a membership. Setup a shop. It’s easier than
              you think.
            </p>
            <Link href={`/account/signup`}>
              <Button className="bg-yellow-400 rounded-full font-bold whitespace-nowrap p-9 text-xl">
                Start my page
              </Button>
            </Link>
            <p>It’s free and takes less than a minute!</p>
          </div>
        </div>
        {/* section */}
        <div className="flex justify-center">
          <div className="flex bg-background rounded-3xl flex-col w-[40%] items-center gap-6  p-20">
            <h1 className="text-gray-500">SUPPORT</h1>
            <h1 className="font-bold text-[64px] text-center leading-none">
              Give your audience an easy way to say thanks.
            </h1>
            <p className=" text-xl text-center">
              Buy Me a Coffee makes supporting fun and easy. In just a couple of
              taps, your fans can make the payment (buy you a coffee) and leave
              a message.
            </p>
          </div>
        </div>
        <div className="flex justify-center p-10">
          <footer>© Buy Me a Coffee</footer>
        </div>
      </div>
    </>
  );
}
