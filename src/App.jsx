import { useEffect, useState } from 'react';
import './App.css';

function App() {
  let [amount, setAmount] = useState("");
  let [fromCurr, setFromCurr] = useState('usd');
  let [toCurr, setToCurr] = useState('inr');
  let [calAmount, setCalAmount] = useState("");
  let [currency, setCurrency] = useState({});
  let [showResult,setShowResult]=useState(false)

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr}.min.json`)
      .then((res) => res.json())
      .then((data) => {
        setCurrency(data[fromCurr])}
      );
  }, [fromCurr, toCurr]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Currency Converter</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={amount}
            min={0}
            onChange={(e) => {
              // setAmount("")
              setShowResult(false) 
              setAmount(e.target.value)
            }}
          />
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700 mb-2">From</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={fromCurr}
              onChange={(e) => {
                setShowResult(false) 
                setFromCurr(e.target.value)
              }}
            >
              {Object.keys(currency).map((cur) => (
                <option key={cur} value={cur}>{cur.toUpperCase()}</option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 mb-2">To</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={toCurr}
              onChange={(e) => {
              
                // setShowResult(false) 
                setToCurr(e.target.value)
              }}
            >
              {Object.keys(currency).map((cur) => (
                <option key={cur} value={cur}>{cur.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={() => {
            setCalAmount(currency[toCurr] * amount)
            setShowResult(true)
            // setAmount("")
          }}
        >
          Convert Currency
        </button>
        {calAmount>0 && showResult  && (
          <p className="mt-4 text-center text-lg font-semibold">
            {amount} {fromCurr.toUpperCase()} = {Number(calAmount).toFixed(2)} {toCurr.toUpperCase()}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
