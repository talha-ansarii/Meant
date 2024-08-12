"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import OrderConfirm from "@/components/OrderConfirm";
import { use, useEffect, useState } from "react";
import Confetti from 'confetti-react';
export default function OrderConfirmPage() {

  const [isConfetti, setIsConfetti] = useState(1)

  useEffect(() => {
   const int = setInterval(() => {
      setIsConfetti(prev => prev - 0.1)
    }, 700);

    console.log(isConfetti)

    if (isConfetti < 0) {
      clearInterval(int);
    }

    return () => clearInterval(int);
  }, [isConfetti]);





  return (
    <div className="">
    <div style={{
      opacity: isConfetti
    }} >
    
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={200}
      onConfettiComplete={() => setIsConfetti(false)}
    />
    </div>
      
      <div className="bg-black w-full h-[100px]">
        <Header />
      </div>

      <main className="lg:pt-[80px] pt-[80px] bg-white md:pt-[80px] pb-12 ">
        <OrderConfirm />
      </main>
      <Footer />
    </div>
  );
}
