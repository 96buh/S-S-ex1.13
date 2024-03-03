import React from "react";
import styles from "../css/chart.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "退休基金",
    },
  },
};

export default function Chart(props) {
  const { fund, deposit } = props;
  if (!fund || fund.length === 0) {
    return;
  }
  const labels = Array.from({ length: fund.length }, (_, index) =>
    (index + 1).toString()
  );

  const data = {
    labels,
    datasets: [
      {
        label: "存入",
        data: deposit,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "總金額",
        data: fund,
        backgroundColor: "rgba(98, 216, 107, 0.5)",
      },
    ],
  };
  return (
    <div className={styles.chart}>
      <Bar options={options} data={data} />
    </div>
  );
}
