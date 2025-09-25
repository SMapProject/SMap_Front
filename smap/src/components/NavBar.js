import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.toLowerCase();

  const getActive = (tab) => {
    const path = location.pathname.toLowerCase();
    if (tab === "안전") return path.startsWith("/safety");
    if (tab === "교통") return path.startsWith("/traffic");
    if (tab === "통계") return path.startsWith("/stats");
    if (tab === "제보") return path.startsWith("/report");
    return false;
  };

  return (
    <div className="nav-bar">
      <div
        className={`nav-item ${getActive("안전") ? "active" : ""}`}
        onClick={() => navigate("/safety")}
      >
        안전
      </div>
      <div
        className={`nav-item ${getActive("교통") ? "active" : ""}`}
        onClick={() => navigate("/traffic")}
      >
        교통
      </div>
      <div
        className={`nav-item ${getActive("통계") ? "active" : ""}`}
        onClick={() => navigate("/stats/crime")}
      >
        통계
      </div>
      <div
        className={`nav-item ${getActive("제보") ? "active" : ""}`}
        onClick={() => navigate("/report/crime")}
      >
        제보
      </div>
    </div>
  );
};

export default NavBar;