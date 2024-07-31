"use client";

import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

const ContactUs = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  //   Form validation
  const [errors, setErrors] = useState({});

  //   Setting button text
  const [buttonText, setButtonText] = useState("Send");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (fullname.length <= 0) {
      tempErrors["fullname"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (subject.length <= 0) {
      tempErrors["subject"] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  //const [form, setForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      setButtonText("Sending");
      const res = await fetch("/api/sendgrid", {
        body: JSON.stringify({
          email: email,
          fullname: fullname,
          subject: subject,
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        console.log(error);
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
        setButtonText("Send");

        // Reset form fields
        setFullname("");
        setEmail("");
        setMessage("");
        setSubject("");
        return;
      }
      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      setButtonText("Send");
      // Reset form fields
      setFullname("");
      setEmail("");
      setMessage("");
      setSubject("");
    }
    console.log(fullname, email, subject, message);
  };
  return (
    <div className="">
      <main className=" bg-white">
        <header className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4 pt-10 lg:px-40 bg-[#F7879A]/[10%] dark:bg-blue-900 md:h-96">
          <div className="mx-auto mb-10 md:mt-20">
            <h1 className="text-[48px] font-[700] mt-4 dark:text-gray-50 text-black playfair ">
              CONTACT US
            </h1>
            <p className="text-[15px] font-[400] text-[#827777]">
              Have a question? Check out our FAQ page as your question may be
              answered there. Still need help? Contact us.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-lg shadow-xl flex flex-col px-8 py-8 bg-white dark:bg-blue-500"
          >
            <h1 className="text-[32px] font-[700] text-black playfair">
              Send a message
            </h1>

            <label
              htmlFor="fullname"
              className="text-gray-500 font-light mt-8 dark:text-gray-50"
            >
              Full name<span className="text-red-500 dark:text-gray-50">*</span>
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
              name="fullname"
              className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            />
            {errors?.fullname && (
              <p className="text-red-500">Fullname cannot be empty.</p>
            )}

            <label
              htmlFor="email"
              className="text-gray-500 font-light mt-4 dark:text-gray-50"
            >
              E-mail<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            />
            {errors?.email && (
              <p className="text-red-500">Email cannot be empty.</p>
            )}

            <label
              htmlFor="subject"
              className="text-gray-500 font-light mt-4 dark:text-gray-50"
            >
              Subject<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            />
            {errors?.subject && (
              <p className="text-red-500">Subject cannot be empty.</p>
            )}
            <label
              htmlFor="message"
              className="text-gray-500 font-light mt-4 dark:text-gray-50"
            >
              Message<span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            ></textarea>
            {errors?.message && (
              <p className="text-red-500">Message body cannot be empty.</p>
            )}
            <div className="flex flex-row items-center justify-start">
              <button className="font-poppins font-[500] text-[16px] leading-[24px] text-white w-[147px] h-[44px] bg-black rounded-[34px] shadow-md">
                {buttonText}
              </button>
            </div>
            <div className="text-left">
              {showSuccessMessage && (
                <p className="text-green-500 font-semibold text-sm my-2">
                  Thankyou! Your Message has been delivered.
                </p>
              )}
              {showFailureMessage && (
                <p className="text-red-500">
                  Oops! Something went wrong, please try again.
                </p>
              )}
            </div>
          </form>
        </header>
        <div className="w-full h-[400px]"></div>
        <Footer />
      </main>
    </div>
  );
};

export default ContactUs;
