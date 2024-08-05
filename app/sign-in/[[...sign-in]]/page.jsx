import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SignIn } from "@clerk/nextjs";
import { dark } from '@clerk/themes';

export default function Page() {
  return (
    <div className=" flex flex-col justify-center items-center">
    <Header/>
    <div className="mt-[110px] mb-[50px]">

    <SignIn />
    </div>
    <Footer/>
    </div>
  );
}