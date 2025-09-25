import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import "../../../components/NavBar.css"; 
import GraphBar from "../../../components/GraphBar";
import "../../../components/GraphBar.css";
import "../../../index.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Daegu = () => {
  const [crimeData, setCrimeData] = useState([0, 0, 0, 0]);

  useEffect(() => {
    // ***********************************
    fetch("api") // api 여기에 넣
      .then((res) => res.json())
      .then((data) => {
        // data = { 개인범죄: 35, 재산범죄: 70, 사회범죄: 50, 특별범죄: 90 } 횟수
        setCrimeData([
          data["개인범죄"],
          data["재산범죄"],
          data["사회범죄"],
          data["특별범죄"],
        ]);
      })
      .catch((err) => {
        console.error("범죄 데이터 가져오기 실패:", err);
      });
  }, []);

  const data = {
    labels: ["개인범죄", "재산범죄", "사회범죄", "특별범죄"],
    datasets: [
      {
        label: "범죄건수",
        data: crimeData,
        backgroundColor: ["#3A3A3A"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "대구 범죄 종류별 건수",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
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
        <h2 className="graph-title">부산 범죄 그래프</h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Daegu;
