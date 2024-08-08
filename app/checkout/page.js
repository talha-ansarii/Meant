"use client";

import Checkout from "@/components/Checkout";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ShippingForm from "@/components/ShippingForm";
import { getAllProducts, getCartProducts } from "@/utils/cartUtils";
import { RedirectToSignIn, SignedOut, SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Script from "next/script";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [add, setAdd] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [orderId, setOrderId] = useState("");
  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
  const navigate = useRouter();

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

  const createShiprocketOrder = async (paymentResponse) => {
   
 try { 
      const shiprocketOrder = {
        order_id: "ORD1215679",
        order_date: "2024-08-08T10:00:00Z",
        pickup_location: "Primary",
        billing_customer_name: "Abid",
        billing_last_name: "Doe",
        billing_address: "123 Elm Street",
        billing_address_2: "Apt 4B",
        billing_pincode: "560001",
        billing_state: "Karnataka",
        billing_country: "IN",
        billing_email: "john.doe@example.com",
        billing_phone: "9876543210",
        shipping_is_billing: true,
        order_items: [
          {
            name: "Product 1",
            sku: "PROD123",
            units: 2,
            selling_price: 500,
          },
        ],
        payment_method: "Prepaid",
        sub_total: 2500,
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

  const handlePayment = async () => {
    try {
      // Create the Razorpay order
      const order = await createOrder();
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
          console.log(response);
          await createShiprocketOrder(response); // Call Shiprocket order creation after successful payment
          navigate.push(
            `/order-confirm?payment_id=${response.razorpay_payment_id}`
          );
        },
        notes: {
          address: "Meant pvt ltd",
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
              setAdd={setAdd}
              add={add}
              handlePayment={handlePayment}
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

export default Page;
