import Navbar from "../components/Layout/Navbar";
import Timer from "../components/Shared/timergfot";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import { useSigningClient } from "../contexts/cosmwasm";
import { fromBase64, toBase64 } from "@cosmjs/encoding";
import {
  convertMicroDenomToDenom,
  convertDenomToMicroDenom,
  convertMicroDenomToDenom2,
  convertDenomToMicroDenom2,
  convertFromMicroDenom,
} from "../util/conversion";

import styled from "styled-components";
//components
import Converter from "../components/Converter";
import StakeNClaim from "../components/StakeNClaim";
import StatisticBox from "../components/StatisticBox";

//styled components
const Wrapper = styled.div`
  max-width: 1368px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  width: 100%;
  margin: 24px;
  padding: 0 10px;
  gap: 50px;
`;
const LeftPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 100%;
`;

const RightPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 2;
  max-width: 100%;
`;

const gfotmodule = () => {
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
    fotTokenInfo,
    bfotBalance,
    bfotBalanceStr,
    bfotTokenInfo,
    gfotBalance,
    gfotBalanceStr,
    gfotTokenInfo,

    fotBurnContractInfo,
    bfotBurnContractInfo,
    bfotBurnAmount,
    expectedGfotAmount,

    handlebFotChange,
    executebFotBurn,

    gfotStakingContractInfo,
    gfotStakingAmount,
    setgFotStakingAmount,
    gfotStakingApy,
    gfotStakingMyStaked,
    gfotStakingMyReward,
    handlegFotStakingChange,
    executegFotStaking,
    executegFotClaimReward,
    executegFotUnstake,
  } = useSigningClient();
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let interval = null;
    if (seconds === 0) {
      getBalances();
    }
    interval = setInterval(() => {
      setSeconds((seconds) => (seconds + 1) % 10);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);
  const defaultValues = [
    {
      key: "bFOT Supply",
      value: `${convertMicroDenomToDenom2(
        fotBurnContractInfo.bfot_sent_amount,
        bfotTokenInfo.decimals
      )}`,
    },
    {
      key: "Burned bFOT",
      value: `${convertMicroDenomToDenom2(
        bfotBurnContractInfo.bfot_burn_amount,
        bfotTokenInfo.decimals
      )}`,
    },
    {
      key: "gFOT Supply",
      value: `${convertMicroDenomToDenom2(
        bfotBurnContractInfo.gfot_sent_amount,
        gfotTokenInfo.decimals
      )}`,
    },
  ];

  const handlebFotBurn = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error("Please connect wallet first");
      return;
    }

    if (Number(bfotBurnAmount) == 0) {
      NotificationManager.error("Please input the BFOT amount first");
      return;
    }
    if (Number(bfotBurnAmount) > Number(bfotBalance)) {
      NotificationManager.error("Please input correct FOT amount");
      return;
    }

    event.preventDefault();
    executebFotBurn();
  };

  const onbFotBurnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    if (Number(value) > Number(bfotBalance)) return;
    if (Number(value) < 0) return;
    handlebFotChange(Number(value));
  };

  const handlebFotBurnPlus = () => {
    if (Number(bfotBurnAmount) + 1 > Number(bfotBalance)) return;

    handlebFotChange(Number(bfotBurnAmount) + 1);
  };
  const handlebFotBurnMinus = () => {
    if (Number(bfotBurnAmount) - 1 < 0) return;
    handlebFotChange(Number(bfotBurnAmount) - 1);
  };

  const handlegFotStaking = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error("Please connect wallet first");
      return;
    }

    if (Number(gfotStakingAmount) == 0) {
      NotificationManager.error("Please input the GFOT amount first");
      return;
    }
    if (Number(gfotStakingAmount) > Number(gfotBalance)) {
      NotificationManager.error("Please input correct GFOT amount");
      return;
    }

    event.preventDefault();
    executegFotStaking();
  };

  const handlegFotStakingUnstake = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error("Please connect wallet first");
      return;
    }

    event.preventDefault();
    executegFotUnstake();
  };

  const handlegFotStakingClaimReward = async (
    event: MouseEvent<HTMLElement>
  ) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error("Please connect wallet first");
      return;
    }

    event.preventDefault();
    executegFotClaimReward();
  };

  const ongFotStakingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    if (Number(value) > Number(gfotBalance)) return;
    if (Number(value) < 0) return;
    handlegFotStakingChange(Number(value));
  };

  const handlegFotStakingPlus = () => {
    if (Number(gfotStakingAmount) + 1 > Number(gfotBalance)) return;

    handlegFotStakingChange(Number(gfotStakingAmount) + 1);
  };
  const handlegFotStakingMinus = () => {
    if (Number(gfotStakingAmount) - 1 < 0) return;
    handlegFotStakingChange(Number(gfotStakingAmount) - 1);
  };

  return (
    <>
      <Wrapper>
        <LeftPart>
          <Converter
            handleBurnMinus={handlebFotBurnMinus}
            burnAmount={bfotBurnAmount}
            onBurnChange={onbFotBurnChange}
            handleBurnPlus={handlebFotBurnPlus}
            expectedAmount={expectedGfotAmount}
            convImg="/images/gfotarrow.png"
            from="bFOT"
            to="gFOT"
            handleSubmit={handlebFotBurn}
            balance={bfotBalance}
            handleChange={handlebFotChange}
          />
        </LeftPart>
        <RightPart>
          <StakeNClaim
            handleBurnMinus={handlegFotStakingMinus}
            onBurnChange={ongFotStakingChange}
            handleBurnPlus={handlegFotStakingPlus}
            handleFotStaking={handlegFotStaking}
            handleFotStakingUnstake={handlegFotStakingUnstake}
            handleFotStakingClaimReward={handlegFotStakingClaimReward}
          />
          <StatisticBox values={defaultValues} />
        </RightPart>
      </Wrapper>
    </>
  );
};

export default gfotmodule;
