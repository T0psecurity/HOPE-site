import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 155px 125px 50px 125px;
  display: grid;
  grid-template-columns: repeat(auto-fit, min(370px));
  grid-gap: 20px;
  justify-content: space-between;
  align-items: start;
  min-height: calc(100vh - 82px - 53px - 155px - 50px);
`;

export const ControlWrapper = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-around;
  width: 40%;
`;

export const StyledButton = styled.button`
  background: #141416;
  border: 2px solid rgb(213, 129, 129);
  border-radius: 5px;
  color: rgb(213, 129, 129);
  width: 100px;
  height: 60px;
  cursor: pointer;
  &:hover {
    background: rgb(213, 129, 129);
    color: black;
  }
`;

export const StyledInput = styled.input`
  width: 200px;
  background: #141416;
  border: 2px solid rgb(213, 129, 129);
  border-radius: 5px;
  color: rgb(213, 129, 129);
  font-size: 20px;
`;
