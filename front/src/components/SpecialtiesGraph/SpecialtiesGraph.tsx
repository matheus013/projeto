import { Doughnut } from "react-chartjs-2";

const SpecialtiesGraph = () => {
  return (
    <Doughnut
      data={{
        datasets: [
          {
            label: "",
            data: [300, 300, 300, 300, 300, 300],
            borderWidth: 4,
          },
        ],
      }}
    />
  );
};

export default SpecialtiesGraph;
