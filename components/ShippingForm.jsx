"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

const ShippingForm = ({ handlePayment }) => {
  // State variables for form inputs
  const [email, setEmail] = useState("");
  const [emailOffers, setEmailOffers] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);

  // Handle input changes
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleCheckboxChange = (setter) => (e) => {
    setter(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form Submitted");

    const addr = {
      email,
      emailOffers,
      firstName,
      lastName,
      address,
      apartment,
      city,
      state,
      pincode,
      phone,
    };

    // Log to ensure values are correct before setting them
    console.log("Submitting form with values:", addr);

    handlePayment(addr);
    if (saveInfo) {
      // Here you would handle saving the info (e.g., make an API call)
      console.log("Saving address:", addr);
    }
  };

  return (
    <div className="min-h-screen flex lg:mt-[80px] md:mt-[80px] flex-col items-center bg-white ray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4">
        <div>
          <div className="w-full flex justify-center items-center">
            <Image
              src="/logoBlack.svg"
              alt="Meant"
              width={100}
              height={100}
              className="w-[118px] h-[39px]"
            />
          </div>
          <nav className="mt-4 text-center">
            <Link
              href="#"
              className="text-[10px] text-black font-[500] font-poppins"
            >
              cart {" >"}{" "}
            </Link>
            <Link
              href="#"
              className="text-[10px] text-black font-[500] font-poppins"
            >
              information {" > "}
            </Link>
            <Link
              href="#"
              className="text-[10px] text-black font-[500] font-poppins"
            >
              shipping{" "}
            </Link>
          </nav>
        </div>
        <div className="text-[32px] text-black font-[500] font-poppins">
          CONTACT
        </div>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleInputChange(setEmail)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div className="flex items-center pt-4">
              <input
                id="email-offers"
                name="email-offers"
                type="checkbox"
                checked={emailOffers}
                onChange={handleCheckboxChange(setEmailOffers)}
                className="h-[14px] w-[14px] text-indigo-600 focus:ring-indigo-500 border border-gray-200"
              />
              <label
                htmlFor="email-offers"
                className="text-[8px] text-[#1E1E1E] ml-1 font-[500] font-poppins"
              >
                email me with news & offers
              </label>
            </div>
          </div>
          <div className="text-[32px] text-black font-[500] pt-8 font-poppins">
            SHIPPING ADDRESS
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="w-1/2">
                <label htmlFor="first-name" className="sr-only">
                  First Name
                </label>
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={handleInputChange(setFirstName)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="last-name" className="sr-only">
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={lastName}
                  onChange={handleInputChange(setLastName)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="sr-only">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
                required
                value={address}
                onChange={handleInputChange(setAddress)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Address"
              />
            </div>
            <div>
              <label htmlFor="apartment" className="sr-only">
                Apartment, Suite, etc (optional)
              </label>
              <input
                id="apartment"
                name="apartment"
                type="text"
                autoComplete="address-line2"
                value={apartment}
                onChange={handleInputChange(setApartment)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Apartment, Suite, etc (optional)"
              />
            </div>
            <div className="flex gap-2">
              <div className="w-1/3">
                <label htmlFor="city" className="sr-only">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  required
                  value={city}
                  onChange={handleInputChange(setCity)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="City"
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="state" className="sr-only">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  required
                  value={state}
                  onChange={handleInputChange(setState)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                ></input>
              </div>
              <div className="w-1/3">
                <label htmlFor="pincode" className="sr-only">
                  Pincode
                </label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  autoComplete="postal-code"
                  required
                  value={pincode}
                  onChange={handleInputChange(setPincode)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Pincode"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={handleInputChange(setPhone)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone"
              />
            </div>
            <div className="flex items-center mt-2">
              <input
                id="save-info"
                name="save-info"
                type="checkbox"
                checked={saveInfo}
                onChange={handleCheckboxChange(setSaveInfo)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="save-info"
                className="ml-2 block text-sm text-gray-900"
              >
                save this information for next time
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <a
              href="#"
              className="text-[8px] text-black font-[500] pt-8 font-poppins"
            >
              &lt; return to cart
            </a>
            <button type="submit">
              <div className="mt-4 flex justify-center items-center w-[205px] h-[40px] bg-black text-[14px] font-poppins font-[600] text-white rounded-[34px]">
                <div>Continue to Shipping</div>
              </div>
            </button>
          </div>
        </form>
        <div className="w-full h-[1px] bg-[#CDC8C8]"></div>
      </div>
    </div>
  );
};

export default ShippingForm;
