// components/LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";

function ScalingChart({ chartData, title }) {
  return (
    <div className="chart-container w-full min-h-[400px]"> {/* Set a height */}
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false, // Allows chart to fit in container
          responsive: true,
          scales: {
            x: {
              title: {
                color: "#223b54",
                display: true,
                text: "Days Since Genesis",
              },
            },
            y: {
              ticks: {
                callback: function (value) {
                  return value;
                },
                display: true,
              },
              title: {
                color: "#223b54",
                display: true,
                text: "Max S:A Ratio",
              },
            },
          },
          plugins: {
            tooltip: { enabled: true },
            title: {
              display: true,
              text: title, // Uses passed title prop
            },
            legend: { display: true },
            colors: { enabled: true },
          },
        }}
      />
    </div>
  );
}

export default ScalingChart;
