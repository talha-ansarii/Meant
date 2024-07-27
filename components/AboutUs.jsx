import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="w-full pb-4">
      <div className="w-[80%] m-auto pt-[100px]">
        <div>
          <Image
            src="/assets/images/aboutusbanner.webp"
            alt="About Us Banner"
            width={1920}
            height={537}
            className="w-full h-[537px] rounded-md"
          />
        </div>
        <div className="bg-[#1a1a1a] mt-12 rounded-md h-[457px] flex justify-center items-center">
          <div className="text-white playfair flex flex-col gap-6 text-center w-[50%] m-auto  ">
            <div className="text-[60px]">About Us</div>
            <div className="text-[25px]">
              Welcome to Meant, where every product is crafted with intention,
              purpose, and a commitment to making a difference. We believe that
              beauty is more than skin deep; it's about embracing your true self
              and celebrating your unique essence. We thrive to empower
              individuals to feel confident and beautiful in their skin, while
              making a positive impact on the world around us.
            </div>
          </div>
        </div>
        <div className="bg-[#1a1a1a] w-full  mt-12 rounded-md h-[457px] flex justify-center items-center">
          <div className="text-white playfair flex flex-col gap-6 text-center w-[50%] m-auto p-4 ">
            <div className="text-[50px]">Our Mission</div>
            <div className="text-[20px] ">
              At Meant, our mission is simple: to create high-quality,
              effective, and cruelty free beauty products that enhance your
              natural beauty while promoting wellness and self-care. We are
              dedicated to using only the finest, ethically sourced ingredients
              and to being transparent about what goes into our products. We
              strive to innovate and set new standards in the beauty industry by
              prioritizing social responsibility.
            </div>
          </div>
          <div className="w-[50%] h-[457px] overflow-hidden ">
            <Image
              src="/HomePage/banner/1.jpeg"
              alt="Our Mission Banner"
              width={1920}
              height={457}
              className="w-full overflow-hidden object-cover"
            />
          </div>
        </div>
        <div>
          <Image
            src="/aboutUs/banner.webp"
            alt="About Us Banner"
            width={1920}
            height={537}
            className="w-full mt-12 h-[537px] rounded-md"
          />
        </div>
      </div>
      <div className=" w-[80%] m-auto  mt-12 rounded-md h-[457px] gap-4 flex justify-center items-center">
        <div className="w-[50%] bg-[#1a1a1a] h-[457px] rounded-md overflow-hidden ">
          <Image
            src="/HomePage/banner/1.jpeg"
            alt="Our Vision Banner"
            width={1920}
            height={457}
            className="w-full overflow-hidden rounded-md object-cover"
          />
        </div>
        <div className="text-white h-[457px] bg-[#1a1a1a] rounded-md playfair flex flex-col gap-6 text-center justify-center items-center w-[50%] m-auto p-4 ">
          <div className="text-[50px]">Our Vision</div>
          <div className="text-[20px] ">
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
      <div className=" w-[80%] m-auto  my-12 rounded-md h-[457px] gap-4 flex justify-center items-center">
        <div className="text-white h-[457px] bg-[#1a1a1a] rounded-md playfair flex flex-col gap-6 text-center justify-center items-center w-[50%] m-auto p-4 ">
          <div className="text-[50px]">Our Commitment</div>
          <div className="text-[20px] ">
            - Quality: We meticulously select ingredients that are not only safe
            and effective but also sustainably sourced. Every product is crafted
            with care, ensuring that it meets our high standards of quality and
            performance.
            <br />
            - Transparency: We believe in being open and honest about what goes
            into our products. You deserve to know what you're putting on your
            skin, and we are committed to providing full ingredient
            transparency.
            <br />
            - Inclusivity: Beauty is for everyone. Our products are designed to
            celebrate and enhance the natural beauty of all skin types, tones,
            and textures.
            <br />- Empowerment: We are here to empower you to feel confident
            and beautiful in your skin. Our products are created to help you
            express your unique beauty and embrace your true self.
          </div>
        </div>
        <div className="w-[50%] bg-[#1a1a1a] h-[457px] rounded-md overflow-hidden ">
          <Image
            src="/HomePage/banner/1.jpeg"
            alt="Our Commitment Banner"
            width={1920}
            height={457}
            className="w-full overflow-hidden rounded-md object-cover"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
