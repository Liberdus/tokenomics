import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({ chartData, plugins }) {
  return (
    <div
      className="chart-container flex justify-center"
      style={{
        position: "relative",
        height: "50vh", // Larger height for better visibility on mobile
        width: "100%", // Full width on mobile
      }}
    >
      <Bar
        data={chartData}
        plugins={plugins}
        options={{
          maintainAspectRatio: false, // Allows the chart to respect the container's custom size
          responsive: true,
          scales: {
            y: {
              title: {
                color: "White",
                display: true,
                text: "SHM",
              },
            },
          },
          plugins: {
            datalabels: {
              formatter: (value, context) => {
                if (value === 63000000) {
                  return "Max Available";
                } else {
                  return "";
                }
              },
              rotation: 90,
              color: "white",
            },
            title: {
              display: true,
              text: "LIB Token Distribution",
            },
          },
        }}
      />
    </div>
  );
}

export default BarChart;
