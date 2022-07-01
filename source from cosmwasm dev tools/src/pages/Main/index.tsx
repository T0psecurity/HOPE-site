import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useWindowSize from "../../hook/useWindowSize";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useContract, { contractAddresses } from "../../hook/useContract";
import { execute, prettifyInput } from "../../features/console/consoleSlice";

import NFTItem from "../../components/NFTItem";
import {
  Wrapper,
  StyledButton,
  VideoWrapper,
  ControlWrapper,
  StyledSpan,
  TotalMintedCount,
  Flex,
  Divider,
  SubArea,
  SubAreaTitle,
  Container,
  ComingSoonArea,
  StyledInput,
} from "./styled";
import { selectContract } from "../../features/accounts/accountsSlice";
// import { useKeplr } from "../../features/accounts/useKeplr";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const { runQuery, runExecute } = useContract();
  const [loading, setLoading] = useState(false);
  const [videoType, setVideoType] = useState(1); // 1 - reveal, 2 - mint pass-2
  const [value, setValue] = useState("");
  const [nfts, setNfts] = useState([]);
  const [nfts2, setNfts2] = useState([]);
  const [revealNftsList, setRevealNftsList] = useState([]);
  const [maxNfts, setMaxNfts] = useState(0);
  const [maxNfts2, setMaxNfts2] = useState(0);
  const [revealNfts, setRevealNfts] = useState(0);
  const [stakedNfts, setStakedNfts] = useState(0);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);
  const [unStakingPeriod, setUnstakingPeriod] = useState(0);
  const [rewardAddress, setRewardAddress] = useState("");
  const [currentTime, setCurrentTime] = useState(Number(new Date()));
  const { isMobile } = useWindowSize(1000);
  const [owner, setOwner] = useState("");
  const [balance, setBalance] = useState(0);
  const output = useAppSelector((state) => state.console.output);
  const account = useAppSelector((state) => state.accounts.keplrAccount);

  const mintContract = useAppSelector(
    (state) => state.accounts.accountList[contractAddresses.MINT_CONTRACT]
  );
  const revealContract = useAppSelector(
    (state) => state.accounts.accountList[contractAddresses.REVEAL_CONTRACT]
  );
  const nftContract = useAppSelector(
    (state) => state.accounts.accountList[contractAddresses.NFT_CONTRACT]
  );
  const revealNftContract = useAppSelector(
    (state) => state.accounts.accountList[contractAddresses.REVEAL_NFT_CONTRACT]
  );
  const revealMarketContract = useAppSelector(
    (state) =>
      state.accounts.accountList[contractAddresses.REVEAL_MARKET_CONTRACT]
  );
  const stakingOldContract = useAppSelector(
    (state) =>
      state.accounts.accountList[contractAddresses.STAKING_OLD_CONTRACT]
  );
  const stakingContract = useAppSelector(
    (state) => state.accounts.accountList[contractAddresses.STAKING_CONTRACT]
  );
  const tokenContract = useAppSelector(
    (state) => state.accounts.accountList[contractAddresses.TOKEN_CONTRACT]
  );

  const mintContract2 = useAppSelector(
    (state) => state.accounts.accountList[contractAddresses.MINT_CONTRACT_2]
  );
  const nftContract2 = useAppSelector(
    (state) => state.accounts.accountList[contractAddresses.NFT_CONTRACT_2]
  );

  // const { connect } = useKeplr();
  const fetchState = async () => {
    if (!account || !revealContract) return;
    const mintResult = await runQuery(mintContract, {
      get_token_count: {
        address: account.address,
      },
    });
    setMaxNfts(mintResult.total_nft);
    const revealResult = await runQuery(revealContract, {
      get_state_info: {},
    });
    setRevealNfts(revealResult.total_nft);
    const currentTime = await runQuery(stakingContract, {
      get_current_time: {},
    });
    setCurrentTime(currentTime ? currentTime * 1000 : Number(new Date()));

    const mintResult2 = await runQuery(mintContract2, {
      get_state_info: {},
    });
    setMaxNfts2(mintResult2.count);

    const tokens2 = await runQuery(nftContract2, {
      tokens: {
        owner: account.address,
        start_after: undefined,
        limit: 20,
      },
    });
    setNfts2(tokens2.tokens);
  };

  const fetchNFT = async () => {
    if (!account || !nftContract) return;
    const tokens = await runQuery(nftContract, {
      tokens: {
        owner: account.address,
        start_after: undefined,
        limit: 20,
      },
    });
    setNfts(tokens.tokens);
    const revealNfts: any = [];
    const revealTokens = await runQuery(revealNftContract, {
      tokens: {
        owner: account.address,
        start_after: undefined,
        limit: 20,
      },
    });
    revealTokens?.tokens?.map((item: string) =>
      revealNfts.push({
        token_id: item,
      })
    );
    const revealMarketplaceTokens = await runQuery(revealMarketContract, {
      get_offerings: {},
    });
    revealMarketplaceTokens?.offerings?.map((item: any) => {
      if (item.seller === account.address) revealNfts.push(item);
      return null;
    });
    // const stakedTokens: any = [];
    const stakedTokensFromOldContract = await runQuery(stakingOldContract, {
      get_token_info: {},
    });
    let totalStakedNfts = 0;
    stakedTokensFromOldContract?.map((item: any) => {
      if (item.owner === account.address)
        revealNfts.push({ ...item, fromOld: true });
      if (item.status === "Staked") totalStakedNfts++;
      return null;
    });
    const stakedTokensFromNewContract = await runQuery(stakingContract, {
      get_my_info: {
        address: account.address,
      },
    });
    stakedTokensFromNewContract?.map((item: any) => {
      revealNfts.push({ ...item });
      return null;
    });
    setRevealNftsList(revealNfts);
    const stakingStateInfo = await runQuery(stakingContract, {
      get_state_info: {},
    });
    setRewardAddress(stakingStateInfo?.reward_wallet || "");
    setUnstakingPeriod(stakingStateInfo?.staking_period || 0);
    const totalStakedInNewContract = +(stakingStateInfo?.total_staked || "0");
    setStakedNfts(totalStakedNfts + totalStakedInNewContract);

    const tokens2 = await runQuery(nftContract2, {
      tokens: {
        owner: account.address,
        start_after: undefined,
        limit: 20,
      },
    });
    setNfts2(tokens2.tokens);
  };

  useEffect(() => {
    setInterval(() => {
      if (account?.address !== owner) fetchState();
      // connect();
    }, 3000);
    return clearInterval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchState();
    fetchNFT();
    if (account) {
    } else {
      setNfts([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    if (!account) return;
    try {
      const outputObject = JSON.parse(output);
      if (outputObject.owner) {
        setOwner(outputObject.owner);
        if (outputObject.total_nft && !isNaN(Number(outputObject.total_nft))) {
          setMaxNfts(Number(outputObject.total_nft));
        }
      } else if (outputObject.tokens) {
        setNfts(outputObject.tokens);
      } else if (
        typeof outputObject === "string" &&
        !isNaN(Number(outputObject))
      ) {
        setValue(outputObject);
      } else if (outputObject.transactionHash) {
        fetchState();
        if (shouldRenderVideo) {
          setLoading(true);
          setShouldRenderVideo(false);
        }
      } else if (outputObject.balance && !isNaN(Number(outputObject.balance))) {
        setBalance(Number(outputObject.balance));
      } else {
        console.log("output", output);
        console.log("outputObject", typeof outputObject, outputObject);
      }
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [output, account]);

  const mint = () => {
    if (nfts.length === Number(value) || maxNfts >= 2000) {
      toast.error("Can not mint!");
      return;
    }
    if (balance < 1000000) {
      toast.error("Not enough balance!");
    }
    setShouldRenderVideo(true);
    dispatch(
      selectContract(
        "juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z"
      )
    );
    const message = {
      send: {
        contract:
          "juno17kr4uahqlz8hl8nucx82q4vmlj7lrzzlz0yr0ax9hejaevw6ewqsf8p5ux",
        amount: "1000000",
        msg: btoa(
          JSON.stringify({
            nft_addr:
              "juno159pakpvknk36r2pyhhl0utd2vr27rg66u58exguvc3d4yw08wd5s0wqjsy",
            name: "mynft1",
            description: "glassflow nfts",
            external_link: "https://external",
            image_uri: "https://image/image.png",
            init_price: "10000",
            royalties: [
              {
                address: account?.address,
                royalty_rate: "0.1",
              },
            ],
          })
        ),
      },
    };
    dispatch(prettifyInput(JSON.stringify(message)));
    dispatch(execute());
  };

  const mint2 = async () => {
    if (!account) {
      toast.error("Connect the wallet");
      return;
    }
    if (nfts2.length === 10 || maxNfts2 >= 2000) {
      toast.error("Can not mint!");
      return;
    }
    const balanceQueryResult = await runQuery(tokenContract, {
      balance: {
        address: account.address,
      },
    });
    if (+balanceQueryResult.balance < 1000000) {
      toast.error("Not enough balance!");
      return;
    }
    const queryResult = await runQuery(revealNftContract, {
      tokens: {
        owner: account.address,
      },
    });
    const mintStateInfo = await runQuery(mintContract2, {
      get_state_info: {},
    });
    if (mintStateInfo.private_mint && !queryResult.tokens.length) {
      toast.error("Can not mint!");
      return;
    }

    const message = {
      send: {
        contract: mintContract2.address,
        amount: "1000000",
        msg: btoa(
          JSON.stringify({
            mint_pass: "mintpass",
          })
        ),
      },
    };
    await runExecute(tokenContract.address, message);
    toast.success("Successfully minted!");
    setLoading(true);
    setVideoType(2);
  };

  const reveal = async () => {
    if (!account) {
      toast.error("Connect your wallet!");
      return;
    }
    if (nfts.length === 0) {
      toast.error("You don't have any mintpass");
      return;
    }
    const isMint = await runQuery(revealContract, {
      get_state_info: {},
    });
    if (isMint.can_mint === false) {
      toast.error("Mint is stopeed for sometime");
      return;
    }

    // console.log("token_id", nfts[0]);

    const revealResult = await runQuery(nftContract, {
      approvals: {
        token_id: nfts[0],
        include_expired: undefined,
      },
    });

    // console.log("resultApprovals: ", revealResult.approvals);
    let flag: boolean = false;
    if (revealResult.approvals.length > 0) {
      revealResult.approvals.forEach((data: any) => {
        if (data.spender === revealContract.address) flag = true;
      });
    }
    if (revealResult.approvals.length === 0 || flag === false) {
      try {
        await runExecute(nftContract.address, {
          approve: {
            spender: revealContract.address,
            token_id: nfts[0],
            expires: undefined,
          },
        });
        toast.success("Approved");
      } catch (err) {
        console.log("err: ", err);
        toast.error("Fail!");
      }
    }
    let metadata: any;
    let check_mint = isMint.check_mint;
    let num = Math.floor(Math.random() * 2000);
    while (true) {
      if (num % 2000 < 16) {
        num++;
        continue;
      }
      if (check_mint[num % 2000] === false) {
        num++;
        continue;
      }
      check_mint[num % 2000] = false;
      break;
    }

    await axios
      .get(
        `https://hopegalaxy.mypinata.cloud/ipfs/QmRnRFS19fbs8Bo9VxSKxR3DAJfBqmYNiXPapQKhDTDku6/${
          (num % 2000) + 1
        }.json`
      )
      .then((res) => {
        metadata = res.data;
      });
    if (metadata)
      try {
        await runExecute(
          revealContract.address,
          {
            reveal_nft: {
              token_id: nfts[0],
              reveal_id: (num % 2000) + 1,
              mint_msg: {
                image: metadata.image,
                attributes: metadata.attributes,
              },
            },
          },
          { funds: "2" }
        );
        setLoading(true);
        setVideoType(1);
        toast.success("Success");
        fetchNFT();
      } catch (err) {
        console.log("err: ", err);
        toast.error("Fail!");
      }
  };

  const handleChangeRewardAmount = (e: any) => {
    const {
      target: { value },
    } = e;
    setRewardAmount(value);
  };

  const handleClaimRewards = async () => {
    const stakedNFTIdsFromNew: any = [],
      stakedNFTIdsFromOld: any = [];
    revealNftsList.map((item: any) => {
      console.log(item);
      if (item?.status === "Staked" || item?.status === "Unstaking") {
        if (item.fromOld) {
          stakedNFTIdsFromOld.push(item.token_id);
        } else {
          stakedNFTIdsFromNew.push(item.token_id);
        }
      }
      return null;
    });
    try {
      if (stakedNFTIdsFromNew.length)
        await runExecute(stakingContract.address, {
          get_reward: {
            token_ids: stakedNFTIdsFromNew,
          },
        });
      if (stakedNFTIdsFromOld.length)
        await runExecute(stakingOldContract.address, {
          get_reward: {
            token_ids: stakedNFTIdsFromOld,
          },
        });
      if (fetchNFT) await fetchNFT();
      toast.success("Success");
      // fetchNFT();
    } catch (err) {
      console.error("err: ", err);
      toast.error("Fail!");
    }
  };

  const handleDistributeRewards = async () => {
    if (!account || rewardAmount <= 0) return;

    // fetch hope balance
    const hopeBalance = await runQuery(tokenContract, {
      balance: { address: account.address },
    });

    // approve token contract
    try {
      await runExecute(tokenContract.address, {
        increase_allowance: {
          spender: stakingContract.address,
          amount: hopeBalance.balance,
          expires: undefined,
        },
      });
      toast.success("Approved");
    } catch (err) {
      console.log("err: ", err);
      toast.error("Fail!");
      return;
    }

    // distribute
    try {
      await runExecute(
        stakingContract.address,
        {
          distribute_reward: {
            token_balance: hopeBalance.balance,
          },
        },
        { funds: "" + rewardAmount }
      );
      toast.success("Distributed");
    } catch (err) {
      console.log("err: ", err);
      toast.error("Fail!");
      return;
    }
  };

  return (
    <Container>
      {loading && (
        <VideoWrapper>
          <video
            autoPlay
            style={{ height: "100%" }}
            id="video"
            onEndedCapture={() => setLoading(false)}
          >
            <source src={`videos/video${videoType}.mp4`}></source>
          </video>
        </VideoWrapper>
      )}
      <SubArea>
        <SubAreaTitle>My Hope Galaxy NFT</SubAreaTitle>
        <Wrapper>
          {revealNftsList.map((nftItem: any, nftIndex) => (
            <NFTItem
              key={nftIndex}
              id={nftItem.token_id}
              metaData={nftItem.token_id.replace("Reveal.", "")}
              item={nftItem}
              unStakingPeriod={unStakingPeriod}
              fetchNFT={fetchNFT}
              currentTime={currentTime}
            />
          ))}
        </Wrapper>
      </SubArea>
      <ControlWrapper>
        <div />
        <Flex>
          {account?.address === rewardAddress && (
            <>
              <StyledButton
                onClick={handleDistributeRewards}
                color="#39C639"
                width="271px"
              >
                Distribute Rewards
              </StyledButton>
              <StyledInput
                type="number"
                value={rewardAmount}
                onChange={handleChangeRewardAmount}
              />
            </>
          )}
          <StyledButton
            onClick={handleClaimRewards}
            color="#E9867B"
            width="271px"
          >
            Claim Rewards
          </StyledButton>
          <TotalMintedCount>
            <StyledSpan>STAKED</StyledSpan>
            <StyledSpan>{`${stakedNfts} / ${revealNfts}`}</StyledSpan>
          </TotalMintedCount>
        </Flex>
      </ControlWrapper>
      <Divider />
      <SubArea>
        <SubAreaTitle>My Mint Pass</SubAreaTitle>
        <Wrapper>
          {nfts.map((nftItem, nftIndex) => (
            <NFTItem key={nftIndex} id={nftItem} currentTime={currentTime} />
          ))}
        </Wrapper>
      </SubArea>
      <ControlWrapper>
        <div>
          <Flex>
            <TotalMintedCount>
              <StyledSpan>MINTED</StyledSpan>
              <StyledSpan>{`${maxNfts} / 2000`}</StyledSpan>
            </TotalMintedCount>
            <StyledButton onClick={mint} color="#5B5B5B" width="271px">
              Mint Galaxy 1
            </StyledButton>
          </Flex>
          <div style={{ color: "none" }}>&nbsp;</div>
        </div>
        <div>
          {isMobile ? (
            <Flex>
              <TotalMintedCount>
                <StyledSpan>REVEALED</StyledSpan>
                <StyledSpan>{`${revealNfts} / 2000`}</StyledSpan>
              </TotalMintedCount>
              <StyledButton onClick={reveal} color="#E9867B" width="271px">
                Reveal Galaxy 1
              </StyledButton>
            </Flex>
          ) : (
            <Flex>
              <StyledButton onClick={reveal} color="#E9867B" width="271px">
                Reveal Galaxy 1
              </StyledButton>
              <TotalMintedCount>
                <StyledSpan>REVEALED</StyledSpan>
                <StyledSpan>{`${revealNfts} / 2000`}</StyledSpan>
              </TotalMintedCount>
            </Flex>
          )}
          <div style={{ color: "white" }}>1 Mint Pass + 2 Juno Creator Fee</div>
        </div>
      </ControlWrapper>
      <Divider />
      <SubArea>
        <SubAreaTitle>My Mint Pass - 2</SubAreaTitle>
        <Wrapper>
          {nfts2.map((nftItem, nftIndex) => (
            <NFTItem key={nftIndex} id={nftItem} currentTime={currentTime} />
          ))}
        </Wrapper>
      </SubArea>
      <ControlWrapper>
        <div>
          <Flex>
            <TotalMintedCount>
              <StyledSpan>MINTED</StyledSpan>
              <StyledSpan>{`${maxNfts2} / 2000`}</StyledSpan>
            </TotalMintedCount>
            <StyledButton onClick={mint2} color="#E9867B" width="271px">
              Mint Galaxy 2
            </StyledButton>
          </Flex>
          <div style={{ color: "none" }}>&nbsp;</div>
        </div>
        <div>
          {isMobile ? (
            <Flex>
              <TotalMintedCount>
                <StyledSpan>REVEALED</StyledSpan>
                <StyledSpan>{`0 / 2000`}</StyledSpan>
              </TotalMintedCount>
              <StyledButton color="#5B5B5B" width="271px">
                Reveal Galaxy 2
              </StyledButton>
            </Flex>
          ) : (
            <Flex>
              <StyledButton color="#5B5B5B" width="271px">
                Reveal Galaxy 2
              </StyledButton>
              <TotalMintedCount>
                <StyledSpan>REVEALED</StyledSpan>
                <StyledSpan>{`0 / 2000`}</StyledSpan>
              </TotalMintedCount>
            </Flex>
          )}
          <div style={{ color: "white" }}></div>
        </div>
      </ControlWrapper>
      <Divider />
      <ComingSoonArea>
        <div
          style={{ textAlign: "center", fontWeight: "bold", margin: "20px" }}
        >
          coming soon
        </div>
        <Flex style={{ justifyContent: "space-between" }}>
          <StyledButton color="#5B5B5B" width="271px">
            Mint Galaxy 3
          </StyledButton>
          <StyledButton color="#5B5B5B" width="271px">
            Mint Galaxy 4
          </StyledButton>
          <StyledButton color="#5B5B5B" width="271px">
            Mint Galaxy 5
          </StyledButton>
        </Flex>
      </ComingSoonArea>
    </Container>
  );
};

export default Main;
