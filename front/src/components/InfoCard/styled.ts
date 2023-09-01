import styled from "styled-components";

export const Card = styled.div`
  background-color: white;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);

  & .card__left {
    display: flex;
    align-items: center;
  }

  & .card__right {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  & .card__icon {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  & .card__content {
    display: flex;
    gap: 5%;
    padding: 15px;
  }

  & .card__title {
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
  }

  & .card__info {
    font-weight: bold;
  }

  & .card__caption {
    font-weight: 500;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    border-bottom: px solid #ddd;
  }

  & .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    color: #0d69c6;
    border-radius: 50%;
  }
`;
