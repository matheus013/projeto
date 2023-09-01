import { Chart as ChartJS, registerables } from "chart.js";
import InfoCard from "@/components/InfoCard/InfoCard";
import { useTheme } from "@/hooks/useTheme";
import { Line, Pie, Bar } from "react-chartjs-2";


interface HomePropsType {
  openRightBar: () => void;
}

const Home = ({ openRightBar }: HomePropsType) => {
  ChartJS.register(...registerables);

  const { currentTheme, setTheme } = useTheme();
  return (
    <div className="dashboard-page">
      <div className="home">
        <div className="home-left">
          <InfoCard data={{
            title: "Total de vendas",
            info: "R$ 3.947,08",
            icon: "shopping_cart",
            color: "#5DBB63",
            subtitle: "Número de vendas: 40"
          }} />
          <InfoCard data={{
            title: "Carrinhos abandonados",
            info: "R$ 103,20",
            icon: "remove_shopping_cart",
            color: "#9ds",
            subtitle: "Valor recuperado"
          }} />
          <div className="graph-div" style={{
            gridColumn: "span 2"
          }}>
            <h3>Receita</h3>
            <Line options={{
              plugins: {
                legend: {
                  display: false
                }
              }
            }} data={{
              labels: ["20/6", "21/6", "22/6", "23/6", "24/6", "25/6", "26/6"],
              datasets: [{
                label: 'Receita em R$',
                data: [700, 854, 956, 1543, 1678, 1787, 2123],
                fill: true,
                borderColor: "#ff0066",
                backgroundColor: "rgba(255, 0, 102, 0.2)",
                tension: 0.1
              }]
            }}></Line>
          </div>
          <div className="graph-div" style={{
            gridColumn: "span 2"
          }}>
            <h3>Parcelamentos</h3>
            <Bar options={{
              plugins: {
                legend: {
                  display: false
                }
              }
            }} data={{
              labels: ["1x", "2x", "3x", "4x", "6x", "10x", "12x"],
              datasets: [{
                label: 'Receita em R$',
                data: [700, 854, 956, 1543, 1678, 1787, 2123],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)'
                ],
                borderWidth: 1
              }]
            }}></Bar>
          </div>
        </div>
        <div className="home-right">
          <InfoCard data={{
            title: "Ticket Médio",
            info: "R$ 112,06",
            icon: "sell",
            subtitle: "Valor total do ticket médio"
          }} />
          <InfoCard data={{
            title: "Taxa de cancelamento",
            info: "7%",
            icon: "contract_delete",
            color: "crimson",
            subtitle: "9 pedidos cancelados"
          }} />
          <div className="graph-div">
            <h3>Metódos mais utilizados</h3>
            <Pie width={6} data={{
              labels: [
                'Boleto',
                'Pix',
                'Cartão'
              ],
              datasets: [{
                label: '',
                data: [36, 31, 33],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
              }]
            }} />
            
          </div>
          <div className="graph-div" style={{
            gridColumn: "span 2"
          }}>
            <h3>Receita</h3>
            <Line options={{
              plugins: {
                legend: {
                  display: false
                }
              }
            }} data={{
              labels: ["20/6", "21/6", "22/6", "23/6", "24/6", "25/6", "26/6"],
              datasets: [{
                label: 'Receita em R$',
                data: [700, 854, 956, 1543, 1678, 1787, 2123],
                fill: true,
                borderColor: "#ff0066",
                backgroundColor: "rgba(255, 0, 102, 0.2)",
                tension: 0.1
              }]
            }}></Line>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
