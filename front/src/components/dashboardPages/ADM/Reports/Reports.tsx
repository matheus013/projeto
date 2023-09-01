import { useTheme } from "@/hooks/useTheme";
import Icon from "@/components/Icon";

const Reports = () => {
  const { currentTheme } = useTheme();
  return (
    <div className="page">
      <div className="page__header">
        <h1>Relatórios</h1>
      </div>
      <div className="page__main m-card-container">
        <div className="marketing-card">
          <span style={{
            backgroundColor: "#f5f5f5",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "50px"
          }} className="card__icon"><Icon color={currentTheme.primaryColor} name="campaign" type="rounded" /></span>
          <h3>Vendas por produto</h3>
          <p className="card__desc">Acompanhe as vendas dos seus produtos e faças comparativos.</p>
        </div>
        <div className="marketing-card">
          <span style={{
            backgroundColor: "#f5f5f5",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "50px"
          }} className="card__icon"><Icon color={currentTheme.primaryColor} name="confirmation_number" type="rounded" /></span>
          <h3>Vendas por cupom</h3>
          <p className="card__desc">Acompanha suas vendas por cupom e faça comparativos</p>
        </div>
        <div className="marketing-card">
          <span style={{
            backgroundColor: "#f5f5f5",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "50px"
          }} className="card__icon"><Icon color={currentTheme.primaryColor} name="laundry" type="rounded" /></span>
          <h3>Vendas por comparativo</h3>
          <p className="card__desc">Acompanhe as vendas por kit e faça comparativos.</p>
        </div>
        <div className="marketing-card">
          <span style={{
            backgroundColor: "#f5f5f5",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "50px"
          }} className="card__icon"><Icon color={currentTheme.primaryColor} name="dashboard" type="rounded" /></span>
          <h3>Conversão de boletos por produtos</h3>
          <p className="card__desc">Acompanhe a conversão de boletos e faça comparativos.</p>
        </div>
        <div className="marketing-card">
          <span style={{
            backgroundColor: "#f5f5f5",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "50px"
          }} className="card__icon"><Icon color={currentTheme.primaryColor} name="code" type="rounded" /></span>
          <h3>Vendas por upsell</h3>
          <p className="card__desc">Acompanhe as suas vendas por upsell e faça comparativos.</p>
        </div>
        <div className="marketing-card">
          <span style={{
            backgroundColor: "#f5f5f5",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "50px"
          }} className="card__icon"><Icon color={currentTheme.primaryColor} name="shopping_cart" type="rounded" /></span>
          <h3>Vendas por order bump</h3>
          <p className="card__desc">Acompanhe as vendas por order bump e faça comparativos.</p>
        </div>
      </div>
    </div>
  )
};

export default Reports;