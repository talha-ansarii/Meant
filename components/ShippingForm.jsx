// src/components/ShippingForm.jsx
import Link from 'next/link';
import React from 'react';

const ShippingForm = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white ray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4">
        <div>
        <div className='w-full flex justify-center items-center '>
          <img src='/logoBlack.svg' className='w-[118px] h-[39px]'/>

        </div>
          <nav className="mt-4 text-center">
            <Link href="#" className="text-[10px] text-black font-[500] font-poppins">cart {" >"} </Link> 
            <Link href="#" className="text-[10px] text-black font-[500] font-poppins">information {" > "}</Link> 
            <Link href="#" className="text-[10px] text-black font-[500] font-poppins">shipping </Link>
          </nav>
        </div>
        <div className='  text-[32px] text-black font-[500] font-poppins'>CONTACT</div>
        <form className="  space-y-2">
          <div className=" shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Email" 
              />
            </div>
            <div className="flex items-center pt-4">
              <input 
                id="email-offers" 
                name="email-offers" 
                type="checkbox" 
                className="h-[14px] w-[14px] text-indigo-600 focus:ring-indigo-500 border border-gray-200 " 
              />
              <label htmlFor="email-offers" className="text-[8px] text-[#1E1E1E] ml-1 font-[500] font-poppins">
                email me with news & offers
              </label>
            </div>

          </div>
          <div className='text-[32px] text-black font-[500] pt-8 font-poppins'>SHIPPING ADDRESS</div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="w-1/2">
                <label htmlFor="first-name" className="sr-only">First Name</label>
                <input 
                  id="first-name" 
                  name="first-name" 
                  type="text" 
                  autoComplete="given-name" 
                  required 
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                  placeholder="First Name" 
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="last-name" className="sr-only">Last Name</label>
                <input 
                  id="last-name" 
                  name="last-name" 
                  type="text" 
                  autoComplete="family-name" 
                  required 
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                  placeholder="Last Name" 
                />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="sr-only">Address</label>
              <input 
                id="address" 
                name="address" 
                type="text" 
                autoComplete="street-address" 
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Address" 
              />
            </div>
            <div>
              <label htmlFor="apartment" className="sr-only">Apartment, Suite, etc (optional)</label>
              <input 
                id="apartment" 
                name="apartment" 
                type="text" 
                autoComplete="address-line2" 
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Apartment, Suite, etc (optional)" 
              />
            </div>
            <div className="flex gap-2">
              <div className="w-1/3">
                <label htmlFor="city" className="sr-only">City</label>
                <input 
                  id="city" 
                  name="city" 
                  type="text" 
                  autoComplete="address-level2" 
                  required 
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                  placeholder="City" 
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="state" className="sr-only">State</label>
                <select 
                  id="state" 
                  name="state" 
                  autoComplete="address-level1" 
                  required 
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                >
                  <option value="">State</option>
                  <option value="State1">State1</option>
                  <option value="State2">State2</option>
                  {/* Add more states as needed */}
                </select>
              </div>
              <div className="w-1/3">
                <label htmlFor="pincode" className="sr-only">Pincode</label>
                <input 
                  id="pincode" 
                  name="pincode" 
                  type="text" 
                  autoComplete="postal-code" 
                  required 
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                  placeholder="Pincode" 
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">Phone</label>
              <input 
                id="phone" 
                name="phone" 
                type="tel" 
                autoComplete="tel" 
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Phone" 
              />
            </div>
            <div className="flex items-center mt-2">
              <input 
                id="save-info" 
                name="save-info" 
                type="checkbox" 
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
              />
              <label htmlFor="save-info" className="ml-2 block text-sm text-gray-900">
                save this information for next time
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <a href="#" className="text-[8px] text-black font-[500] pt-8 font-poppins">
              &lt; return to cart
            </a>
            <Link
            href={'/checkout'}
             className="mt-4 flex justify-center items-center w-[205px] h-[40px] bg-black text-[14px] font-poppins font-[600] text-white rounded-[34px]">
              <div>Continue to Pay</div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingForm;
