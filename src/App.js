import "./index.css";
import { useState } from "react";
import BillInput from './components/BillInput';
import PersonInput from './components/PersonInput';
import TipSelection from './components/TipSelection';
import BillSummary from './components/BillSummary';
import PersonShare from './components/PersonShare';

export default function App() {
  return (
    <div className="container">
      <h1>💸 Smart Bill Splitter</h1>
      <BillCalculator />
    </div>
  );
}

function BillCalculator() {
  const [bill, setBill] = useState("");
  const [numPeople, setNumPeople] = useState(1);
  const [serviceRating, setServiceRating] = useState(0);
  const [isEvenSplit, setIsEvenSplit] = useState(true);
  const [shares, setShares] = useState([100]);

  const tip = bill * (serviceRating / 100);

  function handleReset() {
    setBill("");
    setNumPeople(1);
    setServiceRating(0);
    setIsEvenSplit(true);
    setShares([100]);
  }

  const handleNumPeopleChange = (num) => {
    setNumPeople(num);
    if (isEvenSplit) {
      const evenShare = 100 / num;
      setShares(Array(num).fill(evenShare));
    } else {
      const newShares = [...shares];
      if (num > shares.length) {
        const remaining = 100 - shares.reduce((a, b) => a + b, 0);
        newShares.push(remaining);
      } else {
        newShares.pop();
      }
      setShares(newShares);
    }
  };

  const handleShareChange = (index, newShare) => {
    const newShares = [...shares];
    newShares[index] = newShare;
    setShares(newShares);
  };

  return (
    <div className="calculator">
      <div className="inputs">
        <BillInput bill={bill} onSetBill={setBill} />
        <PersonInput numPeople={numPeople} onSetNumPeople={handleNumPeopleChange} />
        <TipSelection serviceRating={serviceRating} onSelectTip={setServiceRating} />
        
        {numPeople > 1 && (
          <div className="split-toggle">
            <label>
              <input
                type="checkbox"
                checked={isEvenSplit}
                onChange={(e) => setIsEvenSplit(e.target.checked)}
              />
              Split evenly
            </label>
          </div>
        )}

        {!isEvenSplit && bill > 0 && (
          <div className="shares-container">
            <h2>👥 Split Shares</h2>
            <div className="shares-info">
              <p>Adjust the percentage each person will pay. Total should equal 100%</p>
            </div>
            {shares.map((share, index) => (
              <PersonShare
                key={index}
                index={index}
                share={share}
                totalAmount={Number(bill) + tip}
                onShareChange={handleShareChange}
              />
            ))}
            <div className="total-percentage">
              <p>Total: {shares.reduce((a, b) => a + b, 0).toFixed(1)}%</p>
              {Math.abs(shares.reduce((a, b) => a + b, 0) - 100) > 0.1 && (
                <p className="share-warning">
                  ⚠️ Total shares should equal 100%
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {bill > 0 && (
        <div className="results">
          <BillSummary 
            bill={Number(bill)} 
            tip={tip} 
            numPeople={numPeople}
            isEvenSplit={isEvenSplit}
            shares={shares}
          />
          <button className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
}
