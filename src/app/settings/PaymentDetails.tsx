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
import { ChangeEvent, useEffect, useState } from "react";
import { data } from "../dashboard/page";
import { country } from "../profile-setup/_components/profile_setup_form_step2";
import { bankcard } from "../utils/types";
import { Loading } from "../_components/loading";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { response } from "../account/signin/page";
import z from "zod";
type Props = {
  user: data;
};
type expiryDate = {
  day: string;
  month: number;
  year: number;
};
const formSchema = z.object({
  country: z.string(),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  cardNumber: z.string().min(16),
  expiryDate: z.date(),
  CVC: z.string().min(3).max(3),
});
export default function PaymentDetails(props: Props) {
  const { bankCard } = props.user.user;
  const [date, setDate] = useState<expiryDate>({
    day: "15",
    month: new Date(bankCard.expiryDate).getMonth() + 1,
    year: new Date(bankCard.expiryDate).getFullYear(),
  });
  const [countries, setCountries] = useState<country[]>([]);
  const [responses, setResponse] = useState<response>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const [form, setForm] = useState<bankcard>({
    country: bankCard.country ? bankCard.country : "Mongolia",
    firstName: bankCard.firstName,
    lastName: bankCard.lastName,
    cardNumber: bankCard.cardNumber,
    expiryDate: new Date(date.year + "-" + date.month + "-15"),
    CVC: bankCard.CVC,
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://restcountries.com/v3.1/all`);
      const data: country[] = await res.json();
      setCountries(data);
      // console.log(data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const result = formSchema.safeParse(form);
    if (result.success) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    // console.log(result);
  }, [form]);
  useEffect(() => {
    setForm((prev) => {
      return {
        ...prev,
        expiryDate: new Date(date.year + "-" + date.month + "-15"),
      };
    });
  }, [date]);
  const sendData = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bank-card`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
      }),
    });
    const response = await res.json();
    setResponse(response);
    setLoading(false);

    // console.log(response);
  };
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "month" || name === "year") {
      setForm(form);
      return;
    }
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // console.log(form);
  return (
    <div className="w-[650px] min-h-[250px] text-black gap-1 p-[24px] flex flex-col rounded-[9px] border-[#E4E4E7] border-[1px] ">
      <h1 className="font-bold text-[16px] pb-5">Payment details</h1>
      <div className="font-semibold ">
        {loading && <Loading />}
        <label htmlFor="countries">Select country</label>
        <select
          onChange={handleChange}
          defaultValue={"Mongolia"}
          name="country"
          id="countries"
          className="w-full border p-2 rounded-md"
        >
          {countries &&
            countries.map((country: country) => (
              <option key={country.cca2} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
        </select>
      </div>
      <div className="flex justify-between">
        <h2 className="text-[14px] font-semibold flex flex-col">
          First name
          <input
            defaultValue={`${props.user.user.bankCard.firstName}`}
            onChange={handleChange}
            className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2 w-[292px]"
            type="name"
            name="firstName"
            placeholder="First name"
          />
        </h2>
        <h2 className="text-[14px] font-semibold flex flex-col">
          Last name
          <input
            defaultValue={`${props.user.user.bankCard.lastName}`}
            onChange={handleChange}
            name="lastName"
            className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2 w-[292px]"
            type="name"
            placeholder="Last name"
          />
        </h2>
      </div>
      <h2 className="text-[14px] font-semibold">Enter card number</h2>
      <input
        onChange={handleChange}
        name="cardNumber"
        className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2"
        type="card-number"
        defaultValue={`${props.user.user.bankCard.cardNumber}`}
        placeholder="XXXX-XXXX-XXXX-XXXX"
      />
      <div className="flex justify-between">
        <div className="flex flex-col">
          <label htmlFor="month">Month</label>
          <select
            defaultValue={`${new Date(bankCard.expiryDate).getMonth() + 1}`}
            onChange={(e) => {
              setDate((prev) => {
                return {
                  ...prev,
                  month: Number(e.target.value),
                };
              });
              handleChange(e);
            }}
            name="month"
            id="month"
            className="border p-2 w-40 rounded-lg"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="year">Year</label>
          <select
            defaultValue={`${new Date(bankCard.expiryDate).getFullYear()}`}
            onChange={(e) => {
              setDate((prev) => {
                return {
                  ...prev,
                  year: Number(e.target.value),
                };
              });
              handleChange(e);
            }}
            name="year"
            id="year"
            className="border p-2 w-40 rounded-lg"
          >
            {years.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <h2 className="text-[14px] font-semibold flex flex-col">
          CVC
          <input
            onChange={handleChange}
            defaultValue={`${props.user.user.bankCard.CVC}`}
            name="CVC"
            className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2 w-[192px]"
            type="text"
            placeholder="XXX"
          />
        </h2>
      </div>
      <Button
        disabled={loading || isValid}
        onClick={sendData}
        className=" text-background  mt-2"
      >
        {loading ? (
          <div className="flex items-center gap-4">
            <div>Saving</div>
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
        ) : (
          <div>Save changes</div>
        )}
      </Button>
      {responses?.code && (
        <div className={`${responses.success && `text-green-500`}`}>
          {responses.message}
        </div>
      )}
    </div>
  );
}
