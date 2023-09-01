import { Card } from "./styled";

interface InfoCardType {
  data: InfoCardData
  className?: string
};

interface InfoCardData {
  subtitle?: string;
  title?: string;
  info?: number | string;
  icon?: string;
  color?: string;
  bgColor?: string; 
  gainN?: number;
  gainP?: string
}

const InfoCard = ({ data, className } : InfoCardType) => {
  return (
    <Card>
      <div className="card__content">
        <div className="card__left">
          <div className="card__icon">
            <div style={{backgroundColor: data.bgColor, color: data.color}} className="circle">
              <span className="material-symbols-outlined">{data.icon}</span>
            </div>
          </div>
        </div>
        <div className="card__right">
          <span className="card__title">{ data.title }</span>
          <h3 className="card__info">{ data.info }</h3>
          <span className="card__caption">
            <span>{data.subtitle}</span>
          </span>
        </div>
      </div>
    </Card>
  );
};

export default InfoCard;