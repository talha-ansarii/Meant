import Image from "next/image";
import React from "react";

const Icons = () => {
  return (
    <div className="bg-black w-full flex justify-center items-center py-12">
      <div className="flex gap-4">
      <div>

        <div className="w-[64px] h-[64px] rounded-full border flex flex-col justify-center items-center ">
          <Image
            src={"/HomePage/leaf.svg"}
            alt="icon"
            width={20}
            height={17}
            className="m-auto"
          />
          
        </div>
        <div className="w-full mt-2 text-[8px] leading-[12px] text-white font-[500] poppins-regular text-center ">vegan</div>
      </div>
      <div>
        <div className="w-[64px] h-[64px] rounded-full border flex justify-center items-center ">
          <Image
            src={"/HomePage/dog.svg"}
            alt="icon"
            width={22}
            height={20}
            className="m-auto"
          />
        </div>
        <div className="w-full mt-2 text-[8px] leading-[12px] text-white font-[500] poppins-regular text-center ">cruelty-free</div>

      </div>
      <div>
        <div className="w-[64px] h-[64px] rounded-full border flex justify-center items-center ">
          <Image
            src={"/HomePage/weed.svg"}
            alt="icon"
            width={14}
            height={19}
            className="m-auto"
          />
        </div>
        <div className="w-full mt-2 text-[8px] leading-[12px] text-white font-[500] poppins-regular text-center ">paraben free</div>

      </div>
      </div>
    </div>
  );
};

export default Icons;
