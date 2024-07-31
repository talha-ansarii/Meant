import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const OrderItem = ({ order }) => {
  return (
   <div>
    <div className=' flex justify-between'>
        <div className='flex flex-col playfair'>
<div className='font-[700] playfair lg:text-[12px] md:text-[12px] text-[11px]'>Order Number</div>
<div className='font-[400] font-merriweather mb-3 lg:text-[16px] md:text-[16px] text-[14px]'>{order.orderNumber}</div>
<div className='playfair font-[700] lg:text-[16px] md:text-[16px] text-[15px]'>{order.itemCount} item(s) {order.status}</div>
        <div className='font-[400] mb-3 text-[#999999] md:text-[12px] font-merriweather lg:text-[12px] text-[11px]'>Package delivered on<span className='text-black'>{order.deliveryDate}</span></div>
        <Image src={order.imageUrl} alt="order" width={78} height={78} className='lg:w-[78px] lg:h-[78px] md:w-[78px] md:h-[78px] w-[82px] h-[82px] rounded-[10px]' />
        </div>
        <div className='flex lg:items-start justify-end items-end lg:h-auto md:h-auto h-[200px] '>
                <Link href={"#"} className='lg:w-[121px] lg:h-[28px] md:w-[121px] md:h-[28px] w-[97px] h-[19px] border border-black font-poppins text-[10px] font-[600] lg:text-[14px] md:text-[14px] flex justify-center items-center rounded-[4px] '><span>Order Details</span>
                </Link>
        </div>
    </div>
    <div className='w-full h-[1px] bg-[#333333] mt-4'></div>
   </div>
  );
};

export default OrderItem;
