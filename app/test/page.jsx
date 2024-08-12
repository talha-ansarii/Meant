"use client"
import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";


gsap.registerPlugin(useGSAP, ScrollTrigger);

function Animation({show,setShow}) {


  const makeUpBox = useRef();
  const front = useRef();
  






  function onLoad(spline) {

    const obj = spline.findObjectByName("cubeMainn");
    const obj1 = spline.findObjectByName("front");
    console.log(obj1);
    console.log(obj);

    // save it in a ref for later use
    makeUpBox.current = obj;
    front.current = obj1;
  }


 

  useGSAP(() => {
    // gsap code here...

    let previousProgress = 0;
    gsap.set(".canvas", { x: 0, y: -100, scale: 0.8
     });

    gsap
      .timeline({
        ease: "ease-in",
        scrollTrigger: {
          trigger: "#part1",
          start: "top 100%",
          end: "bottom bottom",
          scrub: 1,
          markers: true,
          onUpdate: (self) => {
            console.log(self.progress);
            if(front.current){
              const openRotation = self.progress * -100;
              front.current.rotation.x = openRotation * (Math.PI / 180);
              // front.current.rotation.x = -115;
              if(self.progress < 0.04){
                front.current.rotation.x = 90 * (Math.PI / 180) ;
              }

            }
            
          },
          onLeave: () => {
            // front.current.rotation.x = 150 * (Math.PI / 180);
          },  
        },
      })
      .to(".canvas", { x: 0, y: 1000, scale: 0.8 });

     

  },[front, makeUpBox]);


  

  

  return (
    <div className="">
      <div className="w-full justify-center items-center" style={{ height: "900px" }}>
      
          <Spline
          
        // scene="https://prod.spline.design/pyUGcJz3VGorp4uk/scene.splinecode" 
        
        
        scene="https://prod.spline.design/pGWBcDIoqaKBrAHg/scene.splinecode"
        onLoad={onLoad}
        className="canvas"  
      />

        
      </div>
      <div id="part1" className="bg-white" style={{ height: "900px" }}></div>
        
    </div>
  );
}

export default Animation;