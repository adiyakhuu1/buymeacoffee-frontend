"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { UserInfoForm } from "../../utils/types";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { z } from "zod";

const forSchema = z.object({
  name: z.string().min(6),
  about: z.string().min(15),
  socialMediaURL: z.string().url(),
  avatarImage: z.string().url(),
});
export default function ProfileSetup1() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [check, setCheck] = useState<boolean>(false);
  const [isValid, setValid] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    errors: {
      name: boolean;
      about: boolean;
      socialMediaURL: boolean;
      avatarImage: boolean;
    };
  }>({
    success: false,
    errors: {
      name: false,
      about: false,
      socialMediaURL: false,
      avatarImage: false,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [form, setForm] = useState<UserInfoForm>({
    name: "",
    about: "",
    socialMediaURL: "",
    avatarImage: "",
  });
  // let errors = {
  //   name: false,
  //   about: false,
  //   socialMediaURL: false,
  //   avatarImage: false,
  // };
  useEffect(() => {
    const step1String = localStorage.getItem("step1");
    const step1 = step1String ? JSON.parse(step1String) : "";
    if (step1) {
      setForm(step1);
    }
    // if()
  }, []);
  const handleForm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const field = e.target.name;
    setForm((prev) => {
      return { ...prev, [field]: value };
    });
  };

  useEffect(() => {
    setLoading(true);
    let interval = setTimeout(() => {
      localStorage.setItem("step1", JSON.stringify(form));
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(interval);
    };
  }, [form]);

  useEffect(() => {
    const result = forSchema.safeParse(form);
    if (result.success) {
      setValid(true);
      setValidationResult({
        success: true,
        errors: {
          name: false,
          about: false,
          socialMediaURL: false,
          avatarImage: false,
        },
      });
    } else {
      setValid(false);
      const errors = result.error.formErrors.fieldErrors;
      setValidationResult({
        success: false,
        errors: {
          name: !!errors.name,
          about: !!errors.about,
          socialMediaURL: !!errors.socialMediaURL,
          avatarImage: !!errors.avatarImage,
        },
      });
    }
    // console.log(validationResult);
  }, [form]);

  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const imageInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "qjhhbr3k");
      const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, {
        method: "POST",
        body: formData,
      });
      const response = await res.json();
      setForm((prev) => {
        return {
          ...prev,
          avatarImage: response.secure_url,
        };
      });
      // console.log(form);
    }
  };
  // useEffect(() => {
  //   isValid;
  // }, [form]);
  return (
    <div className="w-[510px] h-[631px] flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Complete your profile page</h1>
        {loading && (
          <div className="flex items-center gap-2">
            Saving...
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
        )}
        <button
          onClick={() => {
            setForm({
              name: "",
              about: "",
              socialMediaURL: "",
              avatarImage: "",
            });
          }}
        >
          Reset
        </button>
      </div>
      <div className="flex flex-col w-40 h-48">
        {!form.avatarImage ? (
          <div className="font-semibold">
            <div
              onClick={() => {
                handleInput();
              }}
              className={`border w-40 h-40 rounded-full content-center text-center border-dashed 
            }`}
            >
              Add image
            </div>
            {form.avatarImage && (
              <div className="text-red-500 whitespace-nowrap">
                {validationResult.errors.avatarImage && (
                  <p>Please upload profile picture!</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <>
            <Image
              src={form.avatarImage}
              onClick={() => {
                handleInput();
              }}
              className={`w-40 h-40 rounded-full content-center text-center`}
              alt="pfp"
              width={160}
              height={160}
            />
          </>
        )}

        <input
          className="hidden"
          onChange={(e) => {
            imageInput(e);
          }}
          type="file"
          ref={inputRef}
        />
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col  font-semibold">
          <label htmlFor="">Name</label>
          <Input
            onChange={handleForm}
            name="name"
            defaultValue={form.name}
            placeholder="Enter your name here"
            className={`h-10 `}
          />
          {form.name && (
            <div className="text-red-500">
              {validationResult.errors.name && !isValid && (
                <p>username must be 8+ characters!</p>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col font-semibold">
          <label htmlFor="">About</label>
          <Textarea
            onChange={handleForm}
            name="about"
            defaultValue={form.about}
            className={`border h-[130px] `}
            placeholder="Write about yourself here"
          />
          {form.about && (
            <div className="text-red-500">
              {validationResult.errors.about && (
                <p>Please enter info about yourself! 15+ characters needed</p>
              )}
            </div>
          )}
        </div>
        <div className="font-semibold">
          <label htmlFor="">Social media URL</label>
          <Input
            className={``}
            onChange={handleForm}
            name="socialMediaURL"
            defaultValue={form.socialMediaURL}
            placeholder="https://"
          />
          {form.socialMediaURL && (
            <div className="text-red-500">
              {validationResult.errors.socialMediaURL && (
                <p>Please enter a valid social link!</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        {/* <Link
          onClick={(e) => {
            if (validate() && !loading) {
              setCheck(false);
              console.log("validate", validate());
              console.log("loading", loading);
              console.log("working");
              console.log(errors);
            } else {
              e.preventDefault();
              setCheck(true);
              console.log("validate", validate());
              console.log("loading", loading);
              console.log("pervented");
              console.log(errors);
            }
          }}
          href={`/profile?step=2`}
          className={`w-[236px] ${
            !validate()
              ? `bg-muted cursor-not-allowed`
              : `bg-foreground text-background`
          }`}
        > */}
        <Button
          className={`w-[236px] ${
            !isValid
              ? `text-background cursor-not-allowed hover:text-background hover:bg-muted-foreground`
              : `bg-foreground text-background`
          }`}
          disabled={!isValid || loading}
          onClick={(e) => {
            if (isValid && !loading) {
              setCheck(false);
              router.push(`/profile-setup?step=2`);
            } else {
              e.preventDefault();
              setCheck(true);
            }
          }}
        >
          Continue
        </Button>
        {/* </Link> */}
      </div>
    </div>
  );
}
