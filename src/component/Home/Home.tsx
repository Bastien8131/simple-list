// import React from "react";
import "./Home.scss";

import { Tabs } from "@buildo/bento-design-system";
import { useEffect, useState } from "react";
import ListCollection from "../ListCollection/ListCollection.tsx";
import Parametre from "../Parametre/Parametre.tsx";

const Home = () => {

  const [tab, setTab] = useState('tab1')
  const tabs = [
    { label: "Mes Liste", value: "tab1" },
    { label: "Paramètre", value: "tab2" },
  ]

  const [mainHeight, setMainHeight] = useState('100vh');

  useEffect(() => {
    const height = document.getElementById('tabs')?.offsetHeight;
    if (height) {
      setMainHeight(`calc(${window.innerHeight}px - ${height}px)`);
    }
  }, []);



  return (
    <>
      <span id={'tabs'}>
        <Tabs size={"medium"} tabs={tabs} onChange={setTab} value={tab}/>
      </span>
      <main style={{height: mainHeight}}>
      {/*<main style={{ height: '100vh' }}>*/}
        {tab === 'tab1' && <ListCollection/>}
        {tab === 'tab2' && <Parametre/>}
      </main>

    </>
  );
};

export default Home;
