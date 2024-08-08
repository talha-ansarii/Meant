"use client";
import Checkout from "@/components/Checkout";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ShippingForm from "@/components/ShippingForm";
import { getAllProducts, getCartProducts } from "@/utils/cartUtils";
import { RedirectToSignIn, SignedOut, SignedIn } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import Script from "next/script";
import React, { useEffect, useState } from "react";

const page = () => {
  const [add, setAdd] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [orderId, setOrderId] = useState("");
  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
  const navigate = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const cart = await getCartProducts();
      const products = await getAllProducts();
      // console.log(cart)
      // console.log(products)
      if (cart && products) {
        // Filter products that are in the cart
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

  const createOrder = async () => {
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
          address: add,
        }),
      });
      // console.log(data)

      if (!data.ok) {
        const errorText = await data.text();
        console.log("Error response:", errorText);
        throw new Error("Network response was not ok");
      }

      const response = await data.json();
      console.log(response);
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

  const handlePayment = async () => {
    try {
      const order = await createOrder(); // Replace with your server endpoint to create an order
      if (!order) {
        throw new Error("Failed to create order");
      }

      const options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: cartTotal * 100, // Amount is in paise
        currency: "INR",
        name: "Meant",
        description: "Payment for your order",
        order_id: order.id,

        handler: function (response) {
            console.log(response)
          
        navigate.push(`/order-confirm?payment_id=${response.razorpay_payment_id}`);

        },
        notes: {
          address: "Meant pvt ltd",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);

      

      razorpay.on("payment.error", async function (response) {
        console.log(response)
        alert("Payment failed : " + response.error.description);
      });

      razorpay.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <Header />
        <div className="w-full flex bg-white ">
          <div className="w-[50%]">
            <ShippingForm
              handlePayment={handlePayment}
              setAdd={setAdd}
              add={add}
            />
          </div>
          <div className="w-[50%]">
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

export default page;
