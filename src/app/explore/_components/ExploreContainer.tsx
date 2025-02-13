"use client";
import { Button } from "@/components/ui/button";

import { Divide, ExternalLink, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "../../_customHooks/DebounceHook";
import { ProfileType } from "../../_typescript/ProfileType";
import { NoCreator } from "./NoCreator";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export const ExploreContainer = () => {
  const [ExploreData, setExploreData] = useState<ProfileType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const debounceSearch = useDebounce(searchValue);
  console.log(ExploreData);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:4000/profile/explore?search=${debounceSearch}`
      );
      const data = await response.json();
      setExploreData(data);
    };
    fetchData();
  }, [debounceSearch]);
  return (
    <div className="w-[80%]">
      <div className="text-[#18181B] text-[1.3rem] font-[600] pb-[24px]">
        Explore creators
      </div>
      <div className="pb-[24px] relative">
        <Input
          onChange={onChangeHandler}
          className="w-[243px] h-[36px] pl-[35px]"
          placeholder="Search name"
        />
        <Search className="absolute size-[16px] top-[10px] left-[12px] opacity-50" />
      </div>
      {ExploreData.length > 0 ? (
        ExploreData.map((item: ProfileType) => (
          <div
            key={`explore-${item?.id}`}
            className="border-solid border-[#E4E4E7] border-[1px] rounded-lg mb-[24px]"
          >
            <div className="p-[24px]">
              <div className="flex justify-between">
                <div className="flex items-center gap-3 pb-[12px]">
                  {item.avatarImage ? (
                    <Image
                      width={40}
                      height={40}
                      className="size-[40px] rounded-full border-solid border-[1px]"
                      src={`${item.avatarImage}`}
                      alt=""
                    />
                  ) : (
                    <Image
                      width={40}
                      height={40}
                      className="size-[40px] rounded-full border-solid border-[1px]"
                      src="ExploreUserLogo.png"
                      alt=""
                    />
                  )}

                  <div className="text-[#18181B] text-[1.3rem] font-[600]">
                    {item.name}
                  </div>
                </div>
                <div className="text-end ">
                  <Link href={`/${item.userId}`}>
                    <Button
                      variant={"outline"}
                      className="bg-gray-100 border-none w-[136px] h-[40px]  hover:text-white hover:bg-black"
                    >
                      View profile
                      <ExternalLink />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex ">
                <div>
                  <div className="text-[#18181B] text-[1rem] font-[600] pb-[12px]">
                    About {item?.name}
                  </div>
                  <div className="text-[14px] text-[#09090B] w-[80%]">
                    {item.about}
                  </div>
                </div>
                <div>
                  <div className="pb-[9px] text-[#18181B] text-[1rem] font-[600]  ">
                    Social media URL
                  </div>
                  <div className="text-[14px] pr-[150px] text-[#09090B]">
                    {item.socialMediaURL}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <NoCreator />
      )}
    </div>
  );
};
