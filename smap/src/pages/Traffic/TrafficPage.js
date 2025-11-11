import React, { useEffect, useState, useRef } from "react";
import NavBar from "../../components/NavBar";
import "../../components/NavBar.css";
import "../../index.css";

const SAFETY_CENTER = { lat: 37.566535, lng: 126.9779692 };

const SafetyPage = () => {
  const [selectedCrimes, setSelectedCrimes] = useState([]);
  const [map, setMap] = useState(null);

  // 모달에서 보여줄 현재 선택된 위치의 사건들
  const [selectedList, setSelectedList] = useState([]); // array of items at same location
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const markersRef = useRef([]); // 실제 카카오 마커들
  const locationMapRef = useRef(new Map()); // key: "lat_lng" -> { marker, items: [] }
  const geocoderRef = useRef(null);
  const placesRef = useRef(null);

  // 카카오맵 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=5167e7e56369e87754ac0c849f468bce&libraries=services&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("kakao-map");
        const createdMap = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(SAFETY_CENTER.lat, SAFETY_CENTER.lng),
          level: 4,
        });

        geocoderRef.current = new window.kakao.maps.services.Geocoder();
        placesRef.current = new window.kakao.maps.services.Places();
        setMap(createdMap);
      });
    };

    // cleanup: 스크립트 제거는 생략 (SPA 상주)
  }, []);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedCrimes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // 주소/장소 검색 (기존 로직 재사용)
  const searchLocation = (location) => {
    return new Promise((resolve) => {
      if (!location) {
        resolve(null);
        return;
      }
      const geocoder = geocoderRef.current;
      const places = placesRef.current;

      geocoder.addressSearch(location, (res, status) => {
        if (status === window.kakao.maps.services.Status.OK && res && res[0]) {
          resolve({ lat: Number(res[0].y), lng: Number(res[0].x) });
          return;
        }

        places.keywordSearch(location, (res2, status2) => {
          if (status2 === window.kakao.maps.services.Status.OK && res2 && res2[0]) {
            resolve({ lat: Number(res2[0].y), lng: Number(res2[0].x) });
          } else {
            resolve(null);
          }
        });
      });
    });
  };

  // selectedCrimes/맵 변경시 마커 갱신
  useEffect(() => {
    if (!map) return;

    // 기존 마커/데이터 초기화
    locationMapRef.current.forEach(({ marker }) => {
      if (marker) marker.setMap(null);
    });
    locationMapRef.current.clear();
    markersRef.current = [];

    if (selectedCrimes.length === 0) return;

    const url = `https://port-0-smap-backend-main-mhkpzrkrde061e33.sel3.cloudtype.app/news?crimeType=${selectedCrimes.join(",")}`;

    const fetchAndPlace = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          console.error("서버 오류:", res.status);
          return;
        }
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) return;

        // 병렬로 주소 검색하지 말고 순차 처리(카카오 쿼터/안정성 고려)
        for (const item of data) {
          const coords = await searchLocation(item.location);
          const lat = coords ? coords.lat : SAFETY_CENTER.lat;
          const lng = coords ? coords.lng : SAFETY_CENTER.lng;

          const key = `${lat.toFixed(6)}_${lng.toFixed(6)}`; // 소수점으로 그룹화
          const existing = locationMapRef.current.get(key);

          if (existing) {
            // 같은 위치에 추가
            existing.items.push(item);
          } else {
            // 새 마커 생성
            const position = new window.kakao.maps.LatLng(lat, lng);
            const marker = new window.kakao.maps.Marker({ map, position, title: item.title });

            // 클릭 시 해당 위치의 사건들로 모달 열기
            window.kakao.maps.event.addListener(marker, "click", () => {
              const bucket = locationMapRef.current.get(key);
              if (!bucket) return;
              setSelectedList(bucket.items);
              setSelectedIndex(0);
              setIsModalOpen(true);

              // 모달이 열릴 때 첫 사건을 선택 상태로 유지
            });

            locationMapRef.current.set(key, { marker, items: [item] });
            markersRef.current.push(marker);
          }
        }
      } catch (err) {
        console.error("데이터 로드 실패:", err);
      }
    };

    fetchAndPlace();
  }, [selectedCrimes, map]);

  // 모달 내 이전/다음 이동
  const goPrev = () => {
    if (!selectedList || selectedList.length === 0) return;
    const next = (selectedIndex - 1 + selectedList.length) % selectedList.length;
    setSelectedIndex(next);
  };

  const goNext = () => {
    if (!selectedList || selectedList.length === 0) return;
    const next = (selectedIndex + 1) % selectedList.length;
    setSelectedIndex(next);
  };

  // selectedIndex가 바뀔 때 (모달 콘텐츠가 갱신되게)
  useEffect(() => {
    // no-op for now; modal reads selectedList[selectedIndex]
  }, [selectedIndex, selectedList]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedList([]);
    setSelectedIndex(0);
  };

  // helper to safely read current item
  const currentItem = selectedList && selectedList.length > 0 ? selectedList[selectedIndex] : null;

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
          <h3>교통사고</h3>
          <label><input type="checkbox" value="교통사고" onChange={handleCheckboxChange}/> 교통사고</label>
          <label><input type="checkbox" value="음주운전" onChange={handleCheckboxChange}/> 음주운전</label>
          <label><input type="checkbox" value="기타" onChange={handleCheckboxChange}/> 기타</label>
        </div>
      </div>

      {/* 지도 */}
      <div id="kakao-map" style={{ width: "100%", height: "600px" }}></div>

      {/* 모달 */}
      {isModalOpen && currentItem && (
        <div className="modal-overlay">
          <div className="modal-box modal-with-nav">
            <button className="modal-close" onClick={closeModal}>✖</button>

            {/* 전체 내비게이션 포함 박스 */}
            <div className="modal-nav-container">

              {/* 왼쪽 이동 버튼 */}
              <button
                className="modal-nav-btn modal-prev-btn"
                onClick={goPrev}
                disabled={selectedIndex === 0}
                aria-label="previous"
              >
                &lt;
              </button>

              {/* 본문 */}
              <div className="modal-main">
                <h2 className="modal-title">{currentItem.type || "범죄유형"}</h2>

                <div className="modal-content">
                  <div className="modal-row">
                    <div className="modal-input-group">
                      <label>사건 날짜</label>
                      <input type="text" readOnly value={currentItem.crimeDay || "날짜 없음"} />
                    </div>
                  </div>

                  <div className="modal-input-group full">
                    <label>사건 설명</label>
                    <textarea readOnly value={currentItem.title || "설명 없음"} />
                  </div>

                  {currentItem.newsLink && (
                    <div className="modal-input-group full link-row">
                      <label>링크 첨부</label>
                      <div className="link-box">
                        <input type="text" readOnly value={currentItem.newsLink} />
                        <a href={currentItem.newsLink} target="_blank" rel="noopener noreferrer">🔗</a>
                      </div>
                    </div>
                  )}
                </div>

                {/* 현재 인덱스 */}
                <div className="modal-index">
                  {String(selectedIndex + 1).padStart(2, "0")} / {String(selectedList.length).padStart(2, "0")}
                </div>
              </div>

              {/* 오른쪽 이동 버튼 */}
              <button
                className="modal-nav-btn modal-next-btn"
                onClick={goNext}
                disabled={selectedIndex === selectedList.length - 1}
                aria-label="next"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyPage;
