"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { useState } from "react";
import { data } from "../dashboard/page";
type Props = {
  user: data;
};
export default function PaymentDetails(props: Props) {
  const startYear = 1900;
  const endYear = 2025;
  // You can store the selected year in a state variable
  const [selectedYear, setSelectedYear] = useState<string>("");
  return (
    <div className="w-[650px] min-h-[250px] text-black gap-1 p-[24px] flex flex-col rounded-[9px] border-[#E4E4E7] border-[1px] ">
      <h1 className="font-bold text-[16px] pb-5">Payment details</h1>
      <h2 className="text-[14px] font-semibold">Select country</h2>
      <Select>
        <SelectTrigger className="w-[100%]">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Country</SelectLabel>
            <SelectItem value="United States">United States</SelectItem>
            <SelectItem value="Mongolia">Mongolia</SelectItem>
            <SelectItem value="Korea">Korea</SelectItem>
            <SelectItem value="Japan">Japan</SelectItem>
            <SelectItem value="China">China</SelectItem>
            <SelectItem value="Russia">Russia</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex justify-between">
        <h2 className="text-[14px] font-semibold flex flex-col">
          First name
          <input
            className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2 w-[292px]"
            type="name"
            placeholder="First name"
          />
        </h2>
        <h2 className="text-[14px] font-semibold flex flex-col">
          Last name
          <input
            className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2 w-[292px]"
            type="name"
            placeholder="Last name"
          />
        </h2>
      </div>
      <h2 className="text-[14px] font-semibold">Enter card number</h2>
      <input
        className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2"
        type="card-number"
        placeholder="XXXX-XXXX-XXXX-XXXX"
      />
      <div className="flex justify-between">
        <h2 className="text-[14px] font-semibold flex flex-col">
          Expires
          <Select>
            <SelectTrigger className="w-[192px]">
              <SelectValue placeholder="Month" />{" "}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Month</SelectLabel>
                <SelectItem value="January">January</SelectItem>
                <SelectItem value="February">February</SelectItem>
                <SelectItem value="March">March</SelectItem>
                <SelectItem value="April">April</SelectItem>
                <SelectItem value="May">May</SelectItem>
                <SelectItem value="June">June</SelectItem>
                <SelectItem value="July">July</SelectItem>
                <SelectItem value="August">August</SelectItem>
                <SelectItem value="September">September</SelectItem>
                <SelectItem value="October">October</SelectItem>
                <SelectItem value="November">November</SelectItem>
                <SelectItem value="December">December</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </h2>
        <h2 className="text-[14px] font-semibold flex flex-col">
          Year
          <Select
            value={selectedYear}
            onValueChange={(val) => setSelectedYear(val)}
          >
            <SelectTrigger className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2 w-[192px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: endYear - startYear + 1 }).map((_, i) => {
                const year = startYear + i;
                return (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </h2>
        <h2 className="text-[14px] font-semibold flex flex-col">
          CVC
          <input
            className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2 w-[192px]"
            type="number"
            placeholder="XXX"
          />
        </h2>
      </div>
      <button className="mt-4 p-2 bg-black text-white rounded">
        Save changes
      </button>
    </div>
  );
}
