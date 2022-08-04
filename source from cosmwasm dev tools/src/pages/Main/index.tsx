import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import useWindowSize from "../../hook/useWindowSize";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useContract, { contractAddresses } from "../../hook/useContract";

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
  MintPassItem,
  MintPassPanel,
  MintPassImage,
  MintPassDescription,
  MintPassStats,
  CollectionStats,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "./styled";
import { fetchTokenPrices } from "../../features/tokenPrices/tokenPricesSlice";
// import { useKeplr } from "../../features/accounts/useKeplr";
import { MintPassStatsItem } from "./styled";
import { setStakedNfts } from "../../features/stakedNftsSlice.ts/stakedNftsSlice";

const MAX_ITEMS = 50;

const getTokenIdNumber = (id: string): string => {
  if (!id) return "";
  return id.split(".").pop() || "";
};

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const { runQuery, runExecute } = useContract();
  const [loading, setLoading] = useState(false);
  const [videoType, setVideoType] = useState(1); // 1 - reveal, 2 - mint pass-2
  // const [value, setValue] = useState("");
  const [nfts, setNfts] = useState([]);
  const [nfts2, setNfts2] = useState([]);
  const [revealNftsList, setRevealNftsList] = useState([]);
  const [revealMarketplaceNfts, setRevealMarketplaceNfts] = useState([]);
  const [revealStakedNfts, setRevealStakedNfts] = useState([]);
  const [revealUnstakingNfts, setRevealUnstakingNfts] = useState([]);
  const [revealStakingReward, setRevealStakingReward] = useState(0);

  const [maxNfts, setMaxNfts] = useState(0);
  const [maxNfts2, setMaxNfts2] = useState(0);
  const [revealNfts, setRevealNfts] = useState(0);
  // const [stakedNfts, setStakedNfts] = useState(0);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [marketplaceNfts1, setMarketplaceNfts1] = useState([]);
  const [marketplaceNfts2, setMarketplaceNfts2] = useState([]);

  // const [shouldRenderVideo, setShouldRenderVideo] = useState(false);
  const [unStakingPeriod, setUnstakingPeriod] = useState(0);
  const [rewardAddress, setRewardAddress] = useState("");
  const [currentTime, setCurrentTime] = useState(Number(new Date()));
  const [rarityRanks, setRarityRanks] = useState<any>({});
  // const { isMobile } = useWindowSize(1000);
  // const [owner, setOwner] = useState("");
  // const [balance, setBalance] = useState(0);
  const account = useAppSelector((state) => state.accounts.keplrAccount);

  const mintContract = useAppSelector(
    (state) => state.accounts.accountList?.[contractAddresses.MINT_CONTRACT]
  );
  const revealContract = useAppSelector(
    (state) => state.accounts.accountList?.[contractAddresses.REVEAL_CONTRACT]
  );
  const nftContract = useAppSelector(
    (state) => state.accounts.accountList?.[contractAddresses.NFT_CONTRACT]
  );
  const revealNftContract = useAppSelector(
    (state) =>
      state.accounts.accountList?.[contractAddresses.REVEAL_NFT_CONTRACT]
  );
  const revealMarketContract = useAppSelector(
    (state) =>
      state.accounts.accountList?.[contractAddresses.REVEAL_MARKET_CONTRACT]
  );
  const stakingOldContract = useAppSelector(
    (state) =>
      state.accounts.accountList?.[contractAddresses.STAKING_OLD_CONTRACT]
  );
  const stakingMiddleContract = useAppSelector(
    (state) =>
      state.accounts.accountList?.[contractAddresses.STAKING_MIDDLE_CONTRACT]
  );
  const stakingContract = useAppSelector(
    (state) => state.accounts.accountList?.[contractAddresses.STAKING_CONTRACT]
  );
  const tokenContract = useAppSelector(
    (state) => state.accounts.accountList?.[contractAddresses.TOKEN_CONTRACT]
  );

  const mintContract2 = useAppSelector(
    (state) => state.accounts.accountList?.[contractAddresses.MINT_CONTRACT_2]
  );
  const nftContract2 = useAppSelector(
    (state) => state.accounts.accountList?.[contractAddresses.NFT_CONTRACT_2]
  );

  const marketplaceContract = useAppSelector(
    (state) =>
      state.accounts.accountList?.[contractAddresses.MARKETPLACE_CONTRACT]
  );
  const marketplace1Contract = useAppSelector(
    (state) =>
      state.accounts.accountList?.[contractAddresses.MARKETPLACE1_CONTRACT]
  );
  const marketplace2Contract = useAppSelector(
    (state) =>
      state.accounts.accountList?.[contractAddresses.MARKETPLACE2_CONTRACT]
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
    const currentTime = await runQuery(stakingMiddleContract, {
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
    // const marketplaceTokens = await runQuery()
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
    setRevealNftsList(revealNfts);

    let queries0 = [
      runQuery(revealMarketContract, {
        get_offerings: {},
      }),
    ];
    const revealMarketplaceInfo = await runQuery(marketplaceContract, {
      get_collection_info: {
        address: contractAddresses.REVEAL_NFT_CONTRACT,
      },
    });
    for (
      let i = 0;
      i < Math.ceil((revealMarketplaceInfo?.offering_id || 0) / MAX_ITEMS);
      i++
    ) {
      let tokenIds = [];
      for (
        let j = 0;
        j < Math.min(revealMarketplaceInfo?.offering_id || 0, MAX_ITEMS);
        j++
      ) {
        tokenIds.push("" + (MAX_ITEMS * i + j + 1));
      }
      queries0.push(
        runQuery(marketplaceContract, {
          get_offering_page: {
            id: tokenIds,
            address: contractAddresses.REVEAL_NFT_CONTRACT,
          },
        })
      );
    }
    await Promise.all(queries0).then((queryResults: any) => {
      let listedNFTs: any = [];
      queryResults.forEach(async (queryResult: any, index: number) => {
        const fetchedResult =
          queryResult?.offerings ||
          (!!queryResult?.length && queryResult) ||
          [];
        fetchedResult?.forEach((item: any, itemIndex: number) => {
          if (item.seller === account?.address) {
            listedNFTs = [...listedNFTs, item];
          }
        });
      });
      setRevealMarketplaceNfts(listedNFTs);
    });

    let stakedTokens: any = [],
      unstakingTokens: any = [],
      stakingRewards: number = 0;
    const stakedTokensFromOldContract = await runQuery(stakingOldContract, {
      get_token_info: {},
    });
    // let totalStakedNfts = 0;
    stakedTokensFromOldContract?.map((item: any) => {
      if (item.owner === account.address) {
        stakingRewards += Number(item.reward_hope);
        const newItem = {
          ...item,
          fromOld: true,
          contractAddress: stakingOldContract.address,
        };
        if (item.status === "Unstaking") {
          unstakingTokens.push(newItem);
        } else {
          stakedTokens.push(newItem);
        }
      }
      // if (item.status === "Staked") totalStakedNfts++;
      return null;
    });

    const stakedTokensFromMiddleContract = await runQuery(
      stakingMiddleContract,
      {
        get_my_info: {
          address: account.address,
        },
      }
    );
    stakedTokensFromMiddleContract?.map((item: any) => {
      const newItem = {
        ...item,
        contractAddress: stakingMiddleContract.address,
      };
      if (item.status === "Unstaking") {
        stakingRewards += Number(item.reward_hope);
        unstakingTokens.push(newItem);
      } else {
        stakedTokens.push(newItem);
      }
      return null;
    });

    const stakedTokensFromNewContract = await runQuery(stakingContract, {
      get_my_info: {
        address: account.address,
      },
    });
    stakedTokensFromNewContract?.map((item: any) => {
      const newItem = {
        ...item,
        migrated: true,
        contractAddress: stakingContract.address,
      };
      stakingRewards += Number(newItem.reward);
      if (item.status === "Unstaking") {
        unstakingTokens.push(newItem);
      } else {
        stakedTokens.push(newItem);
      }
      return null;
    });
    setRevealStakedNfts(stakedTokens);
    setRevealUnstakingNfts(unstakingTokens);
    setRevealStakingReward(stakingRewards / 1e6);
    dispatch(setStakedNfts([...stakedTokens, ...unstakingTokens]));

    const stakingStateInfo = await runQuery(stakingContract, {
      get_state_info: {},
    });
    setRewardAddress(stakingStateInfo?.reward_wallet || "");
    setUnstakingPeriod(stakingStateInfo?.staking_period || 0);
    // const totalStakedInNewContract = +(stakingStateInfo?.total_staked || "0");
    // setStakedNfts(totalStakedNfts + totalStakedInNewContract);

    const tokens2 = await runQuery(nftContract2, {
      tokens: {
        owner: account.address,
        start_after: undefined,
        limit: 20,
      },
    });
    setNfts2(tokens2.tokens);

    // fetch nfts listed on marketplace for mintpass1
    let queries1 = [
      runQuery(marketplace1Contract, {
        get_offerings: {},
      }),
    ];
    const marketplaceInfo1 = await runQuery(marketplaceContract, {
      get_collection_info: {
        address: contractAddresses.NFT_CONTRACT,
      },
    });
    for (
      let i = 0;
      i < Math.ceil((marketplaceInfo1?.offering_id || 0) / MAX_ITEMS);
      i++
    ) {
      let tokenIds = [];
      for (
        let j = 0;
        j < Math.min(marketplaceInfo1?.offering_id || 0, MAX_ITEMS);
        j++
      ) {
        tokenIds.push("" + (MAX_ITEMS * i + j + 1));
      }
      queries1.push(
        runQuery(marketplaceContract, {
          get_offering_page: {
            id: tokenIds,
            address: contractAddresses.NFT_CONTRACT,
          },
        })
      );
    }
    await Promise.all(queries1).then((queryResults: any) => {
      let listedNFTs: any = [];
      queryResults.forEach(async (queryResult: any, index: number) => {
        const fetchedResult =
          queryResult?.offerings ||
          (!!queryResult?.length && queryResult) ||
          [];
        fetchedResult?.forEach((item: any, itemIndex: number) => {
          if (item.seller === account?.address) {
            listedNFTs = [...listedNFTs, item];
          }
        });
      });
      setMarketplaceNfts1(listedNFTs);
    });

    // fetch nfts listed on marketplace for mintpass2
    let queries2 = [
      runQuery(marketplace2Contract, {
        get_offerings: {},
      }),
    ];
    const marketplaceInfo2 = await runQuery(marketplaceContract, {
      get_collection_info: {
        address: contractAddresses.NFT_CONTRACT_2,
      },
    });
    for (
      let i = 0;
      i < Math.ceil((marketplaceInfo2?.offering_id || 0) / MAX_ITEMS);
      i++
    ) {
      let tokenIds = [];
      for (
        let j = 0;
        j < Math.min(marketplaceInfo2?.offering_id || 0, MAX_ITEMS);
        j++
      ) {
        tokenIds.push("" + (MAX_ITEMS * i + j + 1));
      }
      queries2.push(
        runQuery(marketplaceContract, {
          get_offering_page: {
            id: tokenIds,
            address: contractAddresses.NFT_CONTRACT_2,
          },
        })
      );
    }
    await Promise.all(queries2).then((queryResults: any) => {
      let listedNFTs: any = [];
      queryResults.forEach(async (queryResult: any, index: number) => {
        const fetchedResult =
          queryResult?.offerings ||
          (!!queryResult?.length && queryResult) ||
          [];
        fetchedResult?.forEach((item: any, itemIndex: number) => {
          if (item.seller === account?.address) {
            listedNFTs = [...listedNFTs, item];
          }
        });
      });
      setMarketplaceNfts2(listedNFTs);
    });
  };

  useEffect(() => {
    const stateInterval = setInterval(() => {
      // if (account?.address !== owner)
      fetchState();
      // connect();
    }, 3000);
    dispatch(fetchTokenPrices());
    const priceInterval = setInterval(() => {
      dispatch(fetchTokenPrices());
    }, 60000);
    (async () => {
      const rarityData = await require("../../rank_produce/hopegalaxy1.json");
      const weights = rarityData.weights || [];
      let rarities: any = {};
      if (weights.length) {
        weights.forEach((item: any) => {
          rarities[item.token_id + 1] = {
            weight: item.weight,
            rank: item.rank,
          };
        });
      }
      setRarityRanks(rarities);
    })();
    return () => {
      clearInterval(stateInterval);
      clearInterval(priceInterval);
    };
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

  // useEffect(() => {
  //   if (!account) return;
  //   try {
  //     const outputObject = JSON.parse(output);
  //     if (outputObject.owner) {
  //       setOwner(outputObject.owner);
  //       if (outputObject.total_nft && !isNaN(Number(outputObject.total_nft))) {
  //         setMaxNfts(Number(outputObject.total_nft));
  //       }
  //     } else if (outputObject.tokens) {
  //       setNfts(outputObject.tokens);
  //     } else if (
  //       typeof outputObject === "string" &&
  //       !isNaN(Number(outputObject))
  //     ) {
  //       setValue(outputObject);
  //     } else if (outputObject.transactionHash) {
  //       fetchState();
  //       if (shouldRenderVideo) {
  //         setLoading(true);
  //         setShouldRenderVideo(false);
  //       }
  //     } else if (outputObject.balance && !isNaN(Number(outputObject.balance))) {
  //       setBalance(Number(outputObject.balance));
  //     } else {
  //       console.log("output", output);
  //       console.log("outputObject", typeof outputObject, outputObject);
  //     }
  //   } catch (error) {}
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [account]);

  // const mint = async () => {
  //   if (!account) {
  //     toast.error("Connect the wallet");
  //     return;
  //   }
  //   if (nfts.length === Number(value) || maxNfts >= 2000) {
  //     toast.error("Can not mint!");
  //     return;
  //   }
  //   const balanceQueryResult = await runQuery(tokenContract, {
  //     balance: {
  //       address: account.address,
  //     },
  //   });
  //   if (balanceQueryResult.balance < 1000000) {
  //     toast.error("Not enough balance!");
  //   }
  //   // setShouldRenderVideo(true);
  //   // dispatch(
  //   //   selectContract(
  //   //     "juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z"
  //   //   )
  //   // );
  //   const message = {
  //     send: {
  //       contract:
  //         "juno17kr4uahqlz8hl8nucx82q4vmlj7lrzzlz0yr0ax9hejaevw6ewqsf8p5ux",
  //       amount: "1000000",
  //       msg: btoa(
  //         JSON.stringify({
  //           nft_addr:
  //             "juno159pakpvknk36r2pyhhl0utd2vr27rg66u58exguvc3d4yw08wd5s0wqjsy",
  //           name: "mynft1",
  //           description: "glassflow nfts",
  //           external_link: "https://external",
  //           image_uri: "https://image/image.png",
  //           init_price: "10000",
  //           royalties: [
  //             {
  //               address: account?.address,
  //               royalty_rate: "0.1",
  //             },
  //           ],
  //         })
  //       ),
  //     },
  //   };
  //   // dispatch(prettifyInput(JSON.stringify(message)));
  //   // dispatch(execute());
  //   runExecute(contractAddresses.TOKEN_CONTRACT, message);
  // };

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
    // const stakedNFTIdsFromNew: any = [],
    //   stakedNFTIdsFromOld: any = [];
    const migratedNfts: any = [];
    revealNftsList
      .concat(revealStakedNfts, revealUnstakingNfts)
      .map((item: any) => {
        if (
          (item?.status === "Staked" || item?.status === "Unstaking") &&
          item.migrated
        ) {
          // if (item.fromOld) {
          //   stakedNFTIdsFromOld.push(item.token_id);
          // } else {
          //   stakedNFTIdsFromNew.push(item.token_id);
          // }
          migratedNfts.push(item.token_id);
        }
        return null;
      });
    try {
      // if (stakedNFTIdsFromNew.length)
      //   await runExecute(stakingMiddleContract.address, {
      //     get_reward: {
      //       token_ids: stakedNFTIdsFromNew,
      //     },
      //   });
      // if (stakedNFTIdsFromOld.length)
      //   await runExecute(stakingOldContract.address, {
      //     get_reward: {
      //       token_ids: stakedNFTIdsFromOld,
      //     },
      //   });
      if (migratedNfts.length) {
        await runExecute(stakingContract.address, {
          get_reward: {
            token_ids: migratedNfts,
          },
        });
        if (fetchNFT) await fetchNFT();
        toast.success("Success");
      } else {
      }
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
          spender: stakingMiddleContract.address,
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
        stakingMiddleContract.address,
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
        <ControlWrapper alignItems="flex-start">
          <Flex flexDirection="column">
            <Flex flexDirection="column">
              <StyledSpan fontSize="14px">
                1 Time at Month (1-2-3 of each Month)
              </StyledSpan>
              <StyledButton
                onClick={handleClaimRewards}
                color="#E9867B"
                width="271px"
                margin="5px 30px"
              >
                Claim Rewards
              </StyledButton>
              <StyledSpan fontSize="20px">{`${revealStakingReward} $HOPE`}</StyledSpan>
            </Flex>
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
          </Flex>
          <CollectionStats>
            <Table>
              <Thead>
                <Tr>
                  <Th>Collection:</Th>
                  <Th>I</Th>
                  <Th>II</Th>
                  <Th>III</Th>
                  <Th>IV</Th>
                  <Th>V</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Available:</Td>
                  <Td>{revealNftsList.length}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>Staked:</Td>
                  <Td>{revealStakedNfts.length}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>Unstaking:</Td>
                  <Td>{revealUnstakingNfts.length}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td>On Sale:</Td>
                  <Td>{revealMarketplaceNfts.length}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
          </CollectionStats>
        </ControlWrapper>
        <Wrapper padding="0 125px 50px 125px">
          {revealNftsList
            .concat(revealStakedNfts, revealUnstakingNfts)
            .map((nftItem: any, nftIndex) => {
              const tokenIdNumber = Number(
                getTokenIdNumber(nftItem.token_id) || 0
              );
              const rarityRank = rarityRanks[tokenIdNumber];
              return (
                <NFTItem
                  key={nftIndex}
                  id={nftItem.token_id}
                  metaData={nftItem.token_id.replace("Reveal.", "")}
                  item={nftItem}
                  unStakingPeriod={unStakingPeriod}
                  fetchNFT={fetchNFT}
                  currentTime={currentTime}
                  rarityRank={rarityRank}
                />
              );
            })}
        </Wrapper>
      </SubArea>
      <Divider />
      <SubArea>
        <SubAreaTitle>My Hope Galaxy Mint Pass</SubAreaTitle>
        <Wrapper>
          <MintPassItem>
            <MintPassPanel>
              <MintPassImage alt="" src="/others/mint_pass.png" />
              <StyledButton onClick={reveal} color="#E9867B" width="271px">
                Reveal NFT
              </StyledButton>
              <MintPassDescription>
                1NFT = 1 Mint Pass + 2 Juno
              </MintPassDescription>
            </MintPassPanel>
            <MintPassPanel alignItems="flex-start" justifyContent="flex-start">
              <MintPassStats>
                <MintPassStatsItem>
                  <StyledSpan>Collection:</StyledSpan>
                  <StyledSpan justifyContent="flex-end">I</StyledSpan>
                </MintPassStatsItem>
                <MintPassStatsItem>
                  <StyledSpan>Available:</StyledSpan>
                  <StyledSpan justifyContent="flex-end">
                    {nfts.length || 0}
                  </StyledSpan>
                </MintPassStatsItem>
                <MintPassStatsItem>
                  <StyledSpan>On Sale:</StyledSpan>
                  <StyledSpan justifyContent="flex-end">
                    {marketplaceNfts1.length || 0}
                  </StyledSpan>
                </MintPassStatsItem>
              </MintPassStats>
              <TotalMintedCount>
                <StyledSpan>MINTED</StyledSpan>
                <StyledSpan>{`${maxNfts} / 2000`}</StyledSpan>
              </TotalMintedCount>
              <TotalMintedCount>
                <StyledSpan>REVEALED</StyledSpan>
                <StyledSpan>{`${revealNfts} / 2000`}</StyledSpan>
              </TotalMintedCount>
            </MintPassPanel>
          </MintPassItem>
          <MintPassItem>
            <MintPassPanel>
              <MintPassImage alt="" src="/others/mint_pass1.png" />
              <StyledButton onClick={mint2} color="#E9867B" width="271px">
                Mint Pass II
              </StyledButton>
              <MintPassDescription>
                1 Mint Pass II = 1 $HOPE
              </MintPassDescription>
            </MintPassPanel>
            <MintPassPanel alignItems="flex-start" justifyContent="flex-start">
              <MintPassStats>
                <MintPassStatsItem>
                  <StyledSpan>Collection:</StyledSpan>
                  <StyledSpan justifyContent="flex-end">II</StyledSpan>
                </MintPassStatsItem>
                <MintPassStatsItem>
                  <StyledSpan>Available:</StyledSpan>
                  <StyledSpan justifyContent="flex-end">
                    {nfts2.length || 0}
                  </StyledSpan>
                </MintPassStatsItem>
                <MintPassStatsItem>
                  <StyledSpan>On Sale:</StyledSpan>
                  <StyledSpan justifyContent="flex-end">
                    {marketplaceNfts2.length || 0}
                  </StyledSpan>
                </MintPassStatsItem>
              </MintPassStats>
              <TotalMintedCount>
                <StyledSpan>MINTED</StyledSpan>
                <StyledSpan>{`${maxNfts2} / 2000`}</StyledSpan>
              </TotalMintedCount>
              <TotalMintedCount>
                <StyledSpan>REVEALED</StyledSpan>
                <StyledSpan>{`0 / 2000`}</StyledSpan>
              </TotalMintedCount>
            </MintPassPanel>
          </MintPassItem>
        </Wrapper>
      </SubArea>
      {/* <SubArea>
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
      </ControlWrapper> */}
      <Divider />
      <ComingSoonArea>
        <div
          style={{ textAlign: "center", fontWeight: "bold", margin: "20px" }}
        >
          coming soon
        </div>
        <Flex style={{ justifyContent: "space-between" }}>
          <StyledButton color="#5B5B5B" width="271px">
            Mint Galaxy III
          </StyledButton>
          <StyledButton color="#5B5B5B" width="271px">
            Mint Galaxy IV
          </StyledButton>
          <StyledButton color="#5B5B5B" width="271px">
            Mint Galaxy V
          </StyledButton>
        </Flex>
      </ComingSoonArea>
    </Container>
  );
};

export default Main;
