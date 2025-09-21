import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./GraphBar.css";

const GraphBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 탭이 활성화됐는지 확인
  const getActive = (tab) => {
    if (tab === "crime") return location.pathname.startsWith("/stats/crime");
    if (tab === "regional") return location.pathname.startsWith("/stats/regional");
    if (tab === "date") return location.pathname.startsWith("/stats/date");
    return false;
  };

  return (
    <div className="graph-bar">
      {/* 범죄 그래프 */}
      <div
        className={`menu-title ${getActive("crime") ? "active" : ""}`}
        onClick={() => navigate("/stats/crime")}
      >
        범죄 그래프
      </div>

      {/* 지역 그래프 */}
      <div
        className={`menu-title ${getActive("regional") ? "active" : ""}`}
        onClick={() => navigate("/stats/regional")}
      >
        지역 그래프
      </div>
      <ul>
        <li onClick={() => navigate("/stats/regional/seoul")}>서울</li>
        <li onClick={() => navigate("/stats/regional/busan")}>부산</li>
        <li onClick={() => navigate("/stats/regional/ulsan")}>울산</li>
      </ul>

      {/* 날짜 그래프 */}
      <div
        className={`menu-title ${getActive("date") ? "active" : ""}`}
        onClick={() => navigate("/stats/date")}
      >
        날짜 그래프
      </div>
    </div>
  );
};

export default GraphBar;
