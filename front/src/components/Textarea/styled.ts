import styled from "styled-components";

export const Textfield = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & span {
    font-size: 16px;
  }

  & textarea {
    width: 100%;
    max-width: 100%;
    grid-column: span 2;
    outline: none;
    padding: 15px 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  & textarea:focus {
    border: 1px solid ${(props) => props.theme.primaryColor};
  }
`;
