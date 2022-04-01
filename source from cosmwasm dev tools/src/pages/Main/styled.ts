import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 155px 125px 50px 125px;
  display: grid;
  grid-template-columns: repeat(auto-fit, min(370px));
  grid-gap: 20px;
  justify-content: space-between;
  align-items: start;
  position: relative;
  min-height: calc(100vh - 82px - 53px - 155px - 50px - 100px);
`;

export const StyledButton = styled.button`
  background: #141416;
  border: 2px solid rgb(213, 129, 129);
  border-radius: 5px;
  color: rgb(213, 129, 129);
  width: 100px;
  height: 60px;
  cursor: pointer;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 5px;
  &:hover {
    background: rgb(213, 129, 129);
    color: black;
  }
`;

export const VideoWrapper = styled.div`
  margin-top: 10px;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;

export const ControlWrapper = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center;
  /* width: 40%; */
`;

export const StyledInput = styled.input`
  width: 200px;
  background: #141416;
  border: 2px solid rgb(213, 129, 129);
  border-radius: 5px;
  color: rgb(213, 129, 129);
  font-size: 20px;
  margin: 0 20px;
  padding-left: 20px;
`;

export const StyledSpan = styled.span`
  color: rgb(213, 129, 129);
  margin: 0 20px;
  font-size: 22px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TotalMintedCount = styled(StyledSpan)`
  position: absolute;
  right: 10px;
  top: 20px;
`;
