import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import "../../components/NavBar.css";
import "../../index.css";

const ErrorReport = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("제출 데이터:", formData);

    try {
    // 메일 전송 
    const response2 = await fetch(
      "https://port-0-smap-backend-mhkpzrkrde061e33.sel3.cloudtype.app/errorMail/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (!response2.ok) throw new Error(`데이터메일 서버 오류: ${response2.status}`);
    const data2 = await response2.json();
    console.log("데이터메일 서버 응답:", data2);

    alert("제보가 성공적으로 제출되었습니다!");
  } catch (error) {
    console.error("제출 오류:", error);
    alert("제보 제출에 실패했습니다.");
  }

    // 폼 초기화
    setFormData({
      location: "",
      newsUrl: "",
      email: "",
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

      {/* 메인 폼 영역 */}
      <div className="report-form-container">
        <h2>오류제보</h2>
        <form onSubmit={handleSubmit} className="crime-report-form">
          {/* 오류 내용 */}
          <div className="form-group">
            <label>제보 내용</label>
            <textarea
              name="content"
              value={formData.content}
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
          
          {/* 뉴스주소 */}
          <div className="form-group">
            <label>뉴스기사 주소</label>
            <input
              type="url"
              name="newsUrl"
              value={formData.newsUrl}
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

export default ErrorReport;
