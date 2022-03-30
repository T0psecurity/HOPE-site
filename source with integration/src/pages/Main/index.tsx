import React from "react";
import NFTItem from "../../components/NFTItem";
import {
  Wrapper,
  StyledButton,
  VideoWrapper,
  ControlWrapper,
  StyledInput,
} from "./styled";
import {
  getAccount,
  queryContractInfo,
  queryTokenInfo,
  setMaximum
} from "../../services/sevice";
import { useSdk } from "@cosmicdapp/logic";

const Main: React.FC = () => {

  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");

  const getAccountInfo = async () => {
    // await getAccount();
    //await queryContractInfo();
    // await queryTokenInfo();
    // setLoading(true);
    // console.log("clicked");
    await setMaximum();
  };
  return (
    <>
      <Wrapper>
        <NFTItem id="NFTItem1" />
        {loading && (
          <VideoWrapper>
            <video loop autoPlay style={{ height: "100%" }} id="video">
              <source src="videos/video1.mp4"></source>
            </video>
          </VideoWrapper>
        )}
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
