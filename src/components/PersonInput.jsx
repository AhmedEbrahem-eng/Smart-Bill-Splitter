import React from 'react';

function PersonInput({ numPeople, onSetNumPeople }) {
  return (
    <div className="person-input">
      <h2>👥 Number of People</h2>
      <input
        type="number"
        min="1"
        value={numPeople}
        onChange={(e) => onSetNumPeople(Math.max(1, Number(e.target.value)))}
        placeholder="Enter number of people"
      />
    </div>
  );
}

export default PersonInput;
