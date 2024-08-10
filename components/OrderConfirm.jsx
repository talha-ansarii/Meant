"use client";

import { getAllProducts } from "@/utils/cartUtils";
import { getOrderByRazorpayPaymentId } from "@/utils/OrdersUtils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";


const productShades = [
  
    ["#A32C42", "#663024", "#AD5B55", "#995A60"],
    
  
 
    ["#3B1A12", "#6B1227", "#A10303", "#963039"],
    
  
];



const OrderConfirm = () => {
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const searchParams = useSearchParams();

  const payment_id = searchParams.get("payment_id");
  // console.log(payment_id);

  useEffect(() => {
    const handleGetOrder = async (razorpayPaymentId) => {
      try {
        const fetchedOrder = await getOrderByRazorpayPaymentId(
          razorpayPaymentId
        );
        setOrder(fetchedOrder);
        // console.log(fetchedOrder);
      } catch (error) {
        console.log("Failed to fetch order", error);
      }
    };
    handleGetOrder(payment_id);
  },[]);

  // console.log(order);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cart = order?.products || [];
        const products = await getAllProducts();

        console.log("Cart:", cart);
        console.log("Products:", products);

        if (cart?.length && products?.length) {
          // Filter products that are in the cart
          const filteredProducts = products?.filter((product) =>
            cart?.some((cartItem) => cartItem.productId == product.id)
          );

          console.log("Filtered Products:", filteredProducts);

          let total = 0;
          const productsWithQuantity = filteredProducts.map((product) => {
            const cartItem = cart.find((item) => item.productId == product.id);
            total += product.price * (cartItem?.quantity || 0);

            return { ...product, quantity: cartItem?.quantity || 0 };
          });

          console.log("Products with Quantity:", productsWithQuantity);
          console.log("Total:", total);

          setProducts(productsWithQuantity);
          setTotal(total);
        } else {
          console.log("No products in cart or product list is empty.");
          setProducts([]);
          setTotal(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [order?.products]);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  }




  return (
    <div className="bg-white   w-full mb-12">
      <div className="bg-white p-4 my-12 w-[312px] h-[353px] md:w-[745px] md:h-[407px] text-black flex flex-col justify-evenly items-center m-auto border-[2px] border-black">
        <div className="playfair font-[700] text-[24px] md:text-[36px] lg:text-[40px] leading-[31px] text-center ">
          THANK YOU FOR YOUR ORDER!
        </div>
        <div className="playfair font-[700] text-[14px] md:text-[18px] lg:text-[20px] lg:leading-[25px] leading-[17px] md:leading-[22px] text-center px-6 ">
          We are getting started on your order right away, and you will receive
          an order confirmation email shortly.{" "}
        </div>
        <button className="bg-black w-[184px] h-[38px] md:w-[239px] md:h-[38px] rounded-[34px] font-poppins text-white font-[600] text-[12px] md:text-[16px] leading-[18px] text-center mt-4 p-2">
          View Order Confirmation
        </button>
        <div className="font-merriweather font-[400] text-[10px] md:text-[11px] leading-[12px] underline-offset-1">
          Read about our  
          <Link className="underline-offset-1" href={"/refund-policy"}>
          {" "}refund policy
          </Link>
          
        </div>
      </div>
      {/* ORDER DETAILS */}

      <div className="text-black p-4 mb-4">
        <div className="playfair font-[700] text-[20px] leading-[26px] mb-6 text-center">
          Order Id - {order?.razorpay_order_id}
        </div>
        <div className="flex  place-items-center flex-col gap-4 md:w-[80%] m-auto md:grid md:grid-cols-2">
          <div className="w-[150px] ">
            <div className="playfair font-[700] text-[16px] leading-[21px] text-left">
              EMAIL
            </div>
            <div className="font-merriweather font-[400] text-[12px] leading-[15px] text-[#827777]">
              {order?.address?.email}
            </div>
          </div>
          <div className="w-[150px]">
            <div className="playfair font-[700] text-[16px] leading-[21px] text-left">
              Mode of Payment
            </div>
            <div className="font-merriweather font-[400] text-[12px] leading-[15px] text-[#827777]">
              Prepaid
            </div>
          </div>
          <div className="w-[150px]">
            <div className="playfair font-[700] text-[16px] leading-[21px] text-left">
              Order Date
            </div>
            <div className="font-merriweather font-[400] text-[12px] leading-[15px] text-[#827777]">
              {formatDate(order?.createdAt)}
            </div>
          </div>
          <div className="w-[150px]">
            <div className="playfair font-[700] text-[16px] leading-[21px] text-left">
              Contact Number
            </div>
            <div className="font-merriweather font-[400] text-[12px] leading-[15px] text-[#827777]">
              {order?.address?.phone}
            </div>
          </div>
          <div className="w-[150px]">
            <div className="playfair font-[700] text-[16px] leading-[21px] text-left">
              Delivery Options
            </div>
            <div className="font-merriweather font-[400] text-[12px] leading-[15px] text-[#827777]">
              Standard Delivery
            </div>
          </div>
          <div className="w-[150px]">
            <div className="playfair font-[700] text-[16px] leading-[21px] text-left">
              Delivery Address
            </div>
            <div className="font-merriweather font-[400] text-[12px] leading-[15px] text-[#827777]">
             <div>{order?.address?.address}</div>
             <div>{order?.address?.apartment}</div>
             <div>{order?.address?.city}</div>
             <div>{order?.address?.state}</div>
             <div>{order?.address?.pincode}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ORDER SUMMARY */}
      <div>
        <div className="playfair font-[700] text-[20px] leading-[26px] mb-6 text-center text-black my-6">
          Payment Id - {order?.razorpay_payment_id}
        </div>
        {products.map((item) => (
          <div
            key={item.id}
            className="flex items-start md:w-[80%] m-auto  p-4 mb-4"
          >
            <div className="flex-shrink-0 h-[120px]">
              <Image
                src={item.images[0].src}
                alt={item.name}
                width={62}
                height={62}
                className="w-[82px] h-[82px] md:w-[140px] md:h-[140px] object-cover rounded-[10px]"
              />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex font-poppins justify-between items-center">
                <h2 className="text-[11px] md:text-[14px] font-[600] text-black ">
                  {item.name}
                </h2>
              </div>
              <div className="">
                <div className="text-black font-poppins font-[500] md:text-[10px] text-[8px]">
                  Shades
                </div>
                <div className="grid grid-cols-2  w-[26px]">
                  {item?.id == "58" ? (
                    productShades[0].map((shade, index) => (
                    <span
                      key={index}
                      className="w-[13px] h-[13px] inline-block"
                      style={{ backgroundColor: shade }}
                    ></span>
                  ))) : ( productShades[1].map((shade, index) => (
                    <span
                      key={index}
                      className="w-[13px] h-[13px] inline-block"
                      style={{ backgroundColor: shade }}
                    ></span>
                  )))}
                  
                </div>
              </div>
              <div className="flex items-center justify-between  space-x-4">
                <div className="font-poppins font-[500] md:text-[10px] text-[8px] text-black">
                  Quantity: {item.quantity}
                </div>
                <p className="text-[16px] text-black font-[600] font-poppins">
                  Rs.{item.price}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="h-[1px] md:mt-10 w-[80%] m-auto bg-[#999999]"></div>
        <div className="w-[60%] md:w-[30%] md:mr-[10%] md:items-start  flex flex-col m-auto text-black mt-12 md:mb-2 mb-8">
          <div className="w-full flex justify-between md:justify-center md:gap-[100px]">
            <div className="font-poppins font-[600]  text-[10px]">Total:</div>
            <div className="font-poppins font-[600] text-[10px]  text-[#827777]">
              Rs.{total}
            </div>
          </div>
          <div className="w-full flex justify-between md:justify-center md:gap-[100px]">
            <div className="font-poppins font-[600] text-[10px]">Delivery:</div>
            <div className="font-poppins font-[600] text-[10px] text-[#827777]">
              Rs.0.0
            </div>
          </div>
        </div>
        <div className="h-[1px] w-[80%] md:w-[30%] md:mr-[10%] m-auto bg-[#333333]"></div>
        <div className="w-[60%] md:w-[30%] md:mr-[10%] flex flex-col m-auto text-black md:mt-0 mt-12 mb-12">
          <div className="w-full flex justify-between md:justify-center md:gap-[79px]">
            <div className="font-poppins font-[600] text-[12px]">TOTAL:</div>
            <div className="font-poppins font-[600] text-[12px] text-black">
              Rs.{total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
