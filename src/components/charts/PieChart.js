import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData, plugins }) {
  return (
    <div
      className="chart-container flex justify-center"
      style={{
        position: "relative",
        height: "50vh", // Larger height for better visibility on mobile
        width: "100%", // Full width on mobile
      }}
    >
      <Pie
        data={chartData}
        plugins={plugins}
        options={{
          maintainAspectRatio: false, // Allows the chart to respect the container's custom size
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "LIB Distribution Percentage",
            },
            datalabels: {
              display: true,
              font: {
                size: 10,
                weight: "900",
              },
              formatter: (value, ctx) => {
                let sum = 0;
                let dataArr = ctx.chart.data.datasets[0].data;
                dataArr.forEach((data) => {
                  sum += data;
                });
                let percentage = ((value * 100) / sum).toFixed(2) + "%";

                if (percentage === "51.00%") {
                  return "51% (Max Available)";
                } else {
                  return percentage;
                }
              },
              color: "#fff",
            },
          },
        }}
      />
    </div>
  );
}

export default PieChart;
