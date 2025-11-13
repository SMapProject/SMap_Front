import React, { useEffect, useState, useRef } from "react";
import NavBar from "../../components/NavBar";
import "../../components/NavBar.css";
import "../../index.css";
import "../../components/SafetyCheckboxes";

const SAFETY_CENTER = { lat: 37.566535, lng: 126.9779692 };

const SafetyPage = () => {
  const [selectedCrimes, setSelectedCrimes] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedList, setSelectedList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const markersRef = useRef([]);
  const locationMapRef = useRef(new Map());
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
  }, []);

  // 주소 검색
  const searchLocation = (location) => new Promise((resolve) => {
    if (!location) return resolve(null);
    const geocoder = geocoderRef.current;
    const places = placesRef.current;

    geocoder.addressSearch(location, (res, status) => {
      if (status === window.kakao.maps.services.Status.OK && res && res[0]) {
        resolve({ lat: Number(res[0].y), lng: Number(res[0].x) });
      } else {
        places.keywordSearch(location, (res2, status2) => {
          if (status2 === window.kakao.maps.services.Status.OK && res2 && res2[0]) {
            resolve({ lat: Number(res2[0].y), lng: Number(res2[0].x) });
          } else resolve(null);
        });
      }
    });
  });

  // 마커 갱신
  useEffect(() => {
    if (!map) return;
    locationMapRef.current.forEach(({ marker }) => marker?.setMap(null));
    locationMapRef.current.clear();
    markersRef.current = [];
    if (selectedCrimes.length === 0) return;

    const url = `https://port-0-smap-backend-mhkpzrkrde061e33.sel3.cloudtype.app/news?crimeType=${selectedCrimes.join(",")}`;

    const fetchAndPlace = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) return;

        for (const item of data) {
          const coords = await searchLocation(item.location);
          const lat = coords?.lat ?? SAFETY_CENTER.lat;
          const lng = coords?.lng ?? SAFETY_CENTER.lng;

          const key = `${lat.toFixed(6)}_${lng.toFixed(6)}`;
          const existing = locationMapRef.current.get(key);

          if (existing) existing.items.push(item);
          else {
            const position = new window.kakao.maps.LatLng(lat, lng);
            const marker = new window.kakao.maps.Marker({ map, position, title: item.title });
            window.kakao.maps.event.addListener(marker, "click", () => {
              const bucket = locationMapRef.current.get(key);
              if (!bucket) return;
              setSelectedList(bucket.items);
              setSelectedIndex(0);
              setIsModalOpen(true);
            });
            locationMapRef.current.set(key, { marker, items: [item] });
            markersRef.current.push(marker);
          }
        }
      } catch (err) { console.error(err); }
    };
    fetchAndPlace();
  }, [selectedCrimes, map]);

  const goPrev = () => setSelectedIndex((prev) => (prev - 1 + selectedList.length) % selectedList.length);
  const goNext = () => setSelectedIndex((prev) => (prev + 1) % selectedList.length);
  const closeModal = () => { setIsModalOpen(false); setSelectedList([]); setSelectedIndex(0); };
  const currentItem = selectedList[selectedIndex] ?? null;

  return (
    <div>
      <div className="smap-logo-fixed">
        <img src="/logo/SMap_Logo.png" alt="SMap Logo" className="smap-logo" />
        <div className="smap-text">smap</div>
      </div>

      <NavBar selectedCrimes={selectedCrimes} setSelectedCrimes={setSelectedCrimes} />

      <div id="kakao-map" style={{ width: "100%", height: "100%" }}></div>

      {/* 모달 */}
      {isModalOpen && currentItem && (
        <div className="modal-overlay">
          <div className="modal-box modal-with-nav">
            <button className="modal-close" onClick={closeModal}>✖</button>
            <div className="modal-nav-container">
              <button className="modal-nav-btn modal-prev-btn" onClick={goPrev} disabled={selectedIndex === 0}>&lt;</button>
              <div className="modal-main">
                <h2 className="modal-title">{currentItem.type || "범죄유형"}</h2>
                <div className="modal-content">
                  <div className="modal-input-group">
                    <label>사건 날짜</label>
                    <input type="text" readOnly value={currentItem.crimeDay || "날짜 없음"} />
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
                <div className="modal-index">{String(selectedIndex+1).padStart(2,"0")} / {String(selectedList.length).padStart(2,"0")}</div>
              </div>
              <button className="modal-nav-btn modal-next-btn" onClick={goNext} disabled={selectedIndex === selectedList.length - 1}>&gt;</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyPage;
