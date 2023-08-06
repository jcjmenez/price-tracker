import React, { useState } from 'react';
import './DateSlider.css';

function DateSlider({ setDateRange }) {
  const [sliderValue, setSliderValue] = useState(6);
  const handleChange = (e) => {
    setSliderValue(e.target.value);
    const valuesDict = {
      1: 1, 2: 3, 3: 6, 4: 12, 5: 0,
    };
    setDateRange(valuesDict[e.target.value]);
  };
  return (
    <div className="date-range">
      <div className="date-range-label">Date Range</div>
      <input type="range" min="1" max="5" value={sliderValue} onChange={handleChange} />
      <div className="date-range-indicator">
        <div className="date-range-month">1m</div>
        <div className="date-range-month">3m</div>
        <div className="date-range-month">6m</div>
        <div className="date-range-month">1y</div>
        <div className="date-range-month">All</div>
      </div>
    </div>
  );
}

export default DateSlider;
