"use client"
import Spline from '@splinetool/react-spline';
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
export default function Model() {

    useGSAP(() => {
        // gsap code here...
        gsap.set(".canvas", { x: -600, y: -300, scale: 1,
            width: 1200, height: 2000
         });
    
      }); 

      
  return (
      <Spline
        className="canvas"
        scene="https://prod.spline.design/dCkG7rHe5yYaZYKf/scene.splinecode"
        width={1200}
        height={2000}
      />
  );
}
