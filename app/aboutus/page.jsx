import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="w-full">
      <Header />
      <div className="w-[80%] m-auto md:pt-[100px] lg:pt-[100px]">
        <div>
          <img
            src="/aboutUs/banner.webp"
            className="w-full h-[200px] md:h-[300px] lg:h-[537px]   rounded-md"
          />
        </div>
        <div className="bg-[#1a1a1a] mt-12 rounded-md h-[457px] flex justify-center items-center">
          <div className="text-white playfair flex flex-col gap-6 text-center lg:w-[50%] md:w-[70%] w-[80%] m-auto  ">
            <div className="lg:text-[50px]  md:text-[50px] text-[50px]">About Us</div>
            <div className="lg:text-[20px] md:text-[20px] text-[18px]">
              Welcome to Meant, where every product is crafted with intention,
              purpose, and a commitment to making a difference. We believe that
              beauty is more than skin deep; it's about embracing your true self
              and celebrating your unique essence. We thrive to empower
              individuals to feel confident and beautiful in their skin, while
              making a positive impact on the world around us.
            </div>
          </div>
        </div> 
        <div className="bg-[#1a1a1a] w-full  mt-12 rounded-md md:h-[600px]  lg:h-[457px] flex lg:flex-row md:flex-row flex-col justify-center items-center">
          <div className="text-white playfair flex flex-col gap-6 text-center lg:w-[50%] md:w-[50%] w-[100%] m-auto p-4 ">
            <div className="lg:text-[50px]  md:text-[50px] text-[50px]">Our Mission</div>
            <div className="lg:text-[20px] md:text-[20px] text-[18px]">
              At Meant, our mission is simple: to create high-quality,
              effective, and cruelty free beauty products that enhance your
              natural beauty while promoting wellness and self-care. We are
              dedicated to using only the finest, ethically sourced ingredients
              and to being transparent about what goes into our products. We
              strive to innovate and set new standards in the beauty industry by
              prioritizing social responsibility.
            </div>
          </div>
          <div className="lg:w-[50%] md:w-[50%] w-[100%] h-[457px] md:h-[600px]  lg:h-[457px] overflow-hidden ">
            <img
              src="/HomePage/banner/1.jpeg"
              className=" w-full overflow-hidden  h-full object-cover "
            />
          </div>
        </div>
        <div>
          <img
            src="/aboutUs/banner.webp"
            className="w-full h-[200px] md:h-[300px] lg:h-[537px] mt-12  rounded-md"
          />
        </div>
      </div>
      <div className=" w-[80%] m-auto  mt-12 rounded-md  md:h-[700px]  lg:h-[457px] gap-4 flex lg:flex-row md:flex-row flex-col justify-center items-center">
        <div className="lg:w-[50%] md:w-[50%] w-[100%]  md:h-[700px]  lg:h-[457px] bg-[#1a1a1a]  rounded-md overflow-hidden ">
          <img
            src="/HomePage/banner/1.jpeg"
            className=" w-full h-full rounded-md object-cover overflow-hidden "
          />
        </div>
        <div className="text-white  md:h-[700px]  lg:h-[457px] h-auto bg-[#1a1a1a] rounded-md playfair flex flex-col gap-6 text-center justify-center items-center lg:w-[50%] md:w-[50%] w-[100%] m-auto p-4 ">
          <div className="lg:text-[50px]  md:text-[50px] text-[50px]">Our Vision</div>
          <div className="lg:text-[20px] md:text-[20px] text-[18px] ">
            Our vision is to redefine beauty standards by promoting inclusivity,
            diversity, and authenticity. We envision a world where everyone
            feels valued and beautiful in their own skin, free from societal
            pressures and stereotypes. We aim to lead the beauty industry
            towards a more sustainable future, where every product not only
            makes a difference to your skin but also contributes positively to
            the environment and society.
          </div>
        </div>
      </div>
      <div className=" w-[80%] m-auto  my-12 rounded-md  md:h-[800px]  lg:h-[800px] gap-4 flex lg:flex-row md:flex-row flex-col justify-center items-center">
        <div className="text-white  md:h-[800px]  lg:h-[800px] bg-[#1a1a1a] rounded-md playfair flex flex-col gap-6 text-center justify-center items-center lg:w-[50%] md:w-[50%] w-[100%] m-auto p-4 ">
          <div className="lg:text-[40px]  md:text-[40px] text-[50px]">Our Commitment</div>
          <div className="lg:text-[18px] md:text-[17px] text-[18px]">
      - Quality: We meticulously select ingredients that are not only safe and effective but also
sustainably sourced. Every product is crafted with care, ensuring that it meets our high
standards of quality and performance.<br/>
- Transparency: We believe in being open and honest about what goes into our
products. You deserve to know what you're putting on your skin, and we are committed
to providing full ingredient transparency.<br/>
- Inclusivity: Beauty is for everyone. Our products are designed to celebrate and
enhance the natural beauty of all skin types, tones, and textures.<br/>
- Empowerment: We are here to empower you to feel confident and beautiful in your
skin. Our products are created to help you express your unique beauty and embrace
your true self.
          </div>
        </div>
        <div className="lg:w-[50%] md:w-[50%] w-[100%] bg-[#1a1a1a]  md:h-[800px]  lg:h-[800px] rounded-md overflow-hidden ">
          <img
            src="/HomePage/banner/1.jpeg"
            className=" w-full overflow-hidden h-full rounded-md object-cover  "
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default page;
