import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import "../../components/NavBar.css"; 
import GraphBar from "../../components/GraphBar";
import "../../components/GraphBar.css";
import "../../index.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const CrimeGraph = () => {
  const [crimeData, setCrimeData] = useState({
    개인범죄: 0,
    재산범죄: 0,
    사회범죄: 0,
    특별범죄: 0,
  });

  // 데이터 가져오기
  useEffect(() => {
    // *******************************************
    fetch("/api/") // api 여기에 넣
      .then((res) => {
        if (!res.ok) throw new Error("API 호출 실패");
        return res.json();
      })
      .then((data) => {
        // data = { 개인범죄: 12, 재산범죄: 25, 사회범죄: 8, 특별범죄: 5 }
        setCrimeData(data);
      })
      .catch((err) => {
        console.error("Error fetching crime data:", err);
      });
  }, []);

  const data = {
    labels: ["개인범죄", "재산범죄", "사회범죄", "특별범죄"],
    datasets: [
      {
        label: "범죄 발생 건수",
        data: [
          crimeData.개인범죄,
          crimeData.재산범죄,
          crimeData.사회범죄,
          crimeData.특별범죄,
        ],
        backgroundColor: ["#000000", "#3A3A3A", "#848484", "#373737"],
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
    },
  };

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
        <h2 className="graph-title">범죄 그래프</h2>
        <div className="chart-container">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CrimeGraph;
