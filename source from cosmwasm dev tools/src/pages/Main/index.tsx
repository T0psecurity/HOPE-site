import React, { useEffect } from "react";
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
  Container,
  ComingSoonArea,
} from "./styled";
import { selectContract } from "../../features/accounts/accountsSlice";
// import { useKeplr } from "../../features/accounts/useKeplr";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const { runQuery, runExecute } = useContract();
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [nfts, setNfts] = React.useState([]);
  const [revealNftsList, setRevealNftsList] = React.useState([]);
  const [maxNfts, setMaxNfts] = React.useState(0);
  const [revealNfts, setRevealNfts] = React.useState(0);
  const [shouldRenderVideo, setShouldRenderVideo] = React.useState(false);
  const { isMobile } = useWindowSize(1000);
  const [owner, setOwner] = React.useState("");
  const [balance, setBalance] = React.useState(0);
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
  // const testingContract = useAppSelector(
  //   (state) => state.accounts.accountList[contractAddresses.TESTING_CONTRACT]
  // );
  // const testingNftContract = useAppSelector(
  //   (state) => state.accounts.accountList[contractAddresses.TESTING_NFT_CONTRACT]
  // );

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
  };
  const fetchNFT = async () => {
    if (!account || !nftContract) return;
    const tokens = await runQuery(nftContract, {
      tokens: {
        owner: account.address,
        start_after: undefined,
        limit: undefined,
      },
    });
    setNfts(tokens.tokens);
    const revealNfts: any = [];
    const revealTokens = await runQuery(revealNftContract, {
      tokens: {
        owner: account.address,
        start_after: undefined,
        limit: undefined,
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
    setRevealNftsList(revealNfts);
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
    console.log("isMint: ", isMint);
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
        toast.success("Success");
        fetchNFT();
      } catch (err) {
        console.log("err: ", err);
        toast.error("Fail!");
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
            <source src="videos/video1.mp4"></source>
          </video>
        </VideoWrapper>
      )}
      <SubArea>
        <div style={{ textAlign: "center", fontWeight: "bold" }}>
          My Hope Galaxy NFT
        </div>
        <Wrapper>
          {revealNftsList.map((nftItem: any, nftIndex) => (
            <NFTItem
              key={nftIndex}
              id={nftItem.token_id}
              metaData={nftItem.token_id.replace("Reveal.", "")}
              item={nftItem}
            />
          ))}
        </Wrapper>
      </SubArea>
      <Divider />
      <SubArea>
        <div style={{ textAlign: "center", fontWeight: "bold" }}>
          My Mint Pass
        </div>
        <Wrapper>
          {nfts.map((nftItem, nftIndex) => (
            <NFTItem key={nftIndex} id={nftItem} />
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
      <Flex>
        <TotalMintedCount>
          <StyledSpan>MINTED</StyledSpan>
          <StyledSpan>{`0 / 2000`}</StyledSpan>
        </TotalMintedCount>
        <StyledButton color="#FF9100" width="271px">
          Mint Galaxy 2
        </StyledButton>
        <div
          style={{
            display: "flex",
            color: "white",
            alignItems: "center",
            fontSize: "26px",
            margin: "15px",
          }}
        >
          Next Collection
        </div>
      </Flex>
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
