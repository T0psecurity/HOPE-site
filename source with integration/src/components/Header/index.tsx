import React from "react";

import {
  HeaderWrapper,
  HeaderLogo,
  HeaderBackToHomeButton,
  ConnectWalletButton,
} from "./styled";

import { Window as KeplrWindow } from "@keplr-wallet/types";
import { useSdk } from "../../services/client/wallet";
import { config } from "../../config";
import {
  configKeplr,
  loadKeplrWallet,
  WalletLoader,
  formatAddress,
  formatPrice,
  getTokenConfig,
} from "../../services";



const Header: React.FC = () => {
  const sdk = useSdk();
  async function init(loadWallet: WalletLoader) {
    const signer = await loadWallet(config.chainId, config.addressPrefix);
    sdk.init(signer);
  }
  const connectWallet = async () => {
    const anyWindow = window as KeplrWindow;
    try {
      await anyWindow.keplr?.experimentalSuggestChain(configKeplr(config));
      await anyWindow.keplr?.enable(config.chainId);
      await init(loadKeplrWallet);
    } catch (error) {
      console.error(error);
    }

  }
  return (
    <HeaderWrapper>
      <HeaderLogo />
      <HeaderBackToHomeButton></HeaderBackToHomeButton>
      <ConnectWalletButton onClick={connectWallet}>Connect Wallet</ConnectWalletButton>
    </HeaderWrapper>
  );
};

export default Header;
