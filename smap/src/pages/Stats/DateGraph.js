import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import "../../components/NavBar.css"; 
import GraphBar from "../../components/GraphBar";
import "../../components/GraphBar.css"
import "../../index.css";


const DateGraph = () => {
  return (
    <div>
      {/* 로고 */}
      <div className="smap-logo-fixed">
        <img src="/logo/SMap_Logo.png" alt="SMap Logo" className="smap-logo" />
        <div className="smap-text">smap</div>
      </div>

      {/* 네비게이션 바 */}
      <NavBar />

      {/* 사이드바 */}
      <GraphBar />

      {/* 그래프 영역 */}
      <div className="graph-container">
        <h2 className="graph-title">날짜 그래프</h2>
        {/* 그래프 */}
      </div>
    </div>
  );
};

export default DateGraph;
