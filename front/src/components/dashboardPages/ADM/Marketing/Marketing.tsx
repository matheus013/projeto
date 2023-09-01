import Icon from "@/components/Icon";
import { useTheme } from "@/hooks/useTheme";

const Marketing = () => {
  const { currentTheme } = useTheme();

  return (
    <div className="page">
      <div className="page__header">
        <h1>Marketing</h1>
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
          <h3>Banners</h3>
          <p className="card__desc">Utilize os banners para destacar seus produtos e oferecer promoções para seus clientes.</p>
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
          <h3>Cupons</h3>
          <p className="card__desc">Crie e gerencie descontos personalizados para aumentar suas vendas.</p>
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
          <h3>Order bump</h3>
          <p className="card__desc">Ofereça um produto adicional na etapa de pagamento do checkout e ganhe mais.</p>
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
          <h3>Upsell</h3>
          <p className="card__desc">Crie ofertas em que seu cliente pode comprar pelo cartão com apenas 1 clique.</p>
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
          <h3>Pixel</h3>
          <p className="card__desc">Acompanhe a eficácia dos seus anúncios por meio das ações realizadas pelos seus clientes.</p>
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
          <h3>Compre junto</h3>
          <p className="card__desc">Ofereça produtos adicionais na sua loja para estimular a compra de mais de um produto.</p>
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
          }} className="card__icon"><Icon color={currentTheme.primaryColor} name="payments" type="rounded" /></span>
          <h3>Faixas de desconto</h3>
          <p className="card__desc">Crie e gerencie descontos em compras com mais de um item.</p>
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
          }} className="card__icon"><Icon color={currentTheme.primaryColor} name="price_check" type="rounded" /></span>
          <h3>Promoções</h3>
          <p className="card__desc">Crie e gerencie promoções para produtos selecionados.</p>
        </div>
      </div>
    </div>
  )
  
};

export default Marketing;