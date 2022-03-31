import styled from "styled-components";

export const HeaderWrapper = styled.div`
  /* width: 100vw; */
  height: 76px;
  background-color: rgba(20, 20, 20, 1);
  color: white;
  border-bottom: 3px solid #d58181;
  border-top: 3px solid #d58181;
  box-shadow: 0 0 30px 0 #d58181;
  display: flex;
  align-items: center;
  padding-left: 230px;
  position: relative;
`;

export const HeaderLogo = styled.div`
  background: url("/logo.png");
  background-size: cover;
  background-position: center;
  width: 183px;
  height: 60px;
  cursor: pointer
`;

export const HeaderBackToHomeButton = styled.div`
  color: white;
  height: 60px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 25px;
`;

export const ConnectWalletButton = styled.div`
  position: absolute;
  right: 50px;
  color: white;
  text-align: center;
  padding: 20px;
  border: 1px solid white;
  cursor: pointer;
  user-select: none;
`;
