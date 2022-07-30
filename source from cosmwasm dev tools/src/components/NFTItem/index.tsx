import React, { useState, useMemo } from "react";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

// import { useBarcode } from "@createnextapp/react-barcode";

import useContract, { contractAddresses } from "../../hook/useContract";
import { useAppSelector } from "../../app/hooks";
import { formatDurationTime } from "../../util/formatTime";

import {
  NFTItemWrapper,
  NFTItemBadge,
  NFTItemImageDownloadIcon,
  NFTItemImage,
  NFTItemInfoContainer,
  NFTItemInfo,
  NFTItemOperationContainer,
  NFTItemOperationButton,
  NFTItemOperationCell,
  NFTItemTransferAddress,
  JunoWalletIndicator,
  RarityRankContainer,
  RarityRankContent,
} from "./styled";

export interface NFTItemProps {
  id: string;
  metaData?: string;
  item?: any;
  unStakingPeriod?: number;
  fetchNFT?: any;
  currentTime: number;
  rarityRank: any;
}

export const NFTItemStatus = {
  ONSALE: "On Sale",
  AVAILABLE: "Available",
  STAKED: "Staked",
  UNSTAKED: "Unstaked",
};

export const NFTPriceType = {
  HOPE: "hope",
  JUNO: "juno",
};

export const OperationButtonType = {
  TRANSFER: "Transfer",
  WITHDRAW: "Withdraw",
  SELL: "Sell",
  STAKE: "Stake",
  UNSTAKE: "Unstake",
};

export default function NFTItem({
  id,
  metaData,
  item,
  unStakingPeriod,
  fetchNFT,
  currentTime,
  rarityRank,
}: NFTItemProps) {
  const [sendingTx, setSendingTx] = useState(false);
  const [transferTarget, setTransferTarget] = useState("");
  const { runExecute } = useContract();
  const revealNftContract = useAppSelector(
    (state) => state.accounts.accountList[contractAddresses.REVEAL_NFT_CONTRACT]
  );
  const stakingOldContract = useAppSelector(
    (state) =>
      state.accounts.accountList[contractAddresses.STAKING_OLD_CONTRACT]
  );
  const stakingMiddleContract = useAppSelector(
    (state) =>
      state.accounts.accountList[contractAddresses.STAKING_MIDDLE_CONTRACT]
  );
  const url = metaData
    ? `https://hopegalaxy.mypinata.cloud/ipfs/QmP7jDG2k92Y7cmpa7iz2vhFG1xp7DNss7vuwUpNaDd7xf/${metaData}.png`
    : `/others/mint_pass${id.includes("Hope") ? "" : "1"}.png`;
  const price = item?.list_price || {};
  const hasPrice = !!price.amount && !!price.denom;

  const downloadImage = () => {
    const fileName = url.split("/").pop() || "";
    saveAs(url, fileName);
  };

  const nftStatus = useMemo(
    () =>
      item?.status === "Staked"
        ? NFTItemStatus.STAKED
        : item?.status === "Unstaking"
        ? NFTItemStatus.UNSTAKED
        : hasPrice
        ? NFTItemStatus.ONSALE
        : NFTItemStatus.AVAILABLE,
    [item, hasPrice]
  );

  const transferDisabled = useMemo(
    () => sendingTx || nftStatus !== NFTItemStatus.AVAILABLE,
    [sendingTx, nftStatus]
  );
  const sellWithdrawDisabled = useMemo(
    () =>
      sendingTx ||
      nftStatus === NFTItemStatus.STAKED ||
      nftStatus === NFTItemStatus.UNSTAKED,
    [sendingTx, nftStatus]
  );

  const unStakeTime = useMemo(
    () => (item?.unstake_time ? item.unstake_time * 1000 : currentTime),
    [currentTime, item]
  );

  const passedPeriod = useMemo(
    () => currentTime - unStakeTime,
    [currentTime, unStakeTime]
  );
  const remainTime = useMemo(
    () => unStakeTime + (unStakingPeriod || 0) * 1000 - currentTime,
    [currentTime, unStakeTime, unStakingPeriod]
  );

  // console.log("item", item?.token_id, remainTime);
  const { duration } = formatDurationTime(remainTime);

  const isPassedPeriod =
    !!unStakingPeriod && passedPeriod / 1000 > unStakingPeriod;
  const stakeUnstakeDisabled = useMemo(
    () =>
      sendingTx ||
      nftStatus === NFTItemStatus.ONSALE ||
      (nftStatus === NFTItemStatus.UNSTAKED && !isPassedPeriod),
    [isPassedPeriod, nftStatus, sendingTx]
  );

  if (!metaData) {
    return <NFTItemImage alt="" src={url} />;
  }

  const handleClickSellWithdrawButton = () => {
    window.open(`https://hopers.io/detail?token_id=${item.token_id}`);
  };

  const handleClickStakeUnstakeButton = async () => {
    if (stakeUnstakeDisabled) return;
    if (nftStatus === NFTItemStatus.AVAILABLE) {
      try {
        setSendingTx(true);
        await runExecute(revealNftContract.address, {
          send_nft: {
            contract: stakingMiddleContract.address,
            token_id: item.token_id,
            msg: btoa("staking"),
          },
        });
        if (fetchNFT) await fetchNFT();
        toast.success("Success");
        // fetchNFT();
      } catch (err) {
        console.log("err: ", err);
        toast.error("Fail!");
      } finally {
        setSendingTx(false);
      }
    } else if (nftStatus === NFTItemStatus.STAKED) {
      try {
        setSendingTx(true);
        await runExecute(
          (item.fromOld ? stakingOldContract : stakingMiddleContract).address,
          {
            unstake_nft: {
              token_id: item.token_id,
            },
          }
        );
        if (fetchNFT) await fetchNFT();
        toast.success("Success");
        // fetchNFT();
      } catch (err) {
        console.log("err: ", err);
        toast.error("Fail!");
      } finally {
        setSendingTx(false);
      }
    } else if (nftStatus === NFTItemStatus.UNSTAKED && isPassedPeriod) {
      try {
        setSendingTx(true);
        await runExecute(stakingMiddleContract.address, {
          withdraw_nft: {
            token_id: item.token_id,
          },
        });
        if (fetchNFT) await fetchNFT();
        toast.success("Success");
        // fetchNFT();
      } catch (err) {
        console.log("err: ", err);
        toast.error("Fail!");
      } finally {
        setSendingTx(false);
      }
    }
  };

  const handleTransferNFT = async () => {
    if (transferDisabled || !transferTarget) return;
    try {
      setSendingTx(true);
      await runExecute(revealNftContract.address, {
        transfer_nft: {
          recipient: transferTarget,
          token_id: item.token_id,
        },
      });
      if (fetchNFT) await fetchNFT();
      toast.success("Success");
      // fetchNFT();
    } catch (err) {
      console.log("err: ", err);
      toast.error("Fail!");
    } finally {
      setSendingTx(false);
    }
  };

  const handleChangeTransferAddress = (e: any) => {
    const {
      target: { value: transferAddress },
    } = e;
    setTransferTarget(transferAddress);
  };

  return (
    <NFTItemWrapper nftItemStatus={nftStatus}>
      <NFTItemBadge nftItemStatus={nftStatus}>{nftStatus}</NFTItemBadge>
      {rarityRank && (
        <RarityRankContainer>
          <RarityRankContent bold>Rank</RarityRankContent>
          <RarityRankContent>{`#${rarityRank.rank}`}</RarityRankContent>
        </RarityRankContainer>
      )}
      <NFTItemImageDownloadIcon
        onClick={downloadImage}
        width="39"
        height="39"
        viewBox="0 0 39 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.4912 0.00016266C30.0708 -0.0433684 38.8683 8.65621 38.9988 19.1178C39.1341 29.9892 30.5221 38.7986 19.8753 38.9964C9.0119 39.1989 0.205019 30.5343 0.00352952 19.8806C-0.201744 8.96944 8.57297 -0.00456897 19.4912 0.00016266ZM19.4827 3.82805C10.8196 3.82805 3.83372 10.7996 3.82899 19.451C3.82331 28.1061 10.7695 35.0975 19.2926 35.1893C27.9812 35.283 35.1667 28.212 35.161 19.6175C35.1544 10.8025 28.2376 3.82805 19.4827 3.82805Z"
          fill="#39C639"
        />
        <path
          d="M19.1876 28.9908C17.1557 28.9908 15.1228 28.9804 13.0909 28.9994C12.6482 29.0031 12.4571 28.8801 12.4845 28.4155C12.5148 27.913 12.5129 27.4058 12.4845 26.9032C12.459 26.4528 12.6245 26.2919 13.0814 26.2967C14.7983 26.3156 16.5153 26.3042 18.2331 26.3033C18.375 26.3033 18.5169 26.308 18.6578 26.2985C18.7619 26.2919 18.901 26.3279 18.9464 26.1982C18.9908 26.0724 18.8603 26.009 18.7912 25.9304C18.708 25.8358 18.6143 25.7506 18.5254 25.6617C16.3866 23.522 14.2478 21.3824 12.1109 19.2408C12.0257 19.1547 11.8659 19.079 11.9046 18.9484C11.9557 18.7762 12.143 18.8349 12.2745 18.8339C12.9679 18.8273 13.6613 18.8122 14.3537 18.8358C14.786 18.85 14.9185 18.6891 14.9156 18.2586C14.8996 15.5322 14.9071 12.8058 14.9081 10.0795C14.9081 9.44447 14.9109 9.44069 15.5239 9.44069C17.9815 9.4388 20.4391 9.4388 22.8967 9.44069C23.5106 9.44069 23.5125 9.44542 23.5135 10.0785C23.5144 12.7888 23.5248 15.5 23.504 18.2103C23.5002 18.6816 23.6336 18.8604 24.1141 18.8377C24.7905 18.8065 25.4688 18.8273 26.1461 18.8339C26.2775 18.8349 26.4648 18.7762 26.5169 18.9475C26.5566 19.0781 26.3939 19.1519 26.3107 19.2408C26.1375 19.4244 25.9559 19.5986 25.7771 19.7774C23.8162 21.7391 21.8542 23.698 19.898 25.6645C19.7381 25.8254 19.4061 25.9834 19.495 26.1878C19.5981 26.4263 19.9472 26.2976 20.1865 26.2985C21.8722 26.308 23.5579 26.3023 25.2436 26.3042C25.9181 26.3052 25.9266 26.3165 25.9294 26.996C25.9313 27.4843 25.9105 27.9745 25.9342 28.4618C25.955 28.8811 25.7828 29.0013 25.3779 28.9984C23.3148 28.9823 21.2517 28.9908 19.1876 28.9908Z"
          fill="#39C639"
        />
      </NFTItemImageDownloadIcon>
      <NFTItemImage alt="" src={url} />
      <NFTItemInfoContainer>
        <div>
          <NFTItemInfo>Hope Galaxy 1 </NFTItemInfo>
          <NFTItemInfo>{item.token_id}</NFTItemInfo>
        </div>
        <NFTItemInfo>
          {hasPrice && +price.amount > 0
            ? `${price.amount / 1e6} ${
                price.denom === NFTPriceType.HOPE ? "HOPE" : "JUNO"
              }`
            : ""}
        </NFTItemInfo>
      </NFTItemInfoContainer>
      <NFTItemOperationContainer disabled={transferDisabled}>
        <NFTItemOperationButton
          onClick={handleTransferNFT}
          buttonType={OperationButtonType.TRANSFER}
        >
          {OperationButtonType.TRANSFER}
          <svg
            width="22"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 9L7 0.339746V17.6603L22 9ZM0 10.5H8.5V7.5H0V10.5Z"
              fill="white"
            />
          </svg>
        </NFTItemOperationButton>
        <NFTItemTransferAddress
          onChange={handleChangeTransferAddress}
          value={transferTarget}
          disabled={transferDisabled}
        />
        <JunoWalletIndicator>Juno Wallet</JunoWalletIndicator>
      </NFTItemOperationContainer>
      <NFTItemOperationContainer>
        <NFTItemOperationButton
          buttonType={
            nftStatus === NFTItemStatus.ONSALE
              ? OperationButtonType.WITHDRAW
              : OperationButtonType.SELL
          }
          disabled={sellWithdrawDisabled}
          onClick={handleClickSellWithdrawButton}
        >
          {nftStatus === NFTItemStatus.ONSALE
            ? OperationButtonType.WITHDRAW
            : OperationButtonType.SELL}
        </NFTItemOperationButton>
        <NFTItemOperationButton
          buttonType={
            nftStatus === NFTItemStatus.ONSALE ||
            nftStatus === NFTItemStatus.AVAILABLE
              ? OperationButtonType.STAKE
              : OperationButtonType.UNSTAKE
          }
          disabled={stakeUnstakeDisabled}
          onClick={handleClickStakeUnstakeButton}
        >
          {nftStatus === NFTItemStatus.ONSALE ||
          nftStatus === NFTItemStatus.AVAILABLE
            ? OperationButtonType.STAKE
            : isPassedPeriod
            ? OperationButtonType.WITHDRAW
            : OperationButtonType.UNSTAKE}
        </NFTItemOperationButton>
        <NFTItemOperationCell>
          {nftStatus === NFTItemStatus.UNSTAKED &&
            (duration?.days
              ? `${duration.days} Days remaining`
              : duration?.hrs
              ? `${duration.hrs} Hours remaining`
              : duration?.mins
              ? `${duration.mins} Minutes remaining`
              : duration?.secs
              ? `${duration.secs} Seconds remaining`
              : "Ready to Withdraw")}
        </NFTItemOperationCell>
      </NFTItemOperationContainer>
    </NFTItemWrapper>
  );
}
