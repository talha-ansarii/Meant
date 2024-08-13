"use client";
import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

function Tab({ show, setShow }) {
  const [isClient, setIsClient] = useState(false);
  const makeUpBox = useRef();
  const front = useRef();
  const [completed, setCompleted] = useState(0);
  const isSmallTab = useMediaQuery({ maxWidth: 1024 });

  useEffect(() => {
    setIsClient(true);
  }, [isClient]);



  function onLoad(spline) {
    const obj = spline.findObjectByName("cubeMainn");
    const obj1 = spline.findObjectByName("front");

    console.log("makeUpBox", obj);
    console.log("front", obj1);
    makeUpBox.current = obj;
    front.current = obj1;
  }

  useGSAP(() => {
    if (!isClient) return;

    let previousProgress = 0;
    // gsap.set(".canvas", {  y: -1100, scale: 1,
     
    //  });

    gsap.timeline({
      ease: "ease-in",
      scrollTrigger: {
        trigger: "#part1",
        start: "top 100%",
        end: "bottom bottom",
        scrub: 1.1,
        markers: false,
        onUpdate: (self) => {
          if (front.current) {
            // console.log(self.progress);
            const openRotation = self.progress * -50;
            front.current.rotation.x = openRotation * (Math.PI / 180);
            if (self.progress < 0.1) {
              front.current.rotation.x = 90 * (Math.PI / 180);
            }
          }
        },
      },
    }).fromTo(".canvas",{
      x:0 , y: -200, 
    }, { x: -300, y: 1400, scale: 1 });
  }, [isClient, front, makeUpBox]);


  if (!isClient) return null;


  return (
    <div className="">
    <div className="w-full relative flex justify-center items-center" style={{ height: "1000px" }}>
      {isClient && (
        <div className="">

        <Spline
          scene="https://prod.spline.design/sZmwIKHnHcT3CvuL/scene.splinecode"
          onLoad={onLoad}
          className="canvas"
        />
        </div>
      )}
    </div>
    <div id="part1" className="" style={{ height: "1000px" }}></div>
  </div>
  );
}

export default Tab;
