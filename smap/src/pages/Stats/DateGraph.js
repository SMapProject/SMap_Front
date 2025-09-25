import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import "../../components/NavBar.css"; 
import GraphBar from "../../components/GraphBar";
import "../../components/GraphBar.css";
import "../../index.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DateGraph = () => {
  const [crimeData, setCrimeData] = useState({ labels: [], values: [] });

  // 데이터 가져오기
  useEffect(() => {
    // *******************************
    fetch("/api/") // api 여기 넣
      .then((res) => res.json())
      .then((data) => {
        /*
        { "hour": 0, "rate": 30 },
        { "hour": 3, "rate": 25 },
         ...
        */
        const labels = Array.from({ length: 24 }, (_, i) => i); // 0~23시
        const values = Array(24).fill(0);
        const counts = Array(24).fill(0);

        data.forEach(item => {
          values[item.hour] += item.rate;
          counts[item.hour] += 1;
        });

        const avgValues = values.map((sum, i) => counts[i] ? sum / counts[i] : 0);
        setCrimeData({ labels, values: avgValues });
      })
      .catch((err) => console.error(err));
  }, []);

  const data = {
    labels: crimeData.labels,
    datasets: [
      {
        label: "범죄율",
        data: crimeData.values,
        borderColor: "#848484",
        backgroundColor: "#000000",
        tension: 0,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "시간대별 범죄율 (3시간 단위)" },
    },
    scales: {
      y: { 
        min: 0, 
        max: 100, 
        ticks: { stepSize: 10 }, 
        title: { display: true, text: "범죄율" } 
      },
      x: {
        title: { display: true, text: "시각" },
        ticks: {
          callback: function(value, index) {
            return value % 3 === 0 ? value : "";
          },
          maxRotation: 0,
          minRotation: 0,
          padding: 10,
        },
        grid: { drawTicks: true },
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
        <h2 className="graph-title">날짜 그래프</h2>
        <div className="line-graph">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DateGraph;
