"use client"
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PastOrders from "@/components/PastOrders";
import { useEffect } from "react";


const handleConfetti = () => {
  confetti({
    particleCount: 300,
    spread: 90,
    origin: { x: 1, y: 0.9 },
  });

  confetti({
    particleCount: 300,
    spread: 90,
    origin: { x: 0, y: 0.9 },
  });
};

const PastOrdersPage = () => {

  useEffect(() => {
    handleConfetti();
  }, []);
  return (
    <div>

       <div className="bg-black md:hidden lg:hidden block w-full h-[100px]">
        <Header />

      </div>
      <Header />
      <main className="flex w-full m-auto lg:mt-[120px] md:mt-[120px] justify-center items-center">
        <PastOrders />
      </main>
      <Footer />
    </div>
  );
};

export default PastOrdersPage;
