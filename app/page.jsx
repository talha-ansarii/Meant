import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Banner from "@/components/homePage/Banner";
import Day from "@/components/homePage/Day";
import HeroSection from "@/components/homePage/HeroSection";
import Icons from "@/components/homePage/Icons";
import Night from "@/components/homePage/Night";
import Picture from "@/components/homePage/Picture";
import Marquee from "@/components/Marquee";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <div className="pt-[100px] pb-4">
        <HeroSection />
        <Day />
        <Night />
        <Marquee />
        <Picture />
        <Icons />
        <Banner />
        <Footer />
      </div>

    </Suspense>
    </div>
  );
}
