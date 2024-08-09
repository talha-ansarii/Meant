"use client"
import Spline from "@splinetool/react-spline";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
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
    gsap.set(".canvas", { x: 250, y: -120, scale: 1.3
     });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#part1",
          start: "top 100%",
          end: "bottom bottom",
          scrub: true,
          markers: true,
          onUpdate: (self) => {
            const openRotation = self.progress * -100;
            front.current.rotation.x = openRotation * (Math.PI / 180);
          },
          onLeave: () => {
            // front.current.rotation.x = 150 * (Math.PI / 180);
          },
        },
      })
      .to(".canvas", { x: -350, y: 850, scale: 0.8 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#part2",
          start: "top 120%",
          end: "bottom bottom",
          scrub: true,
          markers: true,
          onEnter: () => {
            // hello();
          },
          onUpdate: (self) => {
            const rotationAmount = self.progress * 360;
            makeUpBox.current.rotation.y = rotationAmount * (Math.PI / 180);
          },
          // onLeave: () => {
          //   makeUpBox.current.rotation.y = 360 * (Math.PI / 180);
          // },
        },
      })
      .to(".canvas", { x: 600, y: 2000, scale: 1 }); 

    // gsap
    //   .timeline({
    //     scrollTrigger: {
    //       trigger: "#part3",
    //       start: "top 50%",
    //       end: "bottom bottom",
    //       scrub: true,
    //       markers: true,
    //       onUpdate: (self) => {
    //         const rotationAmount = 180 + self.progress * 180;
    //         makeUpBox.current.rotation.y = rotationAmount * (Math.PI / 180); // convert degrees to radians
    //       },
    //     },
    //   })
    //   .to(".canvas", { x: 500, y: 2900 });
  });

  return (
    <div className="overflow-x-hidden">
      <div style={{ height: "900px" }}>
        {/* <Spline
          className="canvas"
          scene="https://prod.spline.design/jL9G0UpjEWRmmfGt/scene.splinecode"
          onLoad={onLoad}
        /> */}
          <Spline
        scene="https://prod.spline.design/pyUGcJz3VGorp4uk/scene.splinecode" 
        onLoad={onLoad}
        className="canvas"

        
      />
      </div>
      <div id="part1" className="bg-yellow-300" style={{ height: "900px" }}></div>
      <div id="part2" className="bg-white" style={{ height: "900px" }}></div>
      <div id="part3" className="bg-red-300" style={{ height: "900px" }}></div>
    </div>
  );
}

export default App;