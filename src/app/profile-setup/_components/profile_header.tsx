import { Button } from "@/components/ui/button";
import Image from "next/image";

export const ProfileHeader = () => {
  return (
    <div className="flex justify-around">
      <div className="flex gap-2 items-center">
        <Image
          src={`/img/profile-page-header.svg`}
          alt="profile page logo"
          width={19}
          height={19}
        />
        <div className="font-bold">Buy Me Coffee</div>
      </div>
      <div>
        <Button className="bg-secondary text-foreground hover:text-background">
          Log out
        </Button>
      </div>
    </div>
  );
};
