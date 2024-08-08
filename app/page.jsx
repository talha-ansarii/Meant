"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Banner from "@/components/homePage/Banner";
import Day from "@/components/homePage/Day";
import HeroSection from "@/components/homePage/HeroSection";
import Icons from "@/components/homePage/Icons";
import Night from "@/components/homePage/Night";
import Picture from "@/components/homePage/Picture";
import Marquee from "@/components/Marquee";
import PasswordProtection from "@/components/PasswordProtection";
import VideoLoader from "@/components/VideoLoader";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  // const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/get-products");
        const data = await response.json();
        setProducts(data);
  
        // console.log("Fetched products:", data);
  
      
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  
  // if (password !== '1234') {
  //   return <PasswordProtection password={password} setPassword={setPassword} />;
  // }
    
  return (
    <div>
      <Suspense
        fallback={
          <div className="w-[100vw] h-[100vh] flex justify-center items-center  ">
            <VideoLoader />
          </div>
        }
      >
        <Header />
        <div className="pt-[100px] pb-4">
          <HeroSection />
          <Day products={products} />
          <Night products={products} />
          <Picture />
          <Icons />
          <Banner />
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}
