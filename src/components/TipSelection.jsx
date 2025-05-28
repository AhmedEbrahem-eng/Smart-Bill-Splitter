import React, { useState } from 'react';

function TipSelection({ serviceRating, onSelectTip }) {
  const [isCustomTip, setIsCustomTip] = useState(false);

  const handleTipChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      onSelectTip(value);
    }
  };

  return (
    <div className="tip-selection">
      <h2>🌟 Service Rating</h2>
      {!isCustomTip ? (
        <>
          <select
            value={serviceRating}
            onChange={(e) => onSelectTip(Number(e.target.value))}
            className="tip-select"
          >
            <option value="0">Poor service (0%)</option>
            <option value="5">Acceptable service (5%)</option>
            <option value="10">Good service (10%)</option>
            <option value="15">Great service (15%)</option>
            <option value="20">Exceptional service (20%)</option>
          </select>
          <button 
            className="custom-tip-btn"
            onClick={() => setIsCustomTip(true)}
          >
            Enter Custom Tip
          </button>
        </>
      ) : (
        <div className="custom-tip-input">
          <input
            type="number"
            min="0"
            value={serviceRating}
            onChange={handleTipChange}
            placeholder="Enter custom tip percentage"
          />
          <button 
            className="custom-tip-btn"
            onClick={() => setIsCustomTip(false)}
          >
            Use Preset Tips
          </button>
        </div>
      )}
    </div>
  );
}

export default TipSelection;
