"use client";
import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

function MobileNightModel() {
  const [isClient, setIsClient] = useState(false);
  const makeUpBox = useRef();
  const front = useRef();

  useEffect(() => {
    setIsClient(true);
  }, []);

  function onLoad(spline) {
    const obj = spline.findObjectByName("cubeMainn");
    const obj1 = spline.findObjectByName("front");
    makeUpBox.current = obj;
    front.current = obj1;

    console.log("makeUpBox", makeUpBox.current);
    console.log("front", front.current);

    // Add wobble effect
    if (makeUpBox.current) {
      gsap.to(makeUpBox.current.rotation, {
        x: "+=0.1",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 1,
      });
      

    }
    if(front.current){

        front.current.rotation.x = -70 * (Math.PI / 180);
    }
  }


  if (!isClient) return null;

  return (
      <div className="w-full flex justify-center items-center" >
        {isClient && (
          <Spline
             scene="https://prod.spline.design/Zcfwrzzkdlho5FXV/scene.splinecode" 
        width={300}
        height={567}
            onLoad={onLoad}
           
          />
        )}
      </div>
  );
}

export default MobileNightModel;
