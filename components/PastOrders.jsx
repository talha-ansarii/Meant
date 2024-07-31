import OrderItem from "./OrderItem";

const orders = [
    {
      orderNumber: '223238927348289',
      itemCount: 1,
      status: 'Delivered',
      deliveryDate: 'Sun, 21 Jul',
      imageUrl: "/assets/images/mission.jpeg",
    },
    {
      orderNumber: '223238927348290',
      itemCount: 1,
      status: 'Delivered',
      deliveryDate: 'Sun, 21 Jul',
      imageUrl: "/assets/images/mission.jpeg",
    },
    {
      orderNumber: '223238927348291',
      itemCount: 1,
      status: 'Delivered',
      deliveryDate: 'Sun, 21 Jul',
      imageUrl: "/assets/images/mission.jpeg",
    },
  ];
export default function PastOrders() {
      
  return (
    <div className=" bg-white w-[80%] m-auto text-black p-12 rounded-[10px]">
    <div className="playfair font-[700] md:text-[32px] text-[24px] lg:text-[32px] mb-6">My Orders</div>
        <div className="flex flex-col gap-4">
{
            orders.map((order, index) => (
                <OrderItem key={index} order={order} />
            ))
}
        </div>
    </div>
  );
}