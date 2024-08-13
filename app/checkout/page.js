"use client";

import Checkout from "@/components/Checkout";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ShippingForm from "@/components/ShippingForm";
import { getAllProducts, getCartProducts } from "@/utils/cartUtils";
import { RedirectToSignIn, SignedOut, SignedIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import sha256 from "crypto-js/sha256";
import { redirect } from "next/navigation";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const Page = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [orderId, setOrderId] = useState("");
  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
  const navigate = useRouter();

  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const cart = await getCartProducts();
      const products = await getAllProducts();
      if (cart && products) {
        const filteredProducts = products.filter((product) =>
          cart.some((cartItem) => cartItem.productId === product.id)
        );

        let total = 0;
        const productsWithQuantity = filteredProducts.map((product) => {
          const cartItem = cart.find((item) => item.productId === product.id);
          total += product.price * cartItem.quantity;

          return { ...product, quantity: cartItem?.quantity };
        });

        setCartProducts(productsWithQuantity);
        setCartTotal(total);
      }
    };

    fetchData();
  }, []);

  const createOrder = async (address) => {
    try {
      const data = await fetch("/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: cartTotal,
          currency: "INR",
          products: cartProducts.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
          address: address,
        }),
      });

      if (!data.ok) {
        const errorText = await data.text();
        console.log("Error response:", errorText);
        throw new Error("Network response was not ok");
      }

      const response = await data.json();
      const { order, success } = response;

      if (!success) {
        throw new Error("Failed to create order");
      }
      setOrderId(order?.id);

      return order;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  function generateRandomFiveDigitNumber() {
    // Generate a random number between 10000 and 99999
    const min = 10000;
    const max = 99999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  const createShiprocketOrder = async (paymentResponse, detail, id) => {
    try {
      const shiprocketOrder = {
        order_id: id,
        order_date: new Date().toISOString(),
        pickup_location: "Primary",
        billing_customer_name: detail?.firstName,
        billing_last_name: detail?.lastName,
        billing_address: detail?.address,
        billing_city: detail?.city,
        billing_pincode: detail?.pincode,
        billing_state: detail?.state,
        billing_country: "IN",
        billing_email: detail?.email,
        billing_phone: detail?.phone,
        shipping_is_billing: true,
        order_items: cartProducts.map((product) => ({
          name: product?.name,
          sku: generateRandomFiveDigitNumber(),
          units: product.quantity,
          selling_price: product.price,
        })),
        payment_method: "Prepaid",
        sub_total: cartTotal,
        length: 10,
        breadth: 15,
        height: 20,
        weight: 2.5,
      };
      console.log("Sending Shiprocket Order:", shiprocketOrder);

      const response = await fetch("/api/shiprocket/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shiprocketOrder),
      });

      console.log("Shiprocket Response Status:", response.status);
      console.log("Shiprocket Response Body:", await response.text());

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Shiprocket Error:", errorText);
        throw new Error("Failed to create Shiprocket order");
      }

      const responseData = await response.json();
      console.log("Shiprocket Order Created:", responseData);
    } catch (error) {
      console.log("Shiprocket Order Error:", error);
    }
  };

  const handlePayment = async (address) => {
    try {
      // Create the Razorpay order
      console.log(address);
      const order = await createOrder(address);
      if (!order) {
        throw new Error("Failed to create order");
      }

      // Set up the Razorpay payment options
      const options = {
        key: key,
        amount: cartTotal * 100,
        currency: "INR",
        name: "Meant",
        description: "Payment for your order",
        order_id: order.id,
        handler: async function (response) {
          // Handle successful payment
          await createShiprocketOrder(response, address, order.id); // Call Shiprocket order creation after successful payment
          navigate.push(
            `/order-confirm?payment_id=${response.razorpay_payment_id}`
          );
        },
        notes: {
          address: address,
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Open the Razorpay payment gateway
      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.error", function (response) {
        console.log(response);
        alert("Payment failed : " + response.error.description);
      });
      razorpay.open();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhonePePayment = async (address) => {

    const transactionid = "Tr-"+uuidv4().toString(36).slice(-6);

    const payload = {
        merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
        merchantTransactionId: transactionid,
        merchantUserId: user.id,
        amount: cartTotal * 100,
        redirectUrl: `http://localhost:3000/api/status/${transactionid}`,
        redirectMode: "POST",
        callbackUrl: `http://localhost:3000/api/status/${transactionid}`,
        mobileNumber: address.phone,
        paymentInstrument: {
          type: "PAY_PAGE",

        },
      };


      const dataPayload = JSON.stringify(payload);
      // console.log(dataPayload);

      const dataBase64 = Buffer.from(dataPayload).toString("base64");
      // console.log(dataBase64);


  const fullURL =
        dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
     const dataSha256 = sha256(fullURL);

      const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
      // console.log("c====",checksum);



    const UAT_PAY_API_URL =
    "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";


    const response = await fetch(UAT_PAY_API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
      },
      body: JSON.stringify({
        request: dataBase64,
      }),
    });
    
    const responseData = await response.json();
    // console.log(responseData);

    


  const redirect=response.data.data.instrumentResponse.redirectInfo.url;
  navigate.push(redirect)
  }


  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
      <div className="bg-black md:hidden lg:hidden block w-full h-[70px]">
        <Header />

      </div>
      <Header />
        <div className="w-full md:flex-row lg:flex-row flex-col flex bg-white ">
          <div className="lg:w-[50%] md:w-[50%] w-full">
            <ShippingForm handlePayment={handlePayment} />
          </div>
          <div className="lg:w-[50%] md:w-[50%] bg-[#CDC8C8] w-full">
            <Checkout
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              cartTotal={cartTotal}
              setCartTotal={setCartTotal}
            />
          </div>
        </div>
        <Footer />
      </SignedIn>
    </div>
  );
};

export default Page;
