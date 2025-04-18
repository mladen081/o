import React from "react";
import { Bar, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const BudgetCharts = ({
  selectedYear,
  getMonthlyTotals,
  getMonthlyPieData,
}) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#0b0b0b" },
      },
      title: {
        display: true,
        text: `Overview of monthly expenses for ${selectedYear}`,
        color: "#0b0b0b",
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#0b0b0b",
          callback: (value) => value.toLocaleString("sr-RS") + " RSD",
        },
        grid: { color: "#0b0b0b" },
      },
      x: {
        ticks: { color: "#0b0b0b" },
        grid: { color: "#0b0b0b" },
      },
    },
  };

  const getCombinedShades = () => {
    return [
      "#de4a4e",
      "#b83c3f",
      "#8f3132",
      "#0b0b0b",
      "#3d3d3d",
      "#666666",
      "#808080",
    ];
  };

  const pieData = getMonthlyPieData();
  pieData.datasets[0].backgroundColor = getCombinedShades();

  return (
    <div>
      <div style={{ maxWidth: "800px", margin: "0 auto 2rem auto" }}>
        <h2 className="green-t">Annual graphical representation</h2>
        <Bar data={getMonthlyTotals()} options={chartOptions} />
      </div>

      <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
        <h2 className="green-t">Percentage of expenses by month</h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default BudgetCharts;
