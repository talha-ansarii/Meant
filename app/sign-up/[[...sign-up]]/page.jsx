import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="overflow-x-hidden flex py-[30px] flex-col justify-center items-center">
      <SignUp />
    </div>
  );
}
