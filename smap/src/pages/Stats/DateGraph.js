import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import "../../components/NavBar.css"; 
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
  const timeRanges = [
    "00:00~02:59",
    "03:00~05:59",
    "06:00~08:59",
    "09:00~11:59",
    "12:00~14:59",
    "15:00~17:59",
    "18:00~20:59",
    "21:00~23:59"
  ];

  const crimeTypes = [
    "강력범죄",
    "절도범죄",
    "폭력범죄",
    "지능범죄",
    "풍속범죄"
  ];

  const [crimeData, setCrimeData] = useState({
    labels: timeRanges,
    values: Array(8).fill(0)
  });

  useEffect(() => {
    const fetchData = async () => {
      const values = Array(8).fill(0);
      const counts = Array(8).fill(0);

      for (let i = 0; i < timeRanges.length; i++) {
        const time = timeRanges[i];
        console.log(`\n=== Fetching data for time range: ${time} ===`);

        const promises = crimeTypes.map(type =>
          fetch(
            `https://port-0-smap-backend-mhkpzrkrde061e33.sel3.cloudtype.app/timeGraph/search?crimetype=${encodeURIComponent(type)}&time=${encodeURIComponent(time)}`
          )
            .then(res => res.json())
            .catch(err => {
              console.error(`Error fetching ${type} at ${time}:`, err);
              return [];
            })
        );

        const allData = await Promise.all(promises);

        allData.forEach((data, idx) => {
          const type = crimeTypes[idx];
          console.log(`Data for ${type} at ${time}:`, data);

          if (Array.isArray(data)) {
            data.forEach(item => {
              if (item && typeof item.count === "number") {
                values[i] += item.count;
                counts[i] += 1;
              }
            });
          } else {
            console.warn(`Invalid data for ${type} at ${time}:`, data);
          }
        });

        console.log(
          `Accumulated sum for ${time}: ${values[i]}, count: ${counts[i]}`
        );
      }

      const avgValues = values.map((sum, i) =>
        counts[i] ? sum / counts[i] : 0
      );

      console.log("\nFinal average values per time range:", avgValues);

      setCrimeData(prev => ({ ...prev, values: avgValues }));
    };

    fetchData();
  }, []);

  const data = {
    labels: crimeData.labels,
    datasets: [
      {
        label: "범죄율(평균)",
        data: crimeData.values,
        borderColor: "#000000",
        backgroundColor: "transparent",
        tension: 0,
        fill: false,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "시간대별 범죄율" },
    },
    scales: {
      y: {
        min: 0,
        max: 100000,
        ticks: { stepSize: 10000 },
        title: { display: true, text: "범죄율" },
      },
      x: {
        title: { display: true, text: "시간대" },
        ticks: {
          callback: function(value, index) {
            const hour = crimeData.labels[index].split("~")[0].split(":")[0];
            return hour;
          }
        }
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

      {/* 그래프 영역 */}
      <div className="graph-container">
        <h2 className="graph-title">시간대별 범죄율</h2>
        <div className="line-graph">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DateGraph;
