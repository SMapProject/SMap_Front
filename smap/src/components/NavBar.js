import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";
import SafetyCheckboxes from "../components/SafetyCheckboxes"; 
import TrafficCheckboxes from "./TrafficCheckboxes";

const NAV_ITEMS = [
  { id: "safety", label: "안전", route: "/safety", icon: "/Bar/safetypage.png" },
  { id: "traffic", label: "교통", route: "/traffic", icon: "/Bar/trafficpage.png" },
  {
    id: "stats",
    label: "통계",
    route: "/stats/crime",
    icon: "/Bar/graph.png",
    subItems: [
      { label: "범죄그래프", route: "/stats/crime" },
      { 
        label: "지역그래프", 
        route: "/stats/regional/Seoul",
        subSubItems: [
          { label: "서울그래프", route: "/stats/regional/Seoul" },
          { label: "부산그래프", route: "/stats/regional/Busan" },
          { label: "대구그래프", route: "/stats/regional/Daegu" },
          { label: "대전그래프", route: "/stats/regional/Daejeon" },
          { label: "광주그래프", route: "/stats/regional/Gwangju" },
          { label: "인천그래프", route: "/stats/regional/Incheon" },
          { label: "세종그래프", route: "/stats/regional/Sejong" },
          { label: "울산그래프", route: "/stats/regional/Ulsan" },
        ],
      },
      { label: "날짜그래프", route: "/stats/date" },
    ],
  },
  {
    id: "report",
    label: "제보",
    route: "/report/crime",
    icon: "/Bar/report.png",
    subItems: [
      { label: "범죄제보", route: "/report/crime" },
      { label: "오류제보", route: "/report/error" },
    ],
  },
];

const NavBar = ({ selectedCrimes, setSelectedCrimes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  const [openMenu, setOpenMenu] = React.useState(null);
  const [openSubMenu, setOpenSubMenu] = React.useState(null);

  React.useEffect(() => {
    if (path.startsWith("/stats")) setOpenMenu("stats");
    else if (path.startsWith("/report")) setOpenMenu("report");
    else if (path.startsWith("/safety")) setOpenMenu("safety");
    else if (path.startsWith("/traffic")) setOpenMenu("traffic");
    else setOpenMenu(null);

    // 지역그래프 페이지일 때 자동 열기
    if (path.startsWith("/stats/regional")) setOpenSubMenu("지역그래프");
    else setOpenSubMenu(null);

    // 제보 페이지일 때 자동 열기
    if (path.startsWith("/report/crime")) setOpenSubMenu("범죄제보");
    else setOpenSubMenu(null);
  }, [path]);

  const toggleMenu = (id) => {
    if (id === "stats") {
      navigate("/stats/crime");
      setOpenMenu(openMenu === "stats" ? null : "stats");
      setOpenSubMenu(null); // 통계 클릭 시 서브-서브 메뉴만 닫힘
    } else if (id === "safety") {
      navigate("/safety");
      setOpenMenu(openMenu === "safety" ? null : "safety");
    } else if (id === "traffic") {
      navigate("/traffic");
      setOpenMenu(openMenu === "traffic" ? null : "traffic");
    } else if (id === "report") {
      setOpenMenu(openMenu === "report" ? null : "report");
    } else {
      const item = NAV_ITEMS.find((i) => i.id === id);
      if(item) navigate(item.route);
    }
  };

  const toggleSubMenu = (label) => {
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  const isActive = (item) => {
    if (item.id === "stats" && path.startsWith("/stats")) return true;
    if (item.id === "report" && path.startsWith("/report")) return true;
    if (item.id === "safety" && path.startsWith("/safety")) return true;
    if (item.id === "traffic" && path.startsWith("/traffic")) return true;
    return path === item.route.toLowerCase();
  };

  return (
    <aside className="nav-bar-container">
      <div className="nav-top-gap"></div>

      {NAV_ITEMS.map((item) => (
        <div key={item.id} className="nav-group">
          <button
            type="button"
            className={`nav-item ${isActive(item) ? "active" : ""}`}
            onClick={() => toggleMenu(item.id)}
          >
            <span className="nav-icon">
              <img src={item.icon} alt={`${item.label} 아이콘`} />
            </span>
            <span className="nav-text">{item.label}</span>
          </button>

          {/* 안전 / 교통 */}
          {item.id === "safety" && openMenu === "safety" && (
            <div className="sub-menu">
              <SafetyCheckboxes selectedCrimes={selectedCrimes} setSelectedCrimes={setSelectedCrimes} />
            </div>
          )}
          {item.id === "traffic" && openMenu === "traffic" && (
            <div className="sub-menu">
              <TrafficCheckboxes selectedCrimes={selectedCrimes} setSelectedCrimes={setSelectedCrimes} />
            </div>
          )}

          {item.subItems && openMenu === item.id && item.id !== "safety" && (
            <div className="sub-menu">
              {item.subItems.map((sub, index) => (
                <div key={index} className="sub-item-container">
                  {/* 서브 항목 */}
                  <div className="sub-item" onClick={() => sub.subSubItems ? toggleSubMenu(sub.label) : navigate(sub.route)}>
                    | {sub.label}
                  </div>

                  {/* 서브-서브 메뉴 */}
                  {sub.subSubItems && openSubMenu === sub.label && (
                    <div className="sub-sub-menu">
                      {sub.subSubItems.map((subSub, idx) => (
                        <div 
                          key={idx} 
                          className="sub-sub-item"
                          onClick={() => navigate(subSub.route)}
                        >
                          | {subSub.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
};

export default NavBar;
