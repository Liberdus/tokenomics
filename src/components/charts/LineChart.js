import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({ chartData }) {
  const handleResize = (chart, size) => {
    // Additional logic on resize can be added here
  };

  return (
    <div
      className="chart-container"
      style={{ position: "relative", maxWidth: "100%", margin: "0 auto", height: "50vh" }}
    >
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false, // Allow custom container sizing
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
              max: 820,
              min: 0,
              ticks: {
                includeBounds: true,
                beginAtZero: true,
                stepSize: 0.5,
              },
              title: {
                color: "#223b54",
                display: true,
                text: "Days Since Genesis",
                border: {
                  color: "white",
                },
              },
            },
            y: {
              title: {
                color: "#223b54",
                display: true,
                text: "LIB",
                border: {
                  color: "white",
                },
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "LIB Vesting Schedule",
            },
            legend: {
              display: true,
            },
            colors: {
              enabled: true,
            },
          },
          // Add the onResize handler here
          onResize: handleResize,
        }}
      />
    </div>
  );
}

export default LineChart;
