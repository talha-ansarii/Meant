import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (

    <div className="w-full mt-[-80px] md:mt-0 lg:mt-0 pb-4">
      <div className="w-[80%]  m-auto lg:pt-[100px] md:pt-[100px]">
        <div>
          <Image
            src="/assets/images/aboutusbaanner.jpeg"
            alt="About Us Banner"
            width={1240}
            height={600}
            className="lg:w-[1240px] lg:h-[600px] md:w-[834px] md:h-[361px] w-[360px] h-[226px] m-auto object-cover rounded-md"
          />
        </div>
        <div className="bg-[white] lg:w-[1240px] md:w-[650px] md:h-[274px] w-[310px] h-[202px] m-auto mt-12 rounded-md  flex justify-center items-center">
          <div className="text-black playfair font-[700] flex flex-col gap-6 text-center lg:w-[50%] md:w-[70%] w-[80%] m-auto  ">
            
            <div className="lg:text-[24px] lg:leading-[31px] md:text-[16px] md:leading-[21px] text-[8px] leading-[10px]">
            Welcome to <b>Meant,</b> where every product is crafted with intention, purpose, and a commitment to making a difference. We believe that beauty is more than skin deep; it's about embracing your true self and celebrating your unique essence. We thrive to empower individuals to feel confident and beautiful in their skin, while making a positive impact on the world around us.
            </div>
          </div>
        </div> 
        <div className="bg-[white]  lg:w-[1240px] md:w-[650px] w-[311px] h-[183px] font-[700] m-auto mt-12 rounded-md md:h-[348px]  lg:h-[537px] flex  justify-center items-center">
          <div className="text-black w-[179px] playfair flex flex-col lg:gap-6 text-center lg:w-[703px] md:w-[411px] md:h-[348px] m-auto p-4 ">
            <div className="lg:text-[48px] lg:leading-[63px] md:leading-[47px] md:text-[36px] font-[700] text-[20px]">Our Mission</div>
            <div className="lg:text-[20px] w-[90%] lg:w-[70%] m-auto lg:leading-[26px] font-[500] md:text-[14px] md:leading-[18px] text-[7px] leading-[9.33px] ">
              <b>At Meant,</b> our mission is simple: to create high-quality,
              effective, and cruelty free beauty products that enhance your
              natural beauty while promoting wellness and self-care. We are
              dedicated to using only the finest, ethically sourced ingredients
              and to being transparent about what goes into our products. We
              strive to innovate and set new standards in the beauty industry by
              prioritizing social responsibility.
            </div>
          </div>

          <div className="lg:w-[567px] lg:h-[537px] md:w-[334px] md:h-[348px] w-[132px] h-[183px] overflow-hidden ">
            <Image
              src="/assets/images/mission.jpeg"
              alt="Our Mission Banner"
              width={567}
              height={537}
              className="lg:w-[567px] lg:h-[537px] md:w-[334px] md:h-[348px] w-[132px] h-[183px] rounded-r-md  overflow-hidden object-cover"
            />
          </div> 
        </div>
        <div className="bg-[white] w-[310px] h-[120px] md:w-[650px] md:h-[232px] flex flex-col lg:pt-10 justify-center pt-4 lg:w-[1240px] m-auto mt-12 rounded-md lg:h-[428px]  items-center">
        <div className="lg:text-[48px] text-black playfair font-[700] lg:leading-[63px]  md:text-[50px] text-[20px]">Our Values</div>
          <div className="flex  w-[70%] m-auto justify-between">
            <Image src="/AboutUs/1.png" width={142} height={142} className="lg:w-[142px] lg:block lg:h-[142px] md:w-[85px] md:h-[85px] hidden " />
            <Image src="/AboutUs/3.png" width={142} height={142} className="lg:w-[142px] lg:block lg:h-[142px] md:w-[85px] md:h-[85px] hidden w-[35px] h-[35px] " />
            <Image src="/AboutUs/2.png" width={142} height={142} className="lg:w-[142px] lg:block lg:h-[142px] md:w-[85px] md:h-[85px] hidden w-[35px] h-[35px] " />
            <Image src="/AboutUs/4.png" width={142} height={142} className="lg:w-[142px] lg:block lg:h-[142px] md:w-[85px] md:h-[85px] hidden w-[35px] h-[35px] " />
            <div className="w-[35px]   md:w-[85px] md:h-[85px] md:flex lg:hidden h-[35px] bg-black rounded-full flex justify-center items-center">
              <div className="font-poppins  md:text-[10px] font-[500] text-[4px] text-white">QUALITY</div>
            </div>
            <div className="w-[35px] md:flex  md:w-[85px] md:h-[85px] lg:hidden h-[35px] bg-black rounded-full flex justify-center items-center">
              <div className="font-poppins  md:text-[10px] font-[500] text-[4px] text-white">TRANSPARENCY</div>
            </div>
            <div className="w-[35px] md:flex  md:w-[85px] md:h-[85px] lg:hidden h-[35px] bg-black rounded-full flex justify-center items-center">
              <div className="font-poppins md:text-[10px] font-[500] text-[4px] text-white">INCLUSIVITY</div>
            </div>
            <div className="w-[35px] md:text-[10px] md:w-[85px] md:h-[85px] md:flex lg:hidden h-[35px] bg-black rounded-full flex justify-center items-center">
              <div className="font-poppins md:text-[10px] font-[500] text-[4px] text-white">EMPOWERMENT</div>
            </div>
            
          </div>
        </div>
      </div>
      <div className=" lg:mb-[200px] md:w-[650px] m-auto  md:h-[321px]  lg:w-[1240px]   mt-12 rounded-md lg:h-[537px] w-[309px] h-[162px] gap-2 md:gap-4 lg:gap-4 flex justify-center items-center">
        <div className="lg:w-[610px]   lg:h-[537px] md:w-[309px] md:h-[321px] w-[162px] h-[162px] rounded-md overflow-hidden ">
          <Image
            src="/assets/images/vision.jpeg"
            alt="Our Vision Banner"
            width={610}
            height={537}
            className="lg:w-[610px] md:w-[309px] md:h-[321px] lg:h-[537px] w-[162px] h-[162px] overflow-hidden rounded-md object-bottom object-cover"
          />
        </div>
        <div className="text-black w-[154px] md:w-[309px] md:h-[321px] h-[162px] gap-1 lg:h-[537px] bg-[white] rounded-md playfair flex flex-col lg:gap-6 text-center justify-center items-center lg:w-[610px] m-auto p-2 lg:p-4 ">
          <div className="lg:text-[48px] font-[700] lg:leading-[63px]  md:text-[36px] text-[20px]">Our Vision</div>
          <div className="lg:text-[20px] lg:w-[80%] lg:leading-[26px] font-[500] md:text-[16px] md:leading-[21px]  text-[7px] leading-[9.33px] ">
            <span className="font-[700]">Our vision</span> is to redefine beauty standards by promoting inclusivity,
            diversity, and authenticity. We envision a world where everyone
            feels valued and beautiful in their own skin, free from societal
            pressures and stereotypes. We aim to lead the beauty industry
            towards a more sustainable future, where every product not only
            makes a difference to your skin but also contributes positively to
            the environment and society.
          </div>
        </div>
      </div>

    
      <Footer />
    </div>
  );
};

export default AboutUs;
