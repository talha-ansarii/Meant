import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import VideoLoader from "./LoadingComponent";
import LoadingComponent from "./LoadingComponent";

const OrderItem = ({ order }) => {
  const [productDetails, setProductDetails] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Function to fetch product details
    const fetchProductDetails = async () => {
      try {
        const fetches = order?.products.map(async (product) => {
          const response = await fetch(`/api/get-product/${product.productId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch product");
          }
          const data = await response.json();
          setLoading(false);
          return data;
        });

        const productDetail = await Promise.all(fetches);

        // Update state with fetched product details
        setProductDetails(productDetail);
      } catch (error) {
        console.log("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [order]);

  if (loading)
    return (
      <>
        {isClient && (
          <div className="w-full text-black ">
            <LoadingComponent text={"black"}/>
          </div>
        )}
      </>
    );

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col playfair">
          <div className="font-[700] playfair lg:text-[12px] md:text-[12px] text-[11px]">
            Order Number
          </div>
          <div className="font-[400] font-merriweather mb-3 lg:text-[16px] md:text-[16px] text-[14px]">
            {order?.razorpay_order_id}
          </div>
          <div className="playfair font-[700] lg:text-[16px] md:text-[16px] mb-2 text-[15px]">
            {order?.products?.length} item(s) {order?.tracking_status}
          </div>

          <div className="flex gap-2">
            {productDetails?.map((product, index) => (
              <Link href={`product/${product?.id}`} key={index}>
                <Suspense
                  fallback={<div className="text-black">Loading..</div>}
                >
                  <img
                    src={product?.images[0]?.src}
                    alt="order"
                    width={78}
                    height={78}
                    className="lg:w-[78px] lg:h-[78px] md:w-[78px] md:h-[78px] w-[82px] h-[82px] rounded-[10px]"
                  />
                </Suspense>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex lg:items-start justify-end items-end lg:h-auto md:h-auto h-[200px] ">
          <Link
            href={`/order-confirm?payment_id=${order?.razorpay_payment_id}`}
            className="lg:w-[121px] lg:h-[28px] md:w-[121px] md:h-[28px] w-[97px] h-[19px] border border-black font-poppins text-[10px] font-[600] lg:text-[14px] md:text-[14px] flex justify-center items-center rounded-[4px] "
          >
            <span>Order Details</span>
          </Link>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#333333] mt-4"></div>
    </div>
  );
};

export default OrderItem;
