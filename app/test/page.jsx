"use client"
import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";


gsap.registerPlugin(useGSAP, ScrollTrigger);

function Animation({show,setShow}) {

  const [isClient, setIsClient] = useState(false);
  const makeUpBox = useRef();
  const front = useRef();
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const isTablet = useMediaQuery({ maxWidth: 1024 });

useEffect(() => {
    setIsClient(true);
}, []);




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
    gsap.set(".canvas", { x: 250, y: -120, scale: 1.3
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
            // console.log(self.progress);
            if(front.current){
              const openRotation = self.progress * -100;
              front.current.rotation.x = openRotation * (Math.PI / 180);
              // front.current.rotation.x = -115;
              if(self.progress === 0){
                front.current.rotation.x = 90 * (Math.PI / 180) ;
              }

            }
            
          },
          onLeave: () => {
            // front.current.rotation.x = 150 * (Math.PI / 180);
          },  
        },
      })
      .to(".canvas", { x: -250, y: 900, scale: 1 });

    gsap
      .timeline({
        ease: "ease-in",
        scrollTrigger: {
          trigger: "#part2",
          start: "top 100%",
          end: "bottom bottom",
          scrub: 1.2,
          markers: false,
          onEnter: () => {
            // hello();
          },
          onUpdate: (self) => {
            const rotationAmount = self.progress * 360;
            if(makeUpBox.current){
              makeUpBox.current.rotation.y = rotationAmount * (Math.PI / 180);

            }
          },
          onToggle: (self) => {
            if (!self.isActive) {
              setShow(false); // Set state back to false when starting to scroll up
            }}
          
          
        },
      })
      
      .to(".canvas", { x: 500, y: 1900, scale: 1,
        display: "none",
        onComplete: () => {
          // console.log("completed");
          setShow(true); 
        },
        
       }); 

  },[front, makeUpBox]);

  useEffect(() => {
    console.log(show)
  }, [show]);

  if(isMobile){
    if(isClient){
      return null
    }
  }
  if(isTablet){
    if(isClient){
      return null
    }
  }

  

  return (
    <div className="overflow-hidden">
      <div style={{ height: "900px" }}>
      {
        !isMobile && !isTablet && (
          <Spline
          
        scene="https://prod.spline.design/pyUGcJz3VGorp4uk/scene.splinecode" 
        onLoad={onLoad}
        className="canvas"  
      />

        )
      }
      </div>
      <div id="part1" className="w-[200px]" style={{ height: "900px" }}></div>
      <div id="part2" className="w-[200px]" style={{ height: "900px" }}>
        
      </div>
    </div>
  );
}

export default Animation;