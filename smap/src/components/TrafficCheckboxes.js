import React from "react";

const TrafficCheckboxes = ({ selectedCrimes, setSelectedCrimes }) => {
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedCrimes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div>
      <div className="crime-category">
        <h3></h3>
        <label><input type="checkbox" value="교통사고" onChange={handleCheckboxChange}/> 교통사고</label>
        <label><input type="checkbox" value="음주운전" onChange={handleCheckboxChange}/> 음주운전</label>
        <label><input type="checkbox" value="기타" onChange={handleCheckboxChange}/> 기타</label>
      </div>
    </div>
  );
};

export default TrafficCheckboxes;
