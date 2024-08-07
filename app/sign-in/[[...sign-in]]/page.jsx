import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className=" flex flex-col h-[100vh] justify-center items-center">


    <SignIn />
    </div>
  );
}
