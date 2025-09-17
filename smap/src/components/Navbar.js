import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [active, setActive] = useState("안전");
  const navigate = useNavigate();

  const handleClick = (tab, path) => {
    setActive(tab);
    navigate(path);
  };

  return (
    <div className="nav-bar">
      <div
        className={`nav-item ${active === "안전" ? "active" : ""}`}
        onClick={() => handleClick("안전", "/safety")}
      >
        안전
      </div>
      <div
        className={`nav-item ${active === "교통" ? "active" : ""}`}
        onClick={() => handleClick("교통", "/traffic")}
      >
        교통
      </div>
      <div
        className={`nav-item ${active === "통계" ? "active" : ""}`}
        onClick={() => handleClick("통계", "/CrimeGraph")}
      >
        통계
      </div>
      <div
        className={`nav-item ${active === "제보" ? "active" : ""}`}
        onClick={() => handleClick("제보", "/CrimeReport")}
      >
        제보
      </div>
    </div>
  );
};

export default NavBar;
