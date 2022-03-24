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
