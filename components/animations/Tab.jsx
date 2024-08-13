"use client";
import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

function Tab({ show, setShow }) {
  const [isClient, setIsClient] = useState(false);
  const makeUpBox = useRef();
  const front = useRef();
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, [isClient]);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
  }, []);

  function onLoad(spline) {
    const obj = spline.findObjectByName("cubeMainn");
    const obj1 = spline.findObjectByName("front");
    makeUpBox.current = obj;
    front.current = obj1;
  }

  useEffect(() => {
    if (!isClient) return;

    let previousProgress = 0;
    gsap.set(".canvas", {
      x: "80%",
      y: "-100%",
      scale: 2,
      width: "900px",
      height: "900px",
    });

    gsap
      .timeline({
        ease: "ease-in",
        scrollTrigger: {
          trigger: "#part1",
          start: "top 100%",
          end: "bottom bottom",
          scrub: 1.2,
          markers: false,
          onUpdate: (self) => {
            console.log(self.progress);
            if (front.current) {
              const openRotation = self.progress * -100;
              front.current.rotation.x = openRotation * (Math.PI / 180);
              if (self.progress < 0.35) {
                front.current.rotation.x = 90 * (Math.PI / 180);
              }
            }
          },
        },
      })
      .to(".canvas", {
        x: -70,
        y: 1180,
        scale: 0.7,
        onComplete: () => setCompleted(1),
      });
  }, [isClient, front, makeUpBox]);

  if (!isClient) return null;

  return (
    <div className="">
      <div
        id="part0"
        className="w-full justify-center items-center"
        style={{ height: "900px", overflow: "visible" }}
      >
        {isClient && (
          <Spline
            scene="https://prod.spline.design/pGWBcDIoqaKBrAHg/scene.splinecode"
            onLoad={onLoad}
            className="canvas relative z-[200]"
          />
        )}
      </div>
      <div
        id="part1"
        className="relative z-[100]"
        style={{ height: "900px" }}
      ></div>
    </div>
  );
}

export default Tab;
