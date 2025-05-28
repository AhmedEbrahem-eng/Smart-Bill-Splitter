import React, { useState, useEffect } from 'react';

function PersonShare({ index, share, totalAmount, onShareChange }) {
  const [error, setError] = useState('');

  useEffect(() => {
    validateShare(share);
  }, [share]);

  const validateShare = (value) => {
    if (value < 0) {
      setError('Share cannot be negative');
    } else if (value > 100) {
      setError('Share cannot exceed 100%');
    } else {
      setError('');
    }
  };

  const handleShareChange = (e) => {
    const value = Number(e.target.value);
    validateShare(value);
    onShareChange(index, value);
  };

  return (
    <div className="person-share">
      <label>Person {index + 1}'s Share (%)</label>
      <div className="input-wrapper">
        <input
          type="number"
          min="0"
          max="100"
          value={share}
          onChange={handleShareChange}
          className={error ? 'error' : ''}
        />
        {error && <div className="error-message">{error}</div>}
      </div>
      <span className="amount">${((totalAmount * share) / 100).toFixed(2)}</span>
    </div>
  );
}

export default PersonShare;
