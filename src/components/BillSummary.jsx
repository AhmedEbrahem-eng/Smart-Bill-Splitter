import React from 'react';

function BillSummary({ bill, tip, numPeople, isEvenSplit, shares = [100] }) {
  const totalAmount = bill + tip;

  return (
    <div className="bill-summary">
      <h2>📝 Bill Summary</h2>
      <div className="summary-details">
        <p>Bill Amount: <span>${bill.toFixed(2)}</span></p>
        <p>Tip Amount: <span>${tip.toFixed(2)}</span></p>
        <p>Total Amount: <span>${totalAmount.toFixed(2)}</span></p>
        
        {isEvenSplit ? (
          <p className="per-person">
            Per Person: <span>${(totalAmount / numPeople).toFixed(2)}</span>
          </p>
        ) : (
          <div className="individual-shares">
            <h3>Individual Shares:</h3>
            {shares.map((share, index) => (
              <p key={index}>
                Person {index + 1}: <span>${((totalAmount * share) / 100).toFixed(2)}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BillSummary;
