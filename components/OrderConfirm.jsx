import Image from 'next/image'
import React from 'react'
const products = [
    {
      id: 1,
      name: "Day Dazzle Lipstick",
      price: "$29.99",
      description:
        "Experience everyday glamour with Majesty Matte Liquid Lip Empress set of 4 lipsticks, the epitome of luxury and elegance. Indulge in a velvety matte texture that glides on smoothly, providing an intense color payoff that lasts all day.",
      image: "/assets/images/prodDay.webp",
      images: [
        "/assets/images/emily.webp",
        "/assets/images/diva.webp",
        "/assets/images/grace.webp",
        "/assets/images/veronica.webp",
      ],
      rating: 4.5,
      details: "Set of 4 | 2 ml x 4 | 8 ml",
      reviews: 6,
      category: "Day",
      howToUse:
        "Use the applicator that comes with the product or a lip brush to apply the liquid lipstick to your lips. Start from the center of your lips and work your way outwards. Let it dry: Allow the liquid lipstick to dry completely, which usually takes a few minutes. Avoid rubbing your lips together until the lipstick has dried.",
      ingredients:
        "Isododecane, Trimethylsiloxysilicate, Cyclopentasiloxane, PMSQ IDD, Bentone Gel, Mica, Fumed Silica, Garamite, Colour, Pentaerythrityl Tetra-di-t-butyl Hydroxyhydrocinnamate, Vitamin C.",
      shades: ["#FA70CB", "#DA3D12", "#F7879A", "#841644"],
      shadeNames: ["Emily", "Grace", "Diva", "Veronica"],
    }
  ];


const OrderConfirm = () => {
  return (
    <div className='bg-white   w-full mb-12'>
        <div className='bg-white p-4 my-12 w-[312px] h-[353px] md:w-[745px] md:h-[407px] text-black flex flex-col justify-evenly items-center m-auto border-[2px] border-black'>
            <div className='playfair font-[700] text-[24px] md:text-[36px] lg:text-[40px] leading-[31px] text-center '>THANK YOU FOR YOUR ORDER!</div>
            <div className='playfair font-[700] text-[14px] md:text-[18px] lg:text-[20px] lg:leading-[25px] leading-[17px] md:leading-[22px] text-center px-6 '>We are getting started on your order right away, and you will receive an order confirmation email shortly. </div>
            <button className='bg-black w-[184px] h-[38px] md:w-[239px] md:h-[38px] rounded-[34px] font-poppins text-white font-[600] text-[12px] md:text-[16px] leading-[18px] text-center mt-4 p-2'>View Order Confirmation</button>
            <div className='font-merriweather font-[400] text-[10px] md:text-[11px] leading-[12px] underline-offset-1'>Read about our refund policy</div>
        </div>
        {/* ORDER DETAILS */}

        <div className='text-black p-4 mb-4'>
            <div className='playfair font-[700] text-[20px] leading-[26px] mb-6 text-center'>Order Details - 34268645251</div>
            <div className='flex  place-items-center flex-col gap-4 md:w-[80%] m-auto md:grid md:grid-cols-2'>
                <div className='w-[150px] '>
                    <div className='playfair font-[700] text-[16px] leading-[21px] text-left'>EMAIL</div>
                    <div className='font-merriweather font-[400] text-[12px] leading-[15px] text-[#827777]'>abc123@gmail.com</div>
                </div>
                <div className='w-[150px]'>
                    <div className='playfair font-[700] text-[16px] leading-[21px] text-left'>Mode of Payment</div>
                    <div className='font-merriweather font-[400] text-[12px] leading-[15px] text-[#827777]'>abc123@gmail.com</div>
                </div>
                <div className='w-[150px]'>
                    <div className='playfair font-[700] text-[16px] leading-[21px] text-left'>EMAIL</div>
                    <div className='font-merriweather font-[400] text-[12px] leading-[15px] text-[#827777]'>UPI</div>
                </div>
                <div className='w-[150px]'>
                    <div className='playfair font-[700] text-[16px] leading-[21px] text-left'>Order Date</div>
                    <div className='font-merriweather font-[400] text-[12px] leading-[15px] text-[#827777]'>22/07/2024</div>
                </div>
                <div className='w-[150px]'>
                    <div className='playfair font-[700] text-[16px] leading-[21px] text-left'>Contact Number</div>
                    <div className='font-merriweather font-[400] text-[12px] leading-[15px] text-[#827777]'>+91 9274628364</div>
                </div>
                <div className='w-[150px]'>
                    <div className='playfair font-[700] text-[16px] leading-[21px] text-left'>Delivery Options</div>
                    <div className='font-merriweather font-[400] text-[12px] leading-[15px] text-[#827777]'>Standard Delivery</div>
                </div>
                <div className='w-[150px]'>
                    <div className='playfair font-[700] text-[16px] leading-[21px] text-left'>Delivery Address</div>
                    <div className='font-merriweather font-[400] text-[12px] leading-[15px] text-[#827777]'>abc<br/> 
a12345<br/>
abcuudfcei</div>
                </div>
                
            </div>
        </div>

        {/* ORDER SUMMARY */}
        <div>
        <div className='playfair font-[700] text-[20px] leading-[26px] mb-6 text-center text-black my-6'>Order Summary - 34268645251</div>
        {products.map((item) => (
            <div
              key={item.id}
              className="flex items-start md:w-[80%] m-auto  p-4 mb-4"
            >
              <div className="flex-shrink-0 h-[120px]">
                <Image
                  src={item.image}
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
                <div className='text-black font-poppins font-[500] md:text-[10px] text-[8px]'>Shades</div>
                  <div className="grid grid-cols-2  w-[26px]">
                    {item.shades.map((shade, index) => (
                      <span
                        key={index}
                        className="w-[13px] h-[13px] inline-block"
                        style={{ backgroundColor: shade }}
                      ></span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between  space-x-4">
                  <div className="font-poppins font-[500] md:text-[10px] text-[8px] text-black">
                  Quantity:  1
                  </div>
                  <p className="text-[16px] text-black font-[600] font-poppins">
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className='h-[1px] md:mt-10 w-[80%] m-auto bg-[#999999]'></div>
          <div className='w-[60%] md:w-[30%] md:mr-[10%] md:items-start  flex flex-col m-auto text-black mt-12 md:mb-2 mb-8'>
          <div className='w-full flex justify-between md:justify-center md:gap-[100px]'>
            <div className='font-poppins font-[600]  text-[10px]'>Total:</div>
            <div className='font-poppins font-[600] text-[10px]  text-[#827777]'>$29.99</div>
          </div>
          <div className='w-full flex justify-between md:justify-center md:gap-[100px]'>
            <div className='font-poppins font-[600] text-[10px]'>Delivery:</div>
            <div className='font-poppins font-[600] text-[10px] text-[#827777]'>$4</div>
          </div>

          </div>
          <div className='h-[1px] w-[80%] md:w-[30%] md:mr-[10%] m-auto bg-[#333333]'></div>
          <div className='w-[60%] md:w-[30%] md:mr-[10%] flex flex-col m-auto text-black md:mt-0 mt-12 mb-12'>
          <div className='w-full flex justify-between md:justify-center md:gap-[79px]'>
            <div className='font-poppins font-[600] text-[12px]'>TOTAL:</div>
            <div className='font-poppins font-[600] text-[12px] text-black'>$33.99</div>
          </div>
         

          </div>

        </div>
    </div>
  )
}

export default OrderConfirm