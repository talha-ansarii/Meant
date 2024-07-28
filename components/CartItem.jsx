import React from 'react'

const CartItem = ({item,handleQuantityChange,handleRemoveItem}) => {
  return (
    <div>
        <div key={item.id} className="flex  m-4 w-[574px] h-[173px] rounded-[7px] border border-[#CDC8C8] items-center mb-4">
              <img src={item.imageUrl} alt={item.name} className="w-[140px] h-[140px] rounded-[10px] object-cover m-4"/>
              
              <div className="flex-1 ">
              <div className='flex w-full justify-between'>

                <h3 className="text-[24px] font-merriweather font-[400]">{item.name}</h3>
                
              </div>
                <div className="grid grid-cols-2 w-[26px]  my-2">

                  {item.shades.map((shade, index) => (
                    <span key={index} className="w-[13px] h-[13px] inline-block mr-1" style={{ backgroundColor: shade }}></span>
                  ))}
                </div>
                <div className="flex items-center">
                 
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="w-12 border border-gray-300 rounded p-1"
                    min="1"
                  />
                </div>
              </div>
              <div className='flex flex-col justify-between items-center py-6 px-3  h-[173px]'>
              <button onClick={() => handleRemoveItem(item.id)} className="">
                    <img src='/trash.svg' className='w-[14px] h-[15px] '/>
                  </button>
              <div className="text-[18px] font-merriweather font-[700]">${item.price}</div>
              </div>

            </div>
    </div>
  )
}

export default CartItem