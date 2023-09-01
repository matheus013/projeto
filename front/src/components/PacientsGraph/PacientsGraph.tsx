import { Chart as ChartJS, registerables } from "chart.js";
import { useTheme } from "@/hooks/useTheme";
import { Line } from "react-chartjs-2";

const PacientsGraph = () => {
  ChartJS.register(...registerables);

  const { currentTheme, setTheme } = useTheme();

  const months = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];

  const data = {
    labels: months,
    datasets: [
      {
        label: "",
        data: [1499, 500, 745, 1233, 266, 1223, 867, 999, 1222, 576, 888, 332],
        borderColor: currentTheme.primaryColor,
        lineTension: 0.4,
        pointRadius: 0,
      },
      {
        label: "",
        data: [555, 776, 1545, 333, 554, 767, 877, 555, 1445, 222, 122, 244],
        borderColor: "#0D69C6",
        pointRadius: 0,
        lineTension: 0.4,
      },
    ],
  };

  return (
    <Line
      height={80}
      data={data}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },

            ticks: {
              font: {
                size: 12,
                family: "Inter",
                weight: "bold",
              },
            },
          },
          y: {
            border: {
              dash: [12, 6],
            },
            ticks: {
              maxTicksLimit: 6,
              font: {
                size: 12,
                family: "Inter",
                weight: "bold",
              },
            },
          },
        },
      }}
    />
  );
};

export default PacientsGraph;
