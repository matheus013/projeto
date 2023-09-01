import styled from "styled-components";

export const InputPhotoDiv = styled.div`
  position: relative;
  margin: auto;
  grid-column: span 2;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & .round {
    width: 130px;
    height: 130px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  & .round img {
    width: 100%;
    height: 100%;
    padding: 2px;
  }

  & .round input {
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
  }
`;

export const InputImageDiv = styled.div`
  position: relative;
  margin: auto;
  grid-column: span 2;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  & .round {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  & .round img {
    max-width: 100%;
  }

  & .round input {
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
    border: none;
  }
`;
