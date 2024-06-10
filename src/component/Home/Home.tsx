// import React from "react";
import "./Home.scss";

import { Tabs } from "@buildo/bento-design-system";
import { useEffect, useState } from "react";
import ListCollection from "../ListCollection/ListCollection.tsx";
import Parametre from "../Parametre/Parametre.tsx";
import { motion } from "framer-motion";

const Home = () => {

  const [tab, setTab] = useState('tab1')
  const tabs = [
    { label: "Mes Liste", value: "tab1" },
    { label: "Paramètre", value: "tab2" },
  ]

  const [mainHeight, setMainHeight] = useState('100vh');
  const [listVisible, setListVisible] = useState(false);

  useEffect(() => {
    const testHeight = document.getElementById('tabs')?.offsetHeight;
    if (testHeight) {
      setMainHeight(`calc(100vh - ${testHeight}px)`);
    }
  }, []);

  const changeListVisibility = () => {
    setListVisible(!listVisible)
  }

  return (
    <>
      <span id={'tabs'}>
        <Tabs size={"medium"} tabs={tabs} onChange={setTab} value={tab} />
      </span>
      <main style={{ height: mainHeight }}>
        {tab === 'tab1' && <ListCollection onExecute={changeListVisibility} />}
        {tab === 'tab2' && <Parametre />}
      </main>
      {listVisible && (
        <motion.div className={'test'}
          initial={{
            y: 0,
            width: '100vw',
            height: '100vh'
          }}
          animate={{
            y: -window.screen.height,
            position: "absolute"
          }}
          exit={{ y: 0 }}
          transition={{
            duration: 0.3
          }}

        >
          <p>Hello, Framer Motion!</p>
          <button onClick={() => setListVisible(!listVisible)}>Toggle</button>
        </motion.div>
      )}
    </>
  );
};

export default Home;
