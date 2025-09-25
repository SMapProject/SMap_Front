import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import "../../components/NavBar.css";
import ReportBar from "../../components/ReportBar"; 
import "../../components/ReportBar.css";
import "../../index.css";

const CrimeReport = () => {
  return (
    <div>
      {/* 로고 */}
      <div className="smap-logo-fixed">
        <img src="/logo/SMap_Logo.png" alt="SMap Logo" className="smap-logo" />
        <div className="smap-text">smap</div>
      </div>

      {/* 네비게이션 바 */}
      <NavBar />

      <div className="content-area">
        {/* 사이드 바 */}
        <ReportBar />
      </div>



    </div>
  );
};

export default CrimeReport;
