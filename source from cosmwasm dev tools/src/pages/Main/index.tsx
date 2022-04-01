import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  execute,
  prettifyInput,
  query,
} from "../../features/console/consoleSlice";

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
import { selectContract } from "../../features/accounts/accountsSlice";
// import { useKeplr } from "../../features/accounts/useKeplr";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [nfts, setNfts] = React.useState([]);
  const [maxNfts, setMaxNfts] = React.useState(0);
  const [shouldRenderVideo, setShouldRenderVideo] = React.useState(false);
  const [owner, setOwner] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const output = useAppSelector((state) => state.console.output);
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  // const { connect } = useKeplr();

  const fetchState = () => {
    console.log("fetchState");
    dispatch(
      selectContract(
        "juno17kr4uahqlz8hl8nucx82q4vmlj7lrzzlz0yr0ax9hejaevw6ewqsf8p5ux"
      )
    );

    const message1 = {
      get_state_info: {},
    };
    dispatch(prettifyInput(JSON.stringify(message1)));
    dispatch(query());

    const message2 = {
      get_maximum_nft: {},
    };
    dispatch(prettifyInput(JSON.stringify(message2)));
    dispatch(query());

    const message3 = {
      get_token_info: {
        address: account?.address,
      },
    };
    dispatch(prettifyInput(JSON.stringify(message3)));
    dispatch(query());

    dispatch(
      selectContract(
        "juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z"
      )
    );
    const message4 = {
      balance: {
        address: account?.address,
      },
    };
    dispatch(prettifyInput(JSON.stringify(message4)));
    dispatch(query());
  };

  useEffect(() => {
    setInterval(() => {
      fetchState();
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

  useEffect(() => {
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
  }, [output]);

  const setMaximumNft = async () => {
    if (!value) {
      toast.error("Insert amount!");
      return;
    }
    setShouldRenderVideo(false);
    dispatch(
      selectContract(
        "juno17kr4uahqlz8hl8nucx82q4vmlj7lrzzlz0yr0ax9hejaevw6ewqsf8p5ux"
      )
    );

    const message = {
      set_maximum_nft: { amount: `${value}` },
    };
    try {
      dispatch(prettifyInput(JSON.stringify(message)));
      dispatch(execute());
      // toast.success("Executed successfully!");
    } catch (error) {
      toast.error("Can not execute!");
    }
  };

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
                  <StyledButton onClick={setMaximumNft}>
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
