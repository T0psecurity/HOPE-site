import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setKeplrAccount } from "../../features/accounts/accountsSlice";
import { useKeplr } from "../../features/accounts/useKeplr";
import {
  HeaderWrapper,
  HeaderLogo,
  // HeaderBackToHomeButton,
  ConnectWalletButton,
  DisconnectIcon,
} from "./styled";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const { connect } = useKeplr();

  const clickWalletButton = () => {
    if (!account) {
      connect();
    } else {
      dispatch(setKeplrAccount());
    }
  };

  return (
    <HeaderWrapper>
      <HeaderLogo onClick={() => window.open("https://hopegalaxy.io")} />
      {/* <HeaderBackToHomeButton>{"<- back to home"}</HeaderBackToHomeButton> */}
      <ConnectWalletButton
        // onClick={() =>
        //   !account ? connect() : dispatch(selectAccount(account.address))
        // }
        onClick={clickWalletButton}
      >
        {account ? (
          <>
            {account.label}
            <DisconnectIcon alt="" src="/others/logout.png" />
          </>
        ) : (
          "Connect Wallet"
        )}
      </ConnectWalletButton>
    </HeaderWrapper>
  );
};

export default Header;
