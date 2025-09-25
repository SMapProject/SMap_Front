import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./GraphBar.css";

const GraphBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isRegionalPage = location.pathname.startsWith("/Stats/Regional");
  const [isRegionalOpen, setIsRegionalOpen] = useState(isRegionalPage);


  const getActive = (tab) => {
    if (tab === "crime") return location.pathname.startsWith("/Stats/Crime");
    if (tab === "regional") return location.pathname.startsWith("/Stats/Regional");
    if (tab === "date") return location.pathname.startsWith("/Stats/Date");
    return false;
  };

  return (
    <div className="graph-bar">
      {/* 범죄 그래프 */}
      <div
        className={`menu-title ${getActive("crime") ? "active" : ""}`}
        onClick={() => navigate("/Stats/Crime")}
      >
        범죄 그래프
      </div>

      {/* 지역 그래프 (토글) */}
      <div
        className={`menu-title ${getActive("regional") ? "active" : ""}`}
        onClick={() => setIsRegionalOpen(!isRegionalOpen)}
      >
        지역 그래프
      </div>

      {isRegionalOpen && (
        <div className="region-list">
          <div
            className={`region-item ${location.pathname.includes("/Stats/Regional/Seoul") ? "active" : ""}`}
            onClick={() => navigate("/Stats/Regional/Seoul")}
          >
            ↳ 서울특별시
          </div>
          <div
            className={`region-item ${location.pathname.includes("/Stats/Regional/Busan") ? "active" : ""}`}
            onClick={() => navigate("/Stats/Regional/Busan")}
          >
            ↳ 부산광역시
          </div>
          <div
            className={`region-item ${location.pathname.includes("/Stats/Regional/Daegu") ? "active" : ""}`}
            onClick={() => navigate("/Stats/Regional/Daegu")}
          >
            ↳ 대구광역시
          </div>
          <div
            className={`region-item ${location.pathname.includes("/Stats/Regional/Incheon") ? "active" : ""}`}
            onClick={() => navigate("/Stats/Regional/Incheon")}
          >
            ↳ 인천광역시
          </div>
          <div
            className={`region-item ${location.pathname.includes("/Stats/Regional/Gwangju") ? "active" : ""}`}
            onClick={() => navigate("/Stats/Regional/Gwangju")}
          >
            ↳ 광주광역시
          </div>
          <div
            className={`region-item ${location.pathname.includes("/Stats/Regional/Daejeon") ? "active" : ""}`}
            onClick={() => navigate("/Stats/Regional/Daejeon")}
          >
            ↳ 대전광역시
          </div>
          <div
            className={`region-item ${location.pathname.includes("/Stats/Regional/Ulsan") ? "active" : ""}`}
            onClick={() => navigate("/Stats/Regional/Ulsan")}
          >
            ↳ 울산광역시
          </div>
          <div
            className={`region-item ${location.pathname.includes("/Stats/Regional/Sejong") ? "active" : ""}`}
            onClick={() => navigate("/Stats/Regional/Sejong")}
          >
            ↳ 세종특별자치시
          </div>
        </div>
      )}

      {/* 날짜 그래프 */}
      <div
        className={`menu-title ${getActive("date") ? "active" : ""}`}
        onClick={() => navigate("/Stats/Date")}
      >
        날짜 그래프
      </div>
    </div>
  );
};

export default GraphBar;
