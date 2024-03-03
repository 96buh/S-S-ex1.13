import React from "react";
import styles from "../css/table.module.css";
export default function Table(props) {
  return (
    <div>
      <main>
        <table>
          <thead>
            <tr>
              <th scope="col" className={styles.colName}>
                月數
              </th>
              <th scope="col" className={styles.colName}>
                存入金額
              </th>
              <th scope="col" className={styles.colName}>
                總金額
              </th>
            </tr>
          </thead>
          <tbody>
            {props.deposit.map((deposit, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{deposit}</td>
                  <td>${props.fund[index]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}
