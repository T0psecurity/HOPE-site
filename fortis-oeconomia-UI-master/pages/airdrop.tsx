import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import styled from "styled-components"

import { useSigningClient } from "../contexts/cosmwasm";
import { fromBase64, toBase64 } from "@cosmjs/encoding";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  margin: 0 !important;
  align-items: center;
  padding: 0 !important;
`

const CurrencySelection = styled.div`
  display: flex;
  flex-direction: column;
`

const Ellipse2 = styled.div`
    position: absolute;
    border-radius: 100%;
    width: 275px;
    height: 250px;
    left: 520px;
    top: 180px;
    background: #ffb049;
    filter: blur(110px);
`
const Ellipse3 = styled.div`
    position: absolute;
    width: 289px;
    height: 286px;
    border-radius: 100%;
    left: -93px;
    bottom: 85px;
    background: #83B8DD;
    filter: blur(75px);
`

const CreateWork = () => {
  const {
    walletAddress,
    signingClient,
    loading,
    error,
    connectWallet,
    disconnect,
    client,

    getBalances,
    nativeBalanceStr,
    nativeBalance,
    fotBalance,
    fotBalanceStr,

    alreadyAirdropped,
    airdropAmount,
    airdropAmountDenom,
    merkleProof,

    getMyAirdropAmount,
    GetAlreadyAirdropped,
    executeAirdrop,
  } = useSigningClient();

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return;
    }
    getMyAirdropAmount();
    GetAlreadyAirdropped();
  }, [signingClient, walletAddress]);

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return;
    }
  }, [airdropAmount]);

  const handleSubmit = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error("Please connect wallet first");
      return;
    }

    if (alreadyAirdropped) {
      NotificationManager.warning("Already airdropped");
      return;
    }

    event.preventDefault();

    executeAirdrop();
  };

  return (
    <>
      <Wrapper className="trade-cryptocurrency-area ptb-100 w-full">
        <div className="container">
          <div className="trade-cryptocurrency-box-div">
            <div className="trade-cryptocurrency-content">
              <div className="trade-cryptocurrency-box">
                <Ellipse2 />
                <Ellipse3 />
                <CurrencySelection className="currency-selection">
                  <span>Votedrop Juno Proposal #14</span>
                  <label style={{ alignItems: "center", textAlign: "center", height: "fit-content" }}> {alreadyAirdropped ? 0 : airdropAmountDenom}</label>
                </CurrencySelection>

                <button type="submit" onClick={handleSubmit} disabled={alreadyAirdropped}>
                  {alreadyAirdropped ? `Already Claimed` : `Claim`}
                </button>
                {walletAddress.length == 0 ? <></> :
                  <div className='banner-wrapper-content' style={{ "marginRight": "0" }}>
                    <span className="sub-title ms-2" style={{ "marginBottom": "0px" }}>
                      {fotBalanceStr}
                    </span>
                  </div>
                }

              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default CreateWork;
