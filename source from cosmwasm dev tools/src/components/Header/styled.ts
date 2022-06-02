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
  padding: 0 30px;
  justify-content: space-between;
  position: relative;
`;

export const HeaderLogo = styled.div`
  background: url("/logo.png");
  background-size: cover;
  background-position: center;
  width: 183px;
  height: 60px;
  cursor: pointer;
`;

export const HeaderBackToHomeButton = styled.div`
  color: white;
  height: 60px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 25px;
`;

export const StyledButton = styled.div<{color: string}>`
  color: ${({color})=>color};
  text-align: center;
  padding: 10px;
  border: 1px solid ${({color})=>color};
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  display: flex;
  margin: 0 10px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  @media (max-width: 425px) {
    right: 30px;
  }
  @media (max-width: 375px) {
    right: 10px;
  }
`;

export const DisconnectIcon = styled.img`
  margin-left: 10px;
  width: 20px;
  height: 20px;
`;
export const Text = styled.div`
  color: white;
  font-size: 32px;
  font-weight: 500;
  margin-left: 20px;
`
export const MenuIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: relative;
`;

export const MenuIcon = styled.div``;

export const MenuContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  padding-bottom: 8px;
  z-index: 2;
`;

export const MenuItem = styled.div`
  text-align: left;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  line-height: 1.5;
  width: max-content;
  letter-spacing: 0.00938rem;
  color: black;
`;
