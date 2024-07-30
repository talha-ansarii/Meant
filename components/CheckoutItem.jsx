import React from 'react'

const CheckoutItem = ({item}) => {
  return (
    <div>
        <div key={item.id} className="flex text-black  m-4 rounded-[7px] border border-[#CDC8C8] items-center mb-4">
              <img src={item.imageUrl} alt={item.name} className="w-[98px] h-[98px] rounded-[10px] object-cover m-4"/>
              
              <div className="flex-1 ">
              <div className='flex w-full justify-between'>

                <h3 className="text-[14px] font-poppins font-[600]">{item.name}</h3>
                
              </div>
                <div className="grid grid-cols-2 w-[26px]  my-2">

                  {item.shades.map((shade, index) => (
                    <span key={index} className="w-[13px] h-[13px] inline-block mr-1" style={{ backgroundColor: shade }}></span>
                  ))}
                  
                </div>
                
              </div>
              <div className='flex flex-col justify-start  items-start px-3  h-[55px]'>
             
              <div className="text-[18px] font-poppins font-[600]">${item.price}</div>
              </div>

            </div>
    </div>
  )
}

export default CheckoutItem