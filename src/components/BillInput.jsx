import React from 'react';

export default function BillInput({ bill, onSetBill }) {
  return (
    <div className="bill-input">
      <h2>💰 Bill Amount</h2>
      <input
        type="number"
        min="0"
        placeholder="Enter bill amount"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}
