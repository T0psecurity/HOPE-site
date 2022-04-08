import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../app/hooks";

import NFTItem from "../../components/NFTItem";
import {
  Wrapper,
  StyledButton,
  VideoWrapper,
  ControlWrapper,
  StyledInput,
  StyledSpan,
  TotalMintedCount,
  Flex,
} from "./styled";
import useContract, { contractAddresses } from "../../hook/useContract";
// import { useKeplr } from "../../features/accounts/useKeplr";

const Main: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [nfts, setNfts] = React.useState([]);
  const [maxNfts, setMaxNfts] = React.useState(0);
  const [owner, setOwner] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  // const { connect } = useKeplr();

  const { runQuery, runExecute } = useContract();

  const fetchState = async () => {
    let result;

    result = await runQuery(contractAddresses.MAIN_CONTRACT, {
      get_state_info: {},
    });
    setOwner(result.owner);
    setMaxNfts(Number(result.total_nft));
    // dispatch(setResult({ key: "stateInfo", result })); // it is unnecessary at this line, but just for reference

    result = await runQuery(contractAddresses.MAIN_CONTRACT, {
      get_maximum_nft: {},
    });
    setValue(result);

    result = await runQuery(contractAddresses.MAIN_CONTRACT, {
      get_token_info: {
        address: account?.address,
      },
    });
    setNfts(result.tokens);

    result = await runQuery(contractAddresses.TOKEN_CONTRACT, {
      balance: {
        address: account?.address,
      },
    });
    setBalance(Number(result.balance));
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
    if (account) {
    } else {
      setNfts([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const setMaximumNft = async () => {
    if (!value) {
      toast.error("Insert amount!");
      return;
    }

    const message = {
      set_maximum_nft: { amount: `${value}` },
    };
    try {
      await runExecute(contractAddresses.MAIN_CONTRACT, message);
      toast.success("Executed successfully!");
    } catch (error) {
      toast.error("Can not execute!");
    }
  };

  const mint = async () => {
    if (nfts.length === Number(value) || maxNfts >= 2000) {
      toast.error("Can not mint!");
      return;
    }
    // if (balance < 1000000) {
    //   toast.error("Not enough balance!");
    //   return;
    // }
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

    await runExecute(contractAddresses.TOKEN_CONTRACT, message);
    setLoading(true);
    fetchState();
  };

  return (
    <>
      <Wrapper>
        {nfts.map((nftItem, nftIndex) => (
          <NFTItem key={nftIndex} id={nftItem} />
        ))}

        {loading && (
          <VideoWrapper>
            <video
              // loop
              autoPlay
              style={{ height: "100%" }}
              id="video"
              onEndedCapture={() => setLoading(false)}
            >
              <source src="videos/video1.mp4"></source>
            </video>
          </VideoWrapper>
        )}
      </Wrapper>
      <ControlWrapper>
        {account && (
          <>
            <TotalMintedCount>
              <StyledSpan>MINTED</StyledSpan>
              <StyledSpan>{`${maxNfts} / 2000`}</StyledSpan>
            </TotalMintedCount>
            <Flex>
              <StyledButton onClick={mint}>Mint</StyledButton>
              {account?.address === owner ? (
                <>
                  <StyledInput
                    disabled={account?.address !== owner}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <StyledButton onClick={setMaximumNft} width="160px">
                    Set Maximum
                  </StyledButton>
                </>
              ) : (
                <div>
                  <StyledSpan>1 $HOPE x 1 MINT PASS</StyledSpan>
                  <StyledSpan>{`Max: ${value}`}</StyledSpan>
                </div>
              )}
            </Flex>
          </>
        )}
      </ControlWrapper>
    </>
  );
};

export default Main;
