import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Half() {
  return (
    <div className="min-h-screen w-1/2 fixed top-0 left-0 bg-amber-400">
      <div className="flex justify-start p-10 pl-32">
        <div className="flex gap-2 items-center">
          <Image
            src={`/img/profile-page-header.svg`}
            alt="profile page logo"
            width={19}
            height={19}
          />
          <div className="font-bold">Buy Me Coffee</div>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center min-h-screen justify-center gap-3 transform -translate-y-24">
          <div className="w-60 h-60 rounded-full flex justify-center items-center ">
            <Image
              alt="coffeee pic"
              width={250}
              height={200}
              src={`/img/coffee.svg`}
            />
          </div>
          <div className="w-[455px] text-center flex flex-col content-center gap-2">
            <h1 className="font-bold text-2xl">Fund your creative work</h1>
            <p className="">
              Accept support. Start a membership. Setup a shop. It's easier than
              you think
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
