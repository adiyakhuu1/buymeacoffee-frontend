import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
type user = {
  id: string;
  email: string;
  username: string;
  bankCard: string;
  profile: {
    id: string;
    name: string;
    about: string;
    avatarImage: string;
    socialMediaURL: string;
    backgroundImage: null | string;
    successMessage: string;
    userId: string;
  };
};
export function DonationComplete(props: { user: user }) {
  return (
    <div className="flex flex-col gap-20 h-64 w-1/2 bg-background rounded-lg">
      <div className="whitespace-nowrap items-center flex flex-col gap-5">
        <div className=" content-center justify-items-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex justify-center items-center">
            <Image
              src={`/img/check-circle-2.svg`}
              width={30}
              height={30}
              alt="checkmark"
              className=""
            />
          </div>
          <div>Donation complete</div>
        </div>
        <div className=" whitespace-nowrap w-1/2 justify-start flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Image
              src={`${props.user.profile.avatarImage}`}
              width={40}
              height={40}
              alt="avatar"
            />
            <h1 className="font-bold">{props.user.profile.name}:</h1>
          </div>
          <p>"{props.user.profile.successMessage}"</p>
        </div>
        <div>
          <Link href={`/explore`}>
            <Button className="text-background">Explore</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
