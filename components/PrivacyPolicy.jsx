import React from "react";
import Header from "./Header";
import Footer from "./Footer"; // Adjust the import path if necessary

const PrivacyPolicy = () => {
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
          Privacy Policy
        </h1>
        <p className="text-center font-merriweather font-normal text-sm md:text-base text-gray-500 mb-8">
          Last Updated {getFormattedDate()}
        </p>
        <section className="max-w-4xl mx-auto font-merriweather font-medium md:text-left text-center px-10 md:px-4">
          {/* Add your privacy policy content here */}
          <p className="text-base md:text-lg leading-relaxed">
            {/* Example privacy policy text */}
            This Privacy Policy describes how your personal information is
            collected, used, and shared when you visit or make a purchase from
            our site. We collect information about you when you interact with
            our site, including personal information you provide directly, and
            information we collect automatically using technologies like cookies
            and web beacons. We use this information to process transactions,
            improve our services, and communicate with you. For a more detailed
            description of our privacy practices, please read the full Privacy
            Policy.
          </p>
          <br />
          <p className="text-base md:text-lg leading-relaxed">
            {/* Example privacy policy text */}
            This Privacy Policy describes how your personal information is
            collected, used, and shared when you visit or make a purchase from
            our site. We collect information about you when you interact with
            our site, including personal information you provide directly, and
            information we collect automatically using technologies like cookies
            and web beacons. We use this information to process transactions,
            improve our services, and communicate with you. For a more detailed
            description of our privacy practices, please read the full Privacy
            Policy.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
