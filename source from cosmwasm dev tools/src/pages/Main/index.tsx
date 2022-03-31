import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { execute, prettifyInput } from "../../features/console/consoleSlice";

import NFTItem from "../../components/NFTItem";
import {
  Wrapper,
  StyledButton,
  VideoWrapper,
  ControlWrapper,
  StyledInput,
} from "./styled";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading] = React.useState(false);
  const [value, setValue] = React.useState("");

  const getAccountInfo = async () => {
    if (!value) return;
    const message = {
      set_maximum_nft: { amount: `${value}` },
    };
    dispatch(prettifyInput(JSON.stringify(message)));
    dispatch(execute());
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
