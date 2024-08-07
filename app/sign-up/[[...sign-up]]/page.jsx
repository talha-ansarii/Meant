import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="overflow-x-hidden flex flex-col justify-center items-center">
      <SignUp />
    </div>
  );
}
