"use client";
import React, { useEffect, useState } from "react";
import { fetchAddresses, updateAddress } from "@/utils/addressUtils";
import { useUser } from "@clerk/nextjs";

const Profile = () => {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addressId, setAddressId] = useState("");

  const { user } = useUser();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useState(() => {
    setFormData({
      name: user?.name,
      email: user?.email,
    });
  }, [user, editProfileOpen]);

  useEffect(() => {
    // Fetch addresses when the component mounts
    const getAddresses = async () => {
      try {
        const data = await fetchAddresses();
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    getAddresses();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const updatedAddress = await updateAddress(addressId, formData);
    // console.log(updatedAddress);
    if (updatedAddress) {
      setEditProfileOpen(false);
    }
  };

  return (
    <div className="m-auto relative mt-[150px] flex justify-center items-center flex-col my-auto bg-white rounded-[10px] h-[535px] w-[990px] ">
      {editProfileOpen && (
        <div className="flex absolute top-[50%] z-50 translate-y-[-50%] justify-center items-center min-h-screen ">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
          >
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setEditProfileOpen(false);
                }}
                type="button"
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pin Code
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                DONE
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="text-black bg-[#F7879A]/[18%] w-[98%] h-[98%] m-auto rounded-[10px] p-6">
        <h3 className="text-[20px] playfair font-[700] leading-[26.66px] mb-[50px]">
          My Addresses
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {addresses.map((address, i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg p-4">
              <h4 className="text-[13px] playfair font-[700] leading-[17.66px]">
                {address.address.firstName} {address.address.lastName}
              </h4>
              <p className="text-[12px] playfair font-[500] leading-[18.66px]">
                {address.address.address}

                <div>{address.address.apartment}</div>
                <div>{address.address.city}</div>
                <div>{address.address.state}</div>
                <div>{address.address.pincode}</div>
                <div></div>
              </p>
              <p className="text-[13px] playfair font-[700] leading-[17.66px]">
                {address.address.phone}
              </p>
              <div className="flex justify-end gap-4 mt-2">
                <button
                  onClick={() => {
                    setEditProfileOpen(true);
                    setAddressId(address._id);
                  }}
                  className="text-[8px] playfair font-[700] leading-[10.66px]"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
