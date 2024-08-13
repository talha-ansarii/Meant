"use client";
import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

function Mobile() {
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
  }

  useEffect(() => {
    if (!isClient) return;

    let previousProgress = 0;
    gsap.set(".canvas", { x: 0, y: -200, scale: 1,
      width: "375px",height: "700px",
     });

    gsap.timeline({
      ease: "ease-in",
      scrollTrigger: {
        trigger: "#part1",
        start: "top 100%",
        end: "bottom bottom",
        scrub: 1.2,
        markers: false,
        onUpdate: (self) => {
          if (front.current) {
            const openRotation = self.progress * -50;
            front.current.rotation.x = openRotation * (Math.PI / 180);
            if (self.progress < 0.1) {
              front.current.rotation.x = 90 * (Math.PI / 180);
            }
          }
        },
      },
    }).to(".canvas", { x: 0, y: 900, scale: 0.7 });
  }, [isClient, front, makeUpBox]);

  if (!isClient) return null;

  return (
    <div className="">
      <div className="w-full flex justify-center items-center" style={{ height: "900px" }}>
        {isClient && (
          <Spline
            scene="https://prod.spline.design/Ic5MH5N18crooTAz/scene.splinecode"
            onLoad={onLoad}
            className="canvas"
          />
        )}
      </div>
      <div id="part1" className="" style={{ height: "900px" }}></div>
    </div>
  );
}

export default Mobile;
