import React from 'react'
import { TypewriterEffect } from './ui/typewriter-effect';

const Loader = () => {

    const words = [
        {
          text: "Unleashing ",
        },
        {
          text: "MEANT ",
        },
        {
          text: "Magic",
        },
        {
          text: "...",
        }
      ];


  return (
    <div>
         <TypewriterEffect words={words} />
    </div>
  )
}

export default Loader