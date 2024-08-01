import React from "react";
import Header from "./Header";
import Footer from "./Footer"; // Adjust the import path if necessary

const TermsConditions = () => {
  // Function to format the date
  const getFormattedDate = () => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return today.toLocaleDateString(undefined, options);
  };

  return (
    <div className="pb-4">
      <Header />
      <main className="pt-28">
        <h1 className="text-3xl md:text-5xl font-playfair-display font-normal text-center mb-8">
          Terms & Conditions
        </h1>
        <p className="text-center font-merriweather font-normal text-sm md:text-base text-gray-500 mb-8">
          Last Updated {getFormattedDate()}
        </p>
        <section className="max-w-4xl mx-auto font-merriweather font-medium md:text-left text-center px-10 md:px-4">
          <h2 className="text-xl md:text-2xl font-merriweather font-bold mb-4">
            1. Introduction
          </h2>
          <p className="text-base text-gray-500 md:text-lg font-poppins font-medium leading-relaxed mb-8">
            These Terms and Conditions govern your use of our website. By
            accessing or using our site, you agree to comply with and be bound
            by these terms. If you do not agree with any part of these terms,
            you must not use our website.
          </p>

          <h2 className="text-xl md:text-2xl font-merriweather font-bold mb-4">
            2. Intellectual Property Rights
          </h2>
          <p className="text-base text-gray-500 md:text-lg font-poppins font-medium leading-relaxed mb-8">
            All content on this website, including text, graphics, logos,
            images, and software, is the property of [Your Company] and is
            protected by international copyright and trademark laws. You may not
            reproduce, distribute, or create derivative works from any content
            on this site without our express written permission.
          </p>

          <h2 className="text-xl md:text-2xl font-merriweather font-bold mb-4">
            3. User Obligations
          </h2>
          <p className="text-base text-gray-500 md:text-lg font-poppins font-medium leading-relaxed mb-8">
            You agree to use this website only for lawful purposes and in a way
            that does not infringe the rights of, restrict, or inhibit anyone
            elses use and enjoyment of the site. Prohibited behavior includes
            harassing or causing distress or inconvenience to any other user,
            transmitting obscene or offensive content, or disrupting the normal
            flow of dialogue within our site.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditions;
