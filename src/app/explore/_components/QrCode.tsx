
import Link from "next/link";
import { BsQrCode } from "react-icons/bs";

export function QrCode() {
  return (
    <div className=" flex justify-center items-center mt-[100px]">
            <div className="w-[428px] h-[484px] bg-white rounded-xl shadow-2xl pt-[150px] flex-col  border-2 flex justify-center items-center ">


                    <h2  className=" font-semibold text-3xl mt-[-200px]">Scan QR code</h2>
                    <p className="">Scan the QR code to complete your donation</p>

      <div className="flex justify-center items-center mb-6 mt-[40px]">
        <BsQrCode  className="text-black bg-white p-4  shadow-md w-[245px] h-[245px]" size={100}/>
      </div>

      <Link href="/dashboard">
        <p className="text-center text-pink-600 font-bold text-xl hover:text-pink-800 transition-colors duration-300">
          Buy Me Coffee
        </p>
      </Link>
    </div>

    </div>

  );
}

