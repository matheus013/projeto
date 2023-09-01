import styled from "styled-components";

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 282px;
  height: 100%;
  /* background-color: ${(props) => props.theme.sidebar.backgroundColor}; */
  overflow-y: auto;
  color: #ffece9;
  box-shadow: 0px 14px 25px 0px #0d69c60f;
`;

export const List = styled.li`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 25px;
  font-weight: 500px;
  font-size: 14px;
  vertical-align: middle;
  position: relative;
  cursor: pointer;

  &:hover{
    color: ${props => props.theme.sidebar["list-color"]};
    background-color: ${props => props.theme.sidebar["list-bg"]}
  }

  &.active{
    background-color: rgba(255, 255, 255, 0.2);
    color: ${props => props.theme.sidebar.backgroundColor};
  }

  &.active::before{
    content: "";
    position: absolute;
    width: 5px;
    height: 100%;
    left: 0;
    top: 0;
    background-color: ${props => props.theme.sidebar.backgroundColor};
  }
`;

export const LogOut = styled(List)`
  background-color: transparent;
  border: none;
  position: absolute;
  bottom: 20px;
  left: 50%;
  width: 100%;
  display: flex;
  transform: translateX(-50%);
  color: white;
  &:hover {
    background-color: transparent;
    color: white;
  }
`;
