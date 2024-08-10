'use client'

import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import { getAllOrders } from "@/utils/OrdersUtils";
import { useUser } from "@clerk/nextjs";
import VideoLoader from "./VideoLoader";

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
      const filteredOrders = orders.filter(order => order.userId === userId);
      setUserOrders(filteredOrders);
      console.log(filteredOrders);
    }
  }, [userId, orders]);

  if (!signin) {
    return <div>Sign in to view your orders...</div>;
  }

  if (loading) return <>{isClient && <div className="w-[100vw] h-[100vh] ">
    Loading...
     </div>}</>;

  return (
    <div className="bg-white overflow-y-auto h-[80vh] w-[80%] m-auto text-black p-12 rounded-[10px]">
      <div className="playfair font-[700] md:text-[32px] text-[24px] lg:text-[32px] mb-6">My Orders</div>
      <div className="flex flex-col gap-4">
        {userOrders.map((order, index) => (
          <OrderItem key={index} order={order} />
        ))}
      </div>
    </div>
  );
}
