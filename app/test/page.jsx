"use client"
import Spline from "@splinetool/react-spline";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  const makeUpBox = useRef();
  const makeuoBox2 = useRef();

  function onLoad(spline) {
    const obj = spline.findObjectById("9b2dc0a9-b0bd-44d9-89e0-dd14cfcdaa2a");
    const obj2 = spline.findObjectById("4e15a36f-f25a-4f2e-b727-c7bd9b38b7dd")

    // save it in a ref for later use
    // makeUpBox.current = obj;
    // console.log(makeUpBox.current);
    // console.log(obj)
    // console.log(obj2)
    makeUpBox.current = obj;
    makeuoBox2.current = obj2;
    
  }

  function triggerAnimation() {
    makeUpBox.current.emitEvent("mouseHover");
    // makeuoBox2.current.emitEvent("keyUp");
    
  }

  useGSAP(() => {
    // gsap code here...
    gsap.set(".canvas", { x: 450, y: 0, });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#part1",
          start: "top 60%",
          end: "bottom bottom",
          scrub: true,
          markers: true,
          onEnter: () => {
            triggerAnimation();
          },
        },
      })
      .to(".canvas", { y: 1200 });
  }); // <-- scope for selector text (optional)

  return (
    <>
      <div className="z-[1000]" style={{ height: "900px", display: "flex", justifyContent:"center", alignItems: "center" }}>
      <Spline
      onLoad={onLoad}
      className="canvas"
        scene="https://prod.spline.design/pyUGcJz3VGorp4uk/scene.splinecode" 
        width={1000}
        height={1000}
        
      />
      </div>
      <div id="part1" style={{ height: "900px" }}>
        <div></div>
        <div>
          <h2>GOOD GAME WELL PLAYED.</h2>
          <button type="button" onClick={triggerAnimation}>
            Trigger Spline Animation
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

