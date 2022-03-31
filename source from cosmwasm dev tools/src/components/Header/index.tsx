import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAccount } from "../../features/accounts/accountsSlice";
import { useKeplr } from "../../features/accounts/useKeplr";
import {
  HeaderWrapper,
  HeaderLogo,
  HeaderBackToHomeButton,
  ConnectWalletButton,
} from "./styled";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const { connect } = useKeplr();

  return (
    <HeaderWrapper>
      <HeaderLogo />
      <HeaderBackToHomeButton></HeaderBackToHomeButton>
      <ConnectWalletButton
        onClick={() =>
          !account ? connect() : dispatch(selectAccount(account.address))
        }
      >
        {account?.label ?? "Connect Wallet"}
      </ConnectWalletButton>
    </HeaderWrapper>
  );
};

export default Header;
