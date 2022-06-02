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

export const StyledButton = styled.button<{ width?: string, color?:string }>`
  background: black;
  border: 2px solid ${({color})=>color};
  border-radius: 5px;
  color: ${({color})=>color};
  width: ${({ width }) => width ?? "100px"};
  height: 60px;
  cursor: pointer;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 5px;
  &:hover {
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    letter-spacing: unset;
    margin: 10px;
  }
`;

export const VideoWrapper = styled.div`
  margin-top: 10px;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 20;
`;

export const ControlWrapper = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  position: relative;
  min-height: 60px;
  justify-content: space-between;

  @media (max-width: 768px) {
    font-size: 16px;
    letter-spacing: unset;
    flex-direction: column;
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
  color: white;
  margin: 0 20px;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 625px) {
    font-size: 18px;
    width: 100%;
  }
`;

export const TotalMintedCount = styled.div`
  @media (max-width: 425px) {
    position: relative;
    left: unset;
    top: unset;
  }
  margin: 0 30px;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const Divider = styled.div`
  height: 5px;
  width: 100%;
  background: white;
  margin: 0 auto;
`

export const SubArea = styled.div`
  min-height: 300px;
  color: white;
  font-size: 36px;
  margin-top: 20px;
`

export const Container = styled.div`
  padding: 20px;
`
export const ComingSoonArea = styled.div`
  color: #5B5B5B;
  font-size: 36px;
  margin-top: 20px;
  padding: 20px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`