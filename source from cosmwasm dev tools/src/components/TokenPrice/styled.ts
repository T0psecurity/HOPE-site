import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: transparent;
  border: 1px solid white;
  /* box-shadow: 0px 0px 25px rgba(48, 73, 191, 0.07); */
  border-radius: 10px;
  /* height: 80px; */
  /* width: 282px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px;
`;

export const TokenImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

export const TokenName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 5px;
`;

export const TokenMainName = styled.div``;

export const TokenPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Text = styled.span<{
  color?: string;
  fontSize?: string;
  textTransform?: string;
}>`
  color: ${({ color }) => color ?? "white"};
  font-size: ${({ fontSize }) => fontSize ?? "18px"};
  text-transform: ${({ textTransform }) => textTransform ?? ""};
  user-select: none;
`;
