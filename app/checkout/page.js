import Checkout from "@/components/Checkout";
import Header from "@/components/Header";
import ShippingForm from "@/components/ShippingForm";
import { RedirectToSignIn, SignedOut, SignedIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div>
    <Header/>
    <SignedOut>
            <RedirectToSignIn  />
    </SignedOut>

    <SignedIn>

    <div className="w-full flex bg-white ">
      <div className="w-[50%]">
        <ShippingForm />
      </div>
      <div className="w-[50%]">
        <Checkout />
      </div>
    </div>
    </SignedIn>

    </div>
  );
};

export default page;
