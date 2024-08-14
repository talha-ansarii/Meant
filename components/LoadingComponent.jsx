"use client";
import React, { useState, useEffect, useRef } from "react";
import Typewriter from 'typewriter-effect';

import gsap from 'gsap';

// Emoji component
const EmojiSequence = ({ emojis }) => {
  const emojiRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({ repeat: 0 });

    emojis.forEach((emoji, index) => {
      console.log(emoji)
      console.log(emojiRef.current)
      timeline
        .set((emojiRef.current), { attr: { src: emoji }  })  // Update the image source
        .fromTo(
          emojiRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
        )
        .to(emojiRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power1.in',
          delay: 0.5,
        });
    });
  }, [emojis]);

  return (
    <span>
      <img
        ref={emojiRef}
        alt="emoji"
        style={{ width: '30px', height: '30px', opacity: 0 }}
      />
    </span>
  );
};



// Main loading component
const LoadingComponent = ({text}) => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  // console.log(text)
  return (
    <div
    className="flex w-full h-full text-[20px] md:text-[24px] lg:text-[26px] justify-center items-center"
      style={{
        
        fontFamily: "monospace",
        textAlign: "center",
        
      }}
    >

    <div className={`flex gap-2 ${text === 'black' ?  ' text-black ' : ' text-white '}`} >
      <Typewriter
      
  onInit={(typewriter) => {
    typewriter.typeString('Unleashing MEANT Magic....')
      .callFunction(() => {
        console.log('String typed out!');
        setIsTypingComplete(true);
      })
      .pauseFor(2500)
      
      .start();
  }}
/>
      {isTypingComplete && <EmojiSequence emojis={["/assets/images/loader/1.png", "/assets/images/loader/2.png","/assets/images/loader/3.png"]}  />}

    </div>
    </div>
  );
};

export default LoadingComponent;
