import React from "react";
import NFTItem from "../../components/NFTItem";

import { Wrapper } from "./styled";

const Main: React.FC = () => {
  return (
    <Wrapper>
      <NFTItem id="NFTItem1" />
      <NFTItem id="NFTItem2" />
      <NFTItem id="NFTItem3" />
      <NFTItem id="NFTItem4" />
      <NFTItem id="NFTItem5" />
      <NFTItem id="NFTItem6" />
    </Wrapper>
  );
};

export default Main;
