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

const Busan = () => {
  const [crimeData, setCrimeData] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const crimeTypes = ["강력범죄", "절도범죄", "폭력범죄", "지능범죄", "풍속범죄"];
    console.log("부산 범죄 데이터 가져오기 시작...");

    Promise.all(
      crimeTypes.map((type) =>
        fetch(`https://port-0-smap-backend-main-mhkpzrkrde061e33.sel3.cloudtype.app/areaGraph/search?region=부산&crimetype=${encodeURIComponent(type)}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(`${type} 데이터:`, data);
            return data[0]?.count || 0; // count 값 가져오기, 없으면 0
          })
          .catch((err) => {
            console.error(`${type} 데이터 가져오기 실패:`, err);
            return 0;
          })
      )
    ).then((counts) => {
      setCrimeData(counts);
      console.log("state에 저장된 범죄 데이터:", counts);
    });
  }, []);

  const data = {
    labels: ["강력범죄", "절도범죄", "폭력범죄", "지능범죄", "풍속범죄"],
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
        text: "범죄 종류별 건수",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 15000,
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
        <div className="chart-container">
        <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Busan;
