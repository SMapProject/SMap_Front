import React from "react";

const SafetyCheckboxes = ({ selectedCrimes, setSelectedCrimes }) => {
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedCrimes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div>
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
  );
};

export default SafetyCheckboxes;
