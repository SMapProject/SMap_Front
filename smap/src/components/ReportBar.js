import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ReportBar.css";

const ReportBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  const getActive = (tab) => {
    const path = location.pathname.toLowerCase();
    if (tab === "crime") return path.startsWith("/report/crime");
    if (tab === "error") return path.startsWith("/report/error");
    return false;
    };


  return (
    <div className="report-bar">
      <div
        className={`menu-title ${getActive("crime") ? "active" : ""}`}
        onClick={() => navigate("/report/crime")}
        >
        범죄 제보
        </div>

        <div
        className={`menu-title ${getActive("error") ? "active" : ""}`}
        onClick={() => navigate("/report/error")}
        >
        오류 제보
        </div>
    </div>
  );
};

export default ReportBar;
