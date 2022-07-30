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
  StyledSvg,
  MigrateButtonContainer,
  MigrateButton,
  MigratePopupContainer,
  MigrateHeaderLogoContainer,
  MigrateHeaderLogo,
  MigratePopupContent,
} from "./styled";
import TokenPrice from "../TokenPrice";
import useContract, { contractAddresses } from "../../hook/useContract";
import { toast } from "react-toastify";

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

const ArrowIcon = ({ ...props }) => (
  <StyledSvg
    width="103"
    height="24"
    viewBox="0 0 103 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M102.061 13.0607C102.646 12.4749 102.646 11.5251 102.061 10.9394L92.5147 1.39341C91.9289 0.807628 90.9792 0.807627 90.3934 1.39341C89.8076 1.9792 89.8076 2.92895 90.3934 3.51473L98.8787 12L90.3934 20.4853C89.8076 21.0711 89.8076 22.0208 90.3934 22.6066C90.9792 23.1924 91.9289 23.1924 92.5147 22.6066L102.061 13.0607ZM-2.62268e-07 13.5L101 13.5L101 10.5L2.62268e-07 10.5L-2.62268e-07 13.5Z"
      fill="#FCFF5C"
    />
  </StyledSvg>
);

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const config = useAppSelector((state) => state.connection.config);
  const stakedNfts = useAppSelector((state) => state.stakedNfts.nfts);
  const [ref, setRef] = useState<HTMLDivElement | null>(null); // TODO: must use useRef
  const [popupRef, setPopupRef] = useState<HTMLDivElement | null>(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenMigratePopup, setIsOpenMigratePopup] = useState(false);
  // const { connect } = useKeplr();
  const { connect, disconnect, connectedWallet } = useWalletManager();
  const { isMobile } = useWindowSize(800);
  const { getClient, createExecuteMessage } = useContract();

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
    console.log("click wallet button");
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

  const handleShowMigratePopup = (e: any) => {
    e.stopPropagation();
    setIsOpenMigratePopup((prev) => !prev);
  };

  useOnClickOutside(popupRef, (e: any) => {
    e.stopPropagation();
    setIsOpenMigratePopup(false);
  });

  const handleMigrateNfts = async () => {
    if (!account || !stakedNfts || !stakedNfts.length) return;
    const client = await getClient();
    let executeMessages: any = [];
    stakedNfts.forEach((nft: any) => {
      if (!nft.migrated) {
        if (nft.status === "Staked")
          executeMessages.push(
            createExecuteMessage({
              senderAddress: account.address,
              contractAddress: nft.contractAddress,
              message: {
                unstake_nft: { token_id: nft.token_id },
              },
            })
          );
        executeMessages.push(
          createExecuteMessage({
            senderAddress: account.address,
            contractAddress: nft.contractAddress,
            message: {
              withdraw_nft: { token_id: nft.token_id },
            },
          })
        );
        executeMessages.push(
          createExecuteMessage({
            senderAddress: account.address,
            contractAddress: contractAddresses.REVEAL_NFT_CONTRACT,
            message: {
              send_nft: {
                contract: contractAddresses.STAKING_CONTRACT,
                token_id: nft.token_id,
                msg: btoa("staking"),
              },
            },
          })
        );
      }
    });
    if (!executeMessages.length) return;
    try {
      await client.signAndBroadcast(account.address, executeMessages, "auto");
      toast.success("Successfully Migrated!");
    } catch (e: any) {}
  };

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
      <MigrateButtonContainer>
        <ArrowIcon />
        <MigrateButton onClick={handleShowMigratePopup}>
          Migrate Now to HopeGalaxy App v2
        </MigrateButton>
        <ArrowIcon revert />
        {isOpenMigratePopup && (
          <MigratePopupContainer ref={(node) => setPopupRef(node)}>
            <MigrateHeaderLogoContainer isMobile={isMobile}>
              <MigrateHeaderLogo /> HOPE GALAXY APP
            </MigrateHeaderLogoContainer>
            <MigratePopupContent>
              Migrate your NFTs Staked to HopeGalaxy APP v2
            </MigratePopupContent>
            <MigrateButton onClick={handleMigrateNfts}>
              MigrateButton
            </MigrateButton>
          </MigratePopupContainer>
        )}
      </MigrateButtonContainer>
    </HeaderWrapper>
  );
};

export default Header;
