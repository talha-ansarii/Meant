"use client"
import React from 'react'

const PasswordProtection = ({setPassword, password}) => {

     
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setPassword(value);
      };
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-black '>
             <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        
        <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-black">
              Password?
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
       
          
        </div>
      
      </form>
    </div>
  )
}

export default PasswordProtection