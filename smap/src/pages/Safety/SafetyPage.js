import React, { useEffect } from "react";
import NavBar from "../../components/NavBar";
import "../../components/NavBar.css"; 
import "../../index.css";


const SafetyPage = () => {

  // 카카오맵
  useEffect(() => {
  const script = document.createElement("script");
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=5167e7e56369e87754ac0c849f468bce&autoload=false`;
  document.head.appendChild(script);

  script.onload = () => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("kakao-map");
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 지도 중심 위치(이거 어디로 할까..)
        level: 3, // 확대 레벨
      };
      new window.kakao.maps.Map(container, options);
    });
  };
}, []);



  return (
    <div>
      {/* 로고 */}
      <div className="smap-logo-fixed">
        <img src="/logo/SMap_Logo.png" alt="SMap Logo" className="smap-logo" />
        <div className="smap-text">smap</div>
      </div>
      {/* 네비게이션 바 */}
      <NavBar />
      {/* 범죄 종류 */}
      <div className="content-area">
        <div class="crime-category">
          <h3>개인범죄</h3>
          <label><input type="checkbox" /> 살인</label>
          <label><input type="checkbox" /> 상해</label>
          <label><input type="checkbox" /> 폭행</label>
          <label><input type="checkbox" /> 강금/약취유인</label>
          <label><input type="checkbox" /> 사이버 범죄</label>
        </div>

        <div class="crime-category">
          <h3>재산범죄</h3>
          <label><input type="checkbox" /> 강도</label>
          <label><input type="checkbox" /> 절도</label>
        </div>

        <div class="crime-category">
          <h3>사회범죄</h3>
          <label><input type="checkbox" /> 방화/폭발물</label>
          <label><input type="checkbox" /> 성범죄</label>
        </div>

        <div class="crime-category">
          <h3>특별범죄</h3>
          <label><input type="checkbox" /> 마약</label>
          <label><input type="checkbox" /> 가정폭력</label>
          <label><input type="checkbox" /> 스토킹</label>
          <label><input type="checkbox" /> 아동청소년보호</label>
        </div>
      </div>
      {/* 지도 */}
       <div id="kakao-map"></div>
    </div>
  );
};

export default SafetyPage;
