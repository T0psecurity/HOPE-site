import React from "react";

import NFTItem from "../../components/NFTItem";
import { config } from "../../config";

import { Wrapper, ControlWrapper, StyledButton, StyledInput } from "./styled";

const Main: React.FC = () => {
  const [value, setValue] = React.useState("");

  const getAccountInfo = async () => {
    console.log("here", value);
    if (!window.keplr) return;
    const signer: any = window.keplr.getOfflineSigner(config.chainId);
    const accounts = await signer.getAccounts();
    const sender_address = accounts[0].address;
    console.log(
      "🚀 ~ file: index.tsx ~ line 18 ~ getAccountInfo ~ sender_address",
      sender_address
    );
  };

  return (
    <>
      <Wrapper>
        <NFTItem id="NFTItem1" />
      </Wrapper>
      <ControlWrapper>
        <StyledButton onClick={getAccountInfo}>Test button</StyledButton>
        <StyledInput value={value} onChange={(e) => setValue(e.target.value)} />
        <StyledButton onClick={getAccountInfo}>Test button</StyledButton>
      </ControlWrapper>
    </>
  );
};

export default Main;
