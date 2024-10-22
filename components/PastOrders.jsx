"use client";

import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import { getAllOrders } from "@/utils/OrdersUtils";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import LoadingComponent from "./LoadingComponent";

export default function PastOrders() {
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  const { user, isSignedIn } = useUser();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [signin, setSignin] = useState(false);

  useEffect(() => {
    if (user?.id) {
      // console.log(user?.id)
      setSignin(true);
      setUserId(user.id);
    }
  }, [user]);

  useEffect(() => {
    const handleGetOrder = async () => {
      try {
        const fetchedOrder = await getAllOrders();
        setOrders(fetchedOrder);
        console.log(fetchedOrder);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch orders", error);
        setLoading(false);
      }
    };
    handleGetOrder();
  }, []);

  useEffect(() => {
    if (userId) {
      const filteredOrders = orders.filter((order) => order.userId === userId);
      setUserOrders(filteredOrders);
      console.log(filteredOrders);
    }
  }, [userId, orders]);

  if (loading)
    return (
      <>
        {isClient && (
          <div className="w-[100vw] h-[100vh]  text-black ">
            <LoadingComponent />
          </div>
        )}
      </>
    );

  //  console.log(userOrders);

  return (
    <div className="bg-white no-scrollbar overflow-y-auto h-[80vh] w-[80%] m-auto text-black p-12 rounded-[10px]">
      <div className="playfair font-[700] md:text-[32px] text-center text-[24px] lg:text-[32px] mb-6">
        My Orders
      </div>
      {userOrders.length === 0 && (
        <div className="text-center text-[20px] h-[50vh] flex flex-col items-center justify-center gap-4 p-4 mb-[200px] ">
          <Image
            src="/assets/images/emptypastorder.webp"
            alt="Empty Past Order"
            width={250}
            height={250}
            className="object-contain"
          />
          <p>Ready to refill your favourites?</p>

          <Link
            href="/products"
            className="mt-8 text-[18px] w-full font-playfair-display font-extrabold inline-block bg-black text-white md:w-[400px] py-2 px-8 rounded-[30px] text-center  lg:w-[300px]"
          >
            Order something new now!
          </Link>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {userOrders.map((order, index) => (
          <OrderItem key={index} order={order} />
        ))}
      </div>
    </div>
  );
}
