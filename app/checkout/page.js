import Checkout from "@/components/Checkout";
import ShippingForm from "@/components/ShippingForm";
import React from "react";

const page = () => {
  return (
    <div className="w-full flex bg-white ">
      <div className="w-[50%]">
        <ShippingForm />
      </div>
      <div className="w-[50%]">
        <Checkout />
      </div>
    </div>
  );
};

export default page;
