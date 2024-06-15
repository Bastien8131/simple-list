// import React from "react";

import {motion} from "framer-motion";

export default function OutsideFrame({children, showFrame}: { children: React.ReactNode, showFrame?: boolean }){


  return (
    <>
      {showFrame && (
        <motion.div
          initial={{
            y: 0,
            width: '100vw',
            height: '100vh',
            minHeight: '100vh',
            left: '0',
          }}
          animate={{
            y: -window.screen.height + 20,
            position: "absolute"
          }}
          exit={{ y: 0 }}
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