// import React from "react";

import {motion} from "framer-motion";

export default function OutsideFrame({children, showFrame}: { children: React.ReactNode, showFrame?: boolean }){

  // const body = document.querySelector('body');
  // const height = body?.getBoundingClientRect().height || 0;

  return (
    <>
      {showFrame && (
        <motion.div
          initial={{
            y: 0,
            width: `${window.innerWidth}px`,
            height: `${window.innerHeight}px`,
            minHeight: `${window.innerHeight}px`,
            left: '0',
          }}
          animate={{
            y: - window.innerHeight + 20,
            position: "absolute"
          }}
          exit={{y: 0}}
          transition={{
            duration: 0.3
          }}
        >
          {children}
        </motion.div>
      )}
    </>
  )
}