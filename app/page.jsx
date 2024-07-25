<<<<<<< HEAD
import React from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <main>
        <ProductList />
      </main>
      <Footer />
    </div>
  );
=======
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Banner from "@/components/homePage/Banner";
import HeroSection from "@/components/homePage/HeroSection";
import Icons from "@/components/homePage/Icons";
import Picture from "@/components/homePage/Picture";
import Marquee from "@/components/Marquee";

export default function Home() {
 

  return (
    <div>
    {/* <Header/> */}
    <HeroSection/>
    <Marquee/>
    <Picture/>
    <Icons/>
    <Banner/>
    <Footer/>
    
      
    </div>
  )
>>>>>>> talha/main
}
