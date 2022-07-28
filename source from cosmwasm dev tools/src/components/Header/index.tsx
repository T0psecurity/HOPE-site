import React, { useEffect, useState } from "react";
import { useWalletManager } from "@noahsaso/cosmodal";
import { coin } from "@cosmjs/proto-signing";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useWindowSize from "../../hook/useWindowSize";
import useOnClickOutside from "../../hook/useOnClickOutside";
import {
  AccountType,
  setKeplrAccount,
} from "../../features/accounts/accountsSlice";
// import { useKeplr } from "../../features/accounts/useKeplr";
import Logo from "../../assets/images/logo";
import {
  HeaderWrapper,
  HeaderLogo,
  StyledButton,
  DisconnectIcon,
  MenuIcon,
  MenuIconContainer,
  MenuContainer,
  MenuItem,
  HeaderLogoContainer,
  HeaderMainContent,
  PricesContainer,
} from "./styled";
import TokenPrice from "../TokenPrice";
const ListIcon = (
  <svg
    width="63"
    height="55"
    viewBox="0 0 63 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="20.644" y="20.4805" width="24" height="2" rx="1" fill="#ffffff" />
    <rect x="20.644" y="26.4805" width="24" height="2" rx="1" fill="#ffffff" />
    <rect x="20.644" y="32.4805" width="24" height="2" rx="1" fill="#ffffff" />
  </svg>
);
const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const config = useAppSelector((state) => state.connection.config);
  const [ref, setRef] = useState<HTMLDivElement | null>(null); // TODO: must use useRef
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  // const { connect } = useKeplr();
  const { connect, disconnect, connectedWallet } = useWalletManager();
  const { isMobile } = useWindowSize(800);

  useEffect(() => {
    if (!connectedWallet) {
      dispatch(setKeplrAccount());
    } else {
      const { name: label, address } = connectedWallet;
      dispatch(
        setKeplrAccount({
          label,
          address,
          type: AccountType.Keplr,
          balance: coin(0, config.microDenom),
        })
      );
    }
  }, [config.microDenom, connectedWallet, dispatch]);

  const clickWalletButton = () => {
    if (!account) {
      connect();
    } else {
      disconnect();
    }
  };

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  const handleClickLink = (url: string) => {
    window.open(url);
  };
  const handleClickOutsideMenuIcon = () => {
    setIsOpenMenu(false);
  };
  useOnClickOutside(ref, handleClickOutsideMenuIcon);
  return (
    <HeaderWrapper>
      <HeaderMainContent isMobile={isMobile}>
        <HeaderLogoContainer
          isMobile={isMobile}
          onClick={() => window.open("https://hopegalaxy.io")}
        >
          <HeaderLogo /> HOPE GALAXY APP
          {/* {!isMobile && <Text>Supply 14.180 $HOPE</Text>} */}
        </HeaderLogoContainer>
        {isMobile ? (
          <MenuIconContainer ref={(node) => setRef(node)}>
            <MenuIcon onClick={handleOpenMenu}>{ListIcon}</MenuIcon>
            {isOpenMenu && (
              <MenuContainer onClick={(e) => e.preventDefault()}>
                <MenuItem
                  onClick={() => handleClickLink("https://hopegalaxy.io")}
                >
                  Hope Galaxy
                </MenuItem>
                <MenuItem onClick={() => handleClickLink("https://hopers.io")}>
                  MarketPlace
                </MenuItem>
                <MenuItem onClick={clickWalletButton}>
                  {account ? (
                    <>
                      {account.label}
                      <DisconnectIcon alt="" src="/others/logout.png" />
                    </>
                  ) : (
                    "Connect Wallet"
                  )}
                </MenuItem>
              </MenuContainer>
            )}
          </MenuIconContainer>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <StyledButton
              color="#E9867B"
              onClick={() => window.open("https://hopegalaxy.io")}
            >
              Hope Galaxy &nbsp; <Logo color="#E9867B" width="20px" />
            </StyledButton>
            <StyledButton
              color="#47D42D"
              onClick={() => window.open("https://hopers.io")}
            >
              MarketPlace &nbsp;
              <Logo color="#47D42D" width="20px" />
            </StyledButton>
            <StyledButton onClick={clickWalletButton} color="white">
              {account ? (
                <>
                  {account.label}
                  <DisconnectIcon alt="" src="/others/logout.png" />
                </>
              ) : (
                "Connect Wallet"
              )}
            </StyledButton>
          </div>
        )}
      </HeaderMainContent>
      <PricesContainer>
        <TokenPrice tokenType="juno" />
        <TokenPrice tokenType="hope" />
      </PricesContainer>
    </HeaderWrapper>
  );
};

export default Header;
