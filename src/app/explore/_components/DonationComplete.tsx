
import { Navigation } from "../../_components/Navigation"
import { FaRegCircleCheck } from "react-icons/fa6";
import { NavigationProfile } from "../../_components/NavigationProfile";
import Link from "next/link";


export function DonationComplete () {
    return (
        <div className="">
           <NavigationProfile/>
           <div className="flex justify-center  items-center mt-[133px]">

            <div className="w-[696px] h-[311px] p-[24px]">
                <div className="w-[648px] h-[108px] pl-[24px]">
                    
                    <div className="w-[64px] h-[64px] rounded-full bg-[#18BA51] ml-[280px] mr-[292px]">
                        <div className=" text-white pt-[2px]">
                        <FaRegCircleCheck className="w-[29px] h-[29px] m-[17px] "/> 
                        <div className="pr-[-50px]">
                        <p className=" w-[448px] h-[24px] font-semibold text-base text-black ml-[-40px] pt-[20px]">Donation Complete !</p>
                        </div>

                        </div>
                    </div>
                </div >
                    <div className="border-[#E4E4E7] border rounded-md h-[140px] mt-[24px] w-[510px] ml-[93px]">
                        <div className="flex pl-[12px] pt-[8px] pb-[8px] gap-[8px]">
                        <img src="SpaceRangerAvatar.png" alt="" className="w-[32px] h-[32px]" />
                        <p className="font-medium text-sm pt-[6px]">Space Ranger:</p>

                        </div>
                        <p className="font-normal text-sm pl-[12px]  ">Thank you for supporting me! It means a lot to have your support. It’s a step toward creating a more inclusive and accepting community of <br /> artists.</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                   <Link href="/explore">
                      <button className="bg-black text-white w-[148px] h-[40px] rounded-md mt-[40px] ml-[30px] hover:bg-gray-800">Return to explore</button>
                   </Link>

            </div>
           </div>

    )
}