import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import "../../components/NavBar.css"; 
import "../../index.css";

const SafetyPage = () => {
  const [selectedCrimes, setSelectedCrimes] = useState([]); 
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  // 카카오맵
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=5167e7e56369e87754ac0c849f468bce&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("kakao-map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심
          level: 4,
        };
        const createdMap = new window.kakao.maps.Map(container, options);
        setMap(createdMap);
      });
    };
  }, []);

  // 체크박스
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCrimes((prev) => [...prev, value]);
    } else {
      setSelectedCrimes((prev) => prev.filter((crime) => crime !== value));
    }
  };

  // DB 가져오기 & 마커 표시
  useEffect(() => {
    if (!map) return;

    // 기존 마커 제거
    markers.forEach((m) => m.setMap(null));
    setMarkers([]);

    if (selectedCrimes.length === 0) return;
    
    const query = selectedCrimes.map(c => `crimes=${encodeURIComponent(c)}`).join('&');

    fetch(`https://port-0-smap-backend-1010-mgjfpi017e02308a.sel3.cloudtype.app/news?${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("서버에서 배열이 아닌 데이터가 왔습니다:", data);
          return;
        }

        data.forEach((item) => {
          const geocoder = new window.kakao.maps.services.Geocoder();

          // DB에서 주소 문자열로 받음 → 좌표 변환
          geocoder.addressSearch(item.location, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
                title: item.title,
              });

              // 마커 클릭 → 모달 열기
              window.kakao.maps.event.addListener(marker, "click", () => {
                setSelectedNews(item);
              });

              setMarkers((prev) => [...prev, marker]);
            } else {
              console.warn("주소 변환 실패:", item.location);
            }
          });
        });
      })
      .catch((err) => console.error("데이터 불러오기 실패:", err));
  }, [selectedCrimes, map]);

  return (
    <div>
      {/* 로고 */}
      <div className="smap-logo-fixed">
        <img src="/logo/SMap_Logo.png" alt="SMap Logo" className="smap-logo" />
        <div className="smap-text">smap</div>
      </div>

      {/* 네비게이션 바 */}
      <NavBar />

      {/* 범죄 종류 체크박스 */}
      <div className="content-area">
        <div className="crime-category">
          <h3>개인범죄</h3>
          <label><input type="checkbox" value="살인" onChange={handleCheckboxChange}/> 살인</label>
          <label><input type="checkbox" value="상해" onChange={handleCheckboxChange}/> 상해</label>
          <label><input type="checkbox" value="폭행" onChange={handleCheckboxChange}/> 폭행</label>
          <label><input type="checkbox" value="강금/약취유인" onChange={handleCheckboxChange}/> 강금/약취유인</label>
          <label><input type="checkbox" value="사이버 범죄 사건" onChange={handleCheckboxChange}/> 사이버 범죄</label>
        </div>

        <div className="crime-category">
          <h3>재산범죄</h3>
          <label><input type="checkbox" value="강도" onChange={handleCheckboxChange}/> 강도</label>
          <label><input type="checkbox" value="절도" onChange={handleCheckboxChange}/> 절도</label>
        </div>

        <div className="crime-category">
          <h3>사회범죄</h3>
          <label><input type="checkbox" value="방화/폭발물" onChange={handleCheckboxChange}/> 방화/폭발물</label>
          <label><input type="checkbox" value="성범죄" onChange={handleCheckboxChange}/> 성범죄</label>
        </div>

        <div className="crime-category">
          <h3>특별범죄</h3>
          <label><input type="checkbox" value="마약" onChange={handleCheckboxChange}/> 마약</label>
          <label><input type="checkbox" value="가정폭력" onChange={handleCheckboxChange}/> 가정폭력</label>
          <label><input type="checkbox" value="스토킹" onChange={handleCheckboxChange}/> 스토킹</label>
          <label><input type="checkbox" value="아동청소년보호" onChange={handleCheckboxChange}/> 아동청소년보호</label>
        </div>
      </div>

      {/* 지도 */}
      <div id="kakao-map"></div>

      {/* 모달 */}
      {selectedNews && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="modal-close" onClick={() => setSelectedNews(null)}>✖</button>
      
          {/* 제목: 범죄 유형 */}
          <h2>{selectedNews.type || "범죄 사건"}</h2>
          <hr />
          <p>{selectedNews.title}</p>
      
          {/* 날짜 */}
          <p><b>날짜:</b> {selectedNews.crimeDay || "알 수 없음"}</p>
          
          {/* 위치 */}
          <p className="location"><b>위치:</b> {selectedNews.location || "알 수 없음"}</p>
      
          {/* 뉴스 링크 */}
          {selectedNews.newsLink && (
            <a href={selectedNews.newsLink} target="_blank" rel="noopener noreferrer">
              관련 뉴스 보기
            </a>
          )}
      </div>
  </div>
)}

    </div>
  );
};

export default SafetyPage;
