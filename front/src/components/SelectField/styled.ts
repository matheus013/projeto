import styled from "styled-components";

export const StyledSelect = styled.select`
  width: 100%;
  font-size: 16px;
  padding: 20px 0px;
  appearance: none;
  height: 56px;
  border: none;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  outline: none;
  color: #8e8e8e;
  cursor: pointer;

  &:focus{
    border-bottom: 1px solid ${props => props.theme.primaryColor}
  }
`;
