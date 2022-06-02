import React from "react";
import useWindowSize from "../../hook/useWindowSize";
import { ReactComponent as Twitter } from "../../assets/images/Twitter.svg";
import { ReactComponent as Discord } from "../../assets/images/Discord.svg";
import { ReactComponent as TempA } from "../../assets/images/TempA.svg";
import { ReactComponent as TempB } from "../../assets/images/TempB.svg";
import { ReactComponent as TempC } from "../../assets/images/TempC.svg";
import { FooterWrapper, FooterContent } from "./styled";

const Footer: React.FC = () => {
  const openNewUrl = (url: string) => {
    window.open(url);
  };
  const { isMobile } = useWindowSize(768);
  const width = isMobile ? "20px" : "50px";
  return (
    <FooterWrapper>
      <FooterContent>
        <Twitter
          onClick={() => openNewUrl("https://twitter.com/HopeGalaxyNFT")}
          style={{ margin: "20px", cursor: "pointer", width: width }}
        />
        <Discord
          onClick={() => openNewUrl("https://discord.gg/BfKPacc5jF")}
          style={{ margin: "20px", cursor: "pointer", width: width }}
        />
        <TempA
          onClick={() => openNewUrl("https://hopegalaxy.medium.com/")}
          style={{ margin: "20px", cursor: "pointer", width: width }}
        />
        <TempB
          onClick={() => openNewUrl("https://hopegalaxy.medium.com/")}
          style={{ margin: "20px", cursor: "pointer", width: width }}
        />
        <TempC
          onClick={() => openNewUrl("https://hopers-io.gitbook.io/docs/")}
          style={{ margin: "20px", cursor: "pointer", width: width }}
        />
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
