import { data } from "../dashboard/page";

type Props = {
  user: data;
};
export default function SuccessPage(props: Props) {
  return (
    <div className="w-[650px] min-h-[250px] text-black gap-1 p-[24px] flex flex-col rounded-[9px] border-[#E4E4E7] border-[1px] ">
      <h1 className="font-bold text-[16px] pb-5">Success page</h1>
      <h2 className="text-[14px] font-semibold">Confirmation message</h2>
      <textarea
        className="rounded-[6px] border-[#E4E4E7] border-[1px] min-h-[100px]"
        placeholder="Thank you for supporting me! It means lot to have your support. it's a step toward creating a more inclusive and accepting community of artists."
      />
      <button className="mt-4 p-2 bg-black text-white rounded">
        Save changes
      </button>
    </div>
  );
}
