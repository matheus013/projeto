import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 20px;
  background-color: ${props => props.theme.header.backgroundColor};
  border-radius: 18px;
  box-shadow: 0px 14px 25px 0px #0d69c60f;
  & .header__left {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  & .header__right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  & .header__right img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
  }

  & .header__right span {
    color: #a5b1ce;
  }
`;
