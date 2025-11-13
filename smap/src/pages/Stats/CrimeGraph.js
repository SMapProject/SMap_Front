import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import "../../components/NavBar.css";
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
    강력범죄: 0,
    절도범죄: 0,
    폭력범죄: 0,
    지능범죄: 0,
    풍속범죄: 0,
  });

  const getDayName = () => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const today = new Date();
    return days[today.getDay()];
  };

  useEffect(() => {
    const day = getDayName();
    const types = ["강력범죄", "절도범죄", "폭력범죄", "지능범죄", "풍속범죄"];

    console.log("오늘 요일:", day);

    Promise.all(
      types.map(async (type) => {
        // URL 생성
        const url = `https://port-0-smap-backend-mhkpzrkrde061e33.sel3.cloudtype.app/dateGraph/search?crimetype=${encodeURIComponent(type)}&date=${encodeURIComponent(day)}`;
        
        // 콘솔에 요청 정보 출력
        console.log("Fetch 시도 URL:", url);
        console.log("보내는 쿼리 파라미터 - crimetype:", type, "date:", day);

        try {
          const res = await fetch(url);
          console.log(`${type} 응답 상태:`, res.status);

          if (!res.ok) {
            console.error(`${type} 요청 실패`);
            return 0;
          }

          const data = await res.json();
          console.log(`${type} raw 데이터:`, data);

          // count 값 확인
          let countValue = 0;
          if (typeof data === "object") {
            if ("count" in data) {
              countValue = data.count;
            } else if (Array.isArray(data) && data[0]?.count !== undefined) {
              countValue = data[0].count;
            }
          }

          console.log(`${type} count 값:`, countValue);
          return countValue;

        } catch (err) {
          console.error(`${type} fetch 에러:`, err);
          return 0;
        }
      })
    ).then((results) => {
      console.log("최종 결과 배열:", results);
      setCrimeData({
        강력범죄: results[0],
        절도범죄: results[1],
        폭력범죄: results[2],
        지능범죄: results[3],
        풍속범죄: results[4],
      });
    });
  }, []);

  useEffect(() => {
    console.log("업데이트된 crimeData:", crimeData);
  }, [crimeData]);

  const data = {
    labels: ["강력범죄", "절도범죄", "폭력범죄", "지능범죄", "풍속범죄"],
    datasets: [
      {
        label: "범죄 발생 건수",
        data: [
          crimeData.강력범죄,
          crimeData.절도범죄,
          crimeData.폭력범죄,
          crimeData.지능범죄,
          crimeData.풍속범죄,
        ],
        backgroundColor: ["#000000", "#2a2a2aff", "#3a3a3aff", "#626262ff", "#dfdfdfff"],
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
      <div className="smap-logo-fixed">
        <img src="/logo/SMap_Logo.png" alt="SMap Logo" className="smap-logo" />
        <div className="smap-text">smap</div>
      </div>

      <NavBar />

      <div className="graph-container">
        <h2 className="graph-title">{getDayName()}요일 범죄 그래프</h2>
        <div className="crime-chart-container">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CrimeGraph;
