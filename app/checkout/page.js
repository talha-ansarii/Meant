import Checkout from "@/components/Checkout";
import Header from "@/components/Header";
import ShippingForm from "@/components/ShippingForm";
import React from "react";

const page = () => {
  return (
    <div>
    <Header/>
    <div className="w-full flex bg-white ">
      <div className="w-[50%]">
        <ShippingForm />
      </div>
      <div className="w-[50%]">
        <Checkout />
      </div>
    </div>

    </div>
  );
};

export default page;
