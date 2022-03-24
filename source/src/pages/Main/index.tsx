import React from "react";
import NFTItem from "../../components/NFTItem";

import { Wrapper } from "./styled";

const Main: React.FC = () => {
  return (
    <Wrapper>
      <NFTItem id="NFTItem1" />
    </Wrapper>
  );
};

export default Main;
