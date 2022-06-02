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

  @media (max-width: 768px) {
    padding: 50px;
    min-height: calc(100vh - 82px - 53px - 50px - 50px - 100px);
  }
  @media (max-width: 425px) {
    padding: 50px;
    min-height: calc(100vh - 82px - 53px - 50px - 50px - 140px);
  }
`;

export const StyledButton = styled.button<{ width?: string }>`
  background: #141416;
  border: 2px solid rgb(213, 129, 129);
  border-radius: 5px;
  color: rgb(213, 129, 129);
  width: ${({ width }) => width ?? "100px"};
  height: 60px;
  cursor: pointer;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 5px;
  &:hover {
    background: rgb(213, 129, 129);
    color: black;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    letter-spacing: unset;
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
  align-items: center;
  position: relative;
  min-height: 60px;
  /* width: 40%; */

  @media (max-width: 768px) {
    font-size: 16px;
    letter-spacing: unset;
  }
  @media (max-width: 425px) {
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const StyledInput = styled.input`
  width: 200px;
  height: 60px;
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
  @media (max-width: 425px) {
    font-size: 18px;
  }
`;

export const TotalMintedCount = styled.div`
  position: absolute;
  left: 10px;
  top: 25px;
  @media (max-width: 425px) {
    position: relative;
    left: unset;
    top: unset;
  }
`;

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
