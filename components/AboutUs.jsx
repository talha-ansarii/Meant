import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";
const AboutUs = () => {
  return (
    <div className="w-full  pb-4 flex flex-col items-center">
      <div className="w-full  m-auto mt-0 md:mt-0 lg:mt-0">
        <div className="md:w-[80%] lg:w-[80%] w-full m-auto flex justify-center">
          <Image
            src="/assets/images/aboutusbaanner.png"
            alt="About Us Banner"
            width={1240}
            height={600}
            className="object-cover rounded-md"
          />
        </div>
        <div className="bg-white w-[80%] m-auto  mt-12 rounded-[10px] flex flex-col items-center px-6 py-12">
          <div className="text-black playfair font-medium text-center lg:w-[80%] md:w-[80%] w-full">
          <div className="lg:text-4xl md:text-3xl text-xl font-bold mb-4 lg:mb-12 md:mb-12">
              About Us
            </div>
            <p className="lg:text-2xl lg:leading-8 md:text-lg md:leading-6 text-sm leading-4">
              Welcome to <b>Meant,</b> where every product is crafted with
              intention, purpose, and a commitment to making a difference. We
              believe that beauty is more than skin deep; it's about embracing
              your true self and celebrating your unique essence. We thrive to
              empower individuals to feel confident and beautiful in their skin,
              while making a positive impact on the world around us.
            </p>
          </div>
        </div>

        <div className="bg-white w-[80%] m-auto mt-12 rounded-[10px] flex md:flex-row items-center justify-center">
          <div className="text-black h-[183px] md:h-auto lg:h-auto playfair flex flex-col items-center text-center lg:w-1/2 md:w-1/2 w-[60%] p-4 lg:p-8 md:p-12">
            <div className="lg:text-4xl md:text-3xl text-[20px] font-bold mb-2 md:mb-12 lg:mb-12">
              Our Mission
            </div>
            <p className="lg:text-xl lg:leading-6 md:text-base md:leading-5 text-[7px] leading-[9px] font-medium">
              At Meant, <strong>our mission</strong> is simple: to create
              high-quality, effective, and cruelty-free beauty products that
              enhance your natural beauty while promoting wellness and
              self-care. We are dedicated to using only the finest, ethically
              sourced ingredients and to being transparent about what goes into
              our products. We strive to innovate and set new standards in the
              beauty industry by prioritizing social responsibility.
            </p>
          </div>
          <div className="lg:w-[567px] h-[183px] md:h-auto lg:h-auto w-[40%] md:w-1/2 ">
            <Image
              src="/assets/images/mission.jpeg"
              alt="Our Mission Banner"
              width={567}
              height={537}
              className="object-cover h-[100%] w-full object-right rounded-r-[10px]"
            />
          </div>
        </div>

        <div className="bg-white w-[80%] m-auto mt-12 rounded-[10px] flex flex-col items-center p-6 min-h-[180px]">
          <div className="text-black playfair font-bold text-center lg:text-4xl md:text-2xl text-xl mt-6 mb-4">
            Our Values
          </div>
          <div className="flex flex-wrap flex-col md:flex-row lg:flex-row gap-8 justify-center md:gap-8 lg:gap-16 mt-6">
            
            <div className="lg:w-[154px] lg:h-[42px] md:w-[147px] md:h-[36px] w-[142px] h-[27px]  md:flex bg-black rounded-full flex justify-center items-center">
              <div className="text-xs font-medium text-white">QUALITY</div>
            </div>
            <div className="lg:w-[154px] lg:h-[42px] w-[142px] h-[27px] md:w-[147px] md:h-[36px] md:flex bg-black rounded-full flex justify-center items-center">
              <div className="text-xs font-medium text-white">TRANSPARENCY</div>
            </div>
            <div className="lg:w-[154px] lg:h-[42px] md:w-[147px] w-[142px] h-[27px] md:h-[36px] md:flex bg-black rounded-full flex justify-center items-center">
              <div className="text-xs font-medium text-white">INCLUSIVITY</div>
            </div>
            <div className="lg:w-[154px] lg:h-[42px] md:w-[147px] w-[142px] h-[27px] md:h-[36px] md:flex bg-black rounded-full flex justify-center items-center">
              <div className="text-xs font-medium text-white">EMPOWERMENT</div>
            </div>
          </div>
        </div>

        <div className="lg:mb-[200px] md:w-[650px] m-auto md:h-[321px] lg:w-[80%] mx-auto mt-12 rounded-md lg:h-[537px] w-[80%] h-[162px] gap-2 md:gap-4 lg:gap-4 flex justify-center items-center">
          <div className="lg:w-[50%] lg:h-[537px] md:w-[510px] md:h-[321px] w-[50%] h-[162px] rounded-md overflow-hidden   border-black">
            <Image
              src="/assets/images/vision.jpeg"
              alt="Our Vision Banner"
              width={510}
              height={537}
              className="md:w-[510px] md:h-[321px] lg:h-[537px] w-[100%] h-[162px] overflow-hidden rounded-md object-cover"
            />
          </div>
          <div className="flex justify-center items-center w-1/2">
            <div className="text-black w-[100%] md:w-[309px] md:h-[321px] h-[162px] lg:h-[537px] bg-white rounded-md playfair flex flex-col text-center justify-center items-center lg:w-[567px] m-auto p-2 lg:p-4 gap-1 lg:gap-6">
              <div className="lg:text-[48px] font-bold lg:leading-[63px] md:text-[36px] text-[20px]">
                Our Vision
              </div>
              <div className="lg:text-[20px] lg:w-[80%] lg:leading-[26px] font-medium md:text-[16px] md:leading-[21px] text-[7px] leading-[9.33px]">
                <strong>Our vision</strong> is to redefine beauty standards by
                promoting inclusivity, diversity, and authenticity. We envision
                a world where everyone feels valued and beautiful in their own
                skin, free from societal pressures and stereotypes. We aim to
                lead the beauty industry towards a more sustainable future,
                where every product not only makes a difference to your skin
                but also contributes positively to the environment and society.
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
