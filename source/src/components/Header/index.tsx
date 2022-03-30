import React from "react";
import { Window as KeplrWindow } from "@keplr-wallet/types";

import { config } from "../../config";
import { configKeplr } from "../../services";
declare global {
  interface Window extends KeplrWindow {}
}

import {
  HeaderWrapper,
  HeaderLogo,
  HeaderBackToHomeButton,
  ConnectWalletButton,
} from "./styled";

const Header: React.FC = () => {
  const connectWallet = async () => {
    if (!window.keplr) return;
    await window.keplr.experimentalSuggestChain(configKeplr(config));
    await window.keplr.enable(config.chainId);
    const signer: any = window.keplr.getOfflineSigner(config.chainId);
    const accounts = await signer.getAccounts();
  };

  return (
    <HeaderWrapper>
      <HeaderLogo />
      <HeaderBackToHomeButton>{"<- back to home"}</HeaderBackToHomeButton>
      <ConnectWalletButton onClick={connectWallet}>
        Connect Wallet
      </ConnectWalletButton>
    </HeaderWrapper>
  );
};

export default Header;
