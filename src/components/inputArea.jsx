import React, { useState, useEffect } from "react";
import styles from "../css/inputArea.module.css";
import Table from "./Table";
import Chart from "./Chart";
const rate = 0.0025;

function calculate_fund(deposit, months) {
  // 每個月的基金
  let fund_per_month = [];
  for (let i = 0; i < months; i++) {
    if (i === 0) {
      fund_per_month.push(deposit[i]);
    } else {
      fund_per_month.push(
        (fund_per_month[i - 1] * (1 + rate) + deposit[i]).toFixed(3)
      );
    }
  }
  return fund_per_month;
}

export default function InputArea() {
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const [deposit, setDeposit] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const result = calculate_fund(deposit, deposit.length);
    setResult(result);
  }, [deposit]);

  function handleCheckboxChange1() {
    if (isChecked2 && !isChecked1) {
      setIsChecked1(true);
      setIsChecked2(false);
    }
    if (isChecked1 && !isChecked2) {
      setIsChecked1(false);
      setIsChecked2(true);
    }
  }

  function handleCalculation(event) {
    if (inputValue === null) {
      console.log("請輸入金額");
    }
    const numericValue = parseFloat(inputValue);
    setDeposit((prev) => [...prev, numericValue]);
  }

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <div>
      <div className={styles.calculateTypeContainer}>
        <ul>
          <li>
            <input
              type="checkbox"
              checked={isChecked1}
              onClick={handleCheckboxChange1}
            />
            定期不定額
          </li>
          <li>
            <input
              type="checkbox"
              checked={isChecked2}
              onClick={handleCheckboxChange1}
              disabled
            />
            定期定額
          </li>
        </ul>
      </div>
      <div className={styles.notFixedAmout}>
        <p>輸入投資金額 (月利率0.0025)</p>
        <input
          type="number"
          className={styles.notFixedAmoutInput}
          onChange={handleChange}
          value={inputValue}
        />
        <button className={styles.calBtn} onClick={handleCalculation}>
          進行計算
        </button>
      </div>
      <Table deposit={deposit} fund={result} />
      <Chart fund={result} deposit={deposit} />
    </div>
  );
}
