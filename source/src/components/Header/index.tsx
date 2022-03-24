import React from "react";

import {
  HeaderWrapper,
  HeaderLogo,
  HeaderBackToHomeButton,
  ConnectWalletButton,
} from "./styled";

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <HeaderLogo />
      <HeaderBackToHomeButton>{"<- back to home"}</HeaderBackToHomeButton>
      <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
    </HeaderWrapper>
  );
};

export default Header;
