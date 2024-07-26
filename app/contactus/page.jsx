import Image from "next/image";
import styles from "./styles.module.css";
import ContactUs from "@/components/ContactUs";
import Header from "@/components/Header";

export default function Page() {
  return (
    <div className="">
     <Header/>
     <div className="w-full h-[86px] bg-black" ></div>

      <main className="">
        <ContactUs />
      </main>
    </div>
  );
}