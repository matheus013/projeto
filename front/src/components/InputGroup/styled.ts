import styled from "styled-components";

export const FloatingLabel = styled.div`
  position: relative;
  margin-bottom: 10px;
  width: 100%;

  & input {
    font-size: 16px;
    padding: 20px 0px;
    height: 56px;
    border: none;
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    background: #fff;
    width: 280px;
    box-sizing: border-box;
    transition: all 0.3s linear;
    color: #000;
    font-weight: 400;
    appearance: none;
  }
  & input:focus {
    border-bottom: solid 1px ${props => props.theme.primaryColor};
    outline: 0;
    box-shadow: 0 2px 6px -8px rgba(182, 157, 230, 0.45);
  }

  & label {
    position: absolute;
    top: calc(50% - 7px);
    left: 0;
    opacity: 0;
    transition: all 0.3s ease;
    padding-left: 44px;
  }
  & input {
    width: calc(100% - 44px);
    margin-left: auto;
    display: flex;
  }

  & .icon {
    position: absolute;
    top: 0;
    left: 0;
    height: 56px;
    width: 44px;
    display: flex;
  }

  & .icon span {
    height: 30px;
    width: 30px;
    margin: auto;
    opacity: 0.15;
    transition: all 0.3s ease;
  }

  & input:not(:placeholder-shown) {
    padding: 28px 0px 12px 0px;
  }

  & input:not(:placeholder-shown) + label {
    transform: translateY(-10px);
    opacity: 0.7;
  }

  & input:valid:not(:placeholder-shown) + label + .icon span {
    opacity: 1;
    color: ${props => props.theme.primaryColor};
  }

  & .not-valid:not(:valid) {
    border-bottom: 1px solid crimson;
    color: crimson;
  }

  & input:not(:valid):not(:focus) + label + .icon {
    animation-name: shake-shake;
    animation-duration: 0.3s;
  }
`;
