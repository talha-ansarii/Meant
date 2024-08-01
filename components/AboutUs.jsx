import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="w-full pb-4 flex flex-col items-center">
      <div className="w-full max-w-screen-lg m-auto mt-[-80px] md:mt-0 lg:mt-0">
        <div className="w-full flex justify-center">
          <Image
            src="/assets/images/aboutusbaanner.jpeg"
            alt="About Us Banner"
            width={1240}
            height={600}
            className="object-cover rounded-md"
          />
        </div>
        <div className="bg-white w-full max-w-screen-lg mt-12 rounded-[10px] flex flex-col items-center px-6 py-12">
          <div className="text-black playfair font-medium text-center lg:w-1/2 md:w-3/4 w-full">
            <p className="lg:text-2xl  lg:leading-8 md:text-lg md:leading-6 text-sm leading-4">
              Welcome to <b>Meant,</b> where every product is crafted with
              intention, purpose, and a commitment to making a difference. We
              believe that beauty is more than skin deep; its about embracing
              your true self and celebrating your unique essence. We thrive to
              empower individuals to feel confident and beautiful in their skin,
              while making a positive impact on the world around us.
            </p>
          </div>
        </div>

        <div className="bg-white w-full max-w-screen-lg mt-12 rounded-[10px] flex flex-col md:flex-row items-center justify-center">
          <div className="text-black playfair flex flex-col items-center text-center lg:w-1/2 md:w-1/2 w-full p-8 md:p-12">
            <div className="lg:text-4xl md:text-3xl text-xl font-bold mb-12">
              Our Mission
            </div>
            <p className="lg:text-xl lg:leading-6 md:text-base md:leading-5 text-sm leading-4 font-medium">
              At Meant, <strong>our mission</strong> is simple: to create
              high-quality, effective, and cruelty-free beauty products that
              enhance your natural beauty while promoting wellness and
              self-care. We are dedicated to using only the finest, ethically
              sourced ingredients and to being transparent about what goes into
              our products. We strive to innovate and set new standards in the
              beauty industry by prioritizing social responsibility.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/assets/images/mission.jpeg"
              alt="Our Mission Banner"
              width={567}
              height={537}
              className="object-cover rounded"
            />
          </div>
        </div>

        <div className="bg-white w-full max-w-screen-lg mt-12 rounded-[10px] flex flex-col items-center p-6 min-h-[280px]">
          <div className="text-black playfair font-bold text-center lg:text-4xl md:text-2xl text-xl mt-6 mb-4">
            Our Values
          </div>
          <div className="flex flex-wrap justify-center gap-16 mt-6">
            <Image
              src="/AboutUs/1.png"
              alt="quality"
              width={85}
              height={85}
              className="hidden md:block"
            />
            <Image
              src="/AboutUs/3.png"
              alt="transparency"
              width={85}
              height={85}
              className="hidden md:block"
            />
            <Image
              src="/AboutUs/2.png"
              alt="Inclusivity"
              width={85}
              height={85}
              className="hidden md:block"
            />
            <Image
              src="/AboutUs/4.png"
              alt="empowerment"
              width={85}
              height={85}
              className="hidden md:block"
            />
            <div className="w-10 h-10 md:hidden bg-black rounded-full flex justify-center items-center">
              <div className="text-xs font-medium text-white">QUALITY</div>
            </div>
            <div className="w-10 h-10 md:hidden bg-black rounded-full flex justify-center items-center">
              <div className="text-xs font-medium text-white">TRANSPARENCY</div>
            </div>
            <div className="w-10 h-10 md:hidden bg-black rounded-full flex justify-center items-center">
              <div className="text-xs font-medium text-white">INCLUSIVITY</div>
            </div>
            <div className="w-10 h-10 md:hidden bg-black rounded-full flex justify-center items-center">
              <div className="text-xs font-medium text-white">EMPOWERMENT</div>
            </div>
          </div>
        </div>

        <div className="lg:mb-[200px] md:w-[650px] m-auto md:h-[321px] lg:w-full mt-12 rounded-md lg:h-[537px] w-[309px] h-[162px] gap-2 md:gap-4 lg:gap-4 flex justify-center items-center">
  <div className="lg:w-[50%] lg:h-[537px] md:w-[510px] md:h-[321px] w-[162px] h-[162px] rounded-md overflow-hidden border-r-[10px] border-l-[10px] border-black">
    <Image
      src="/assets/images/vision.jpeg"
      alt="Our Vision Banner"
      width={510}
      height={537}
      className="md:w-[510px] md:h-[321px] lg:h-[537px] w-[162px] h-[162px] overflow-hidden rounded-md object-cover"
    />
  </div>
  <div className="flex justify-center items-center w-1/2">
    <div className="text-black w-[154px] md:w-[309px] md:h-[321px] h-[162px] lg:h-[537px] bg-white rounded-md playfair flex flex-col text-center justify-center items-center lg:w-[567px] m-auto p-2 lg:p-4 gap-1 lg:gap-6">
      <div className="lg:text-[48px] font-bold lg:leading-[63px] md:text-[36px] text-[20px]">
        Our Vision
      </div>
      <div className="lg:text-[20px] lg:w-[80%] lg:leading-[26px] font-medium md:text-[16px] md:leading-[21px] text-[7px] leading-[9.33px]">
        <strong>Our vision</strong> is to redefine beauty standards by promoting inclusivity, diversity, and authenticity. We envision a world where everyone feels valued and beautiful in their own skin, free from societal pressures and stereotypes. We aim to lead the beauty industry towards a more sustainable future, where every product not only makes a difference to your skin but also contributes positively to the environment and society.
      </div>
    </div>
  </div>
</div>

      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
