import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import "../../components/NavBar.css";
import ReportBar from "../../components/ReportBar"; 
import "../../components/ReportBar.css";
import "../../index.css";

const CrimeReport = () => {
  const [formData, setFormData] = useState({
    crimeTypes: [],
    location: "",
    date: "",
    newsUrl: "",
    email: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        crimeTypes: checked
          ? [...prev.crimeTypes, value]
          : prev.crimeTypes.filter((v) => v !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제출 데이터:", formData);
    alert("제보가 제출되었습니다!");

    // 폼 초기화
    setFormData({
      crimeTypes: [],
      location: "",
      date: "",
      newsUrl: "",
      email: "",
      content: "",
    });
  };

  return (
    <div>
      {/* 로고 */}
      <div className="smap-logo-fixed">
        <img src="/logo/SMap_Logo.png" alt="SMap Logo" className="smap-logo" />
        <div className="smap-text">smap</div>
      </div>

      {/* 네비게이션 바 */}
      <NavBar />

      <div className="content-area">
        {/* 사이드 바 */}
        <ReportBar />
      </div>

      {/* 메인 폼 영역 */}
      <div className="report-form-container">
        <h2>범죄제보</h2>
        <form onSubmit={handleSubmit} className="crime-report-form">
          
          {/* 범죄 종류 */}
          <div className="form-group">
            <label>범죄 종류</label>
            <div className="checkbox-group">
              {["개인범죄", "재산범죄", "사회범죄", "특별범죄"].map((crime) => (
                <label key={crime} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={crime}
                    checked={formData.crimeTypes.includes(crime)}
                    onChange={() =>
                      setFormData({ ...formData, crimeTypes: [crime] })
                    }
                  />
                  <span>{crime}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 위치 */}
          <div className="form-group">
            <label>위치</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {/* 날짜 */}
          <div className="form-group">
            <label>날짜</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          {/* 뉴스주소 */}
          <div className="form-group">
            <label>뉴스주소</label>
            <input
              type="url"
              name="newsUrl"
              value={formData.newsUrl}
              onChange={handleChange}
            />
          </div>

          {/* 이메일 */}
          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* 제보 내용 */}
          <div className="form-group">
            <label>제보 내용</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
          </div>

          {/* 제출 버튼 */}
          <button type="submit" className="submit-btn">제출</button>
        </form>
      </div>
    </div>
  );
};

export default CrimeReport;
