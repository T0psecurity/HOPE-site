import React from "react";

import { FooterWrapper, FooterContent, SocialLinkIcon } from "./styled";

const Footer: React.FC = () => {
  const openNewUrl = (url: string) => {
    window.open(url);
  };
  return (
    <FooterWrapper>
      <FooterContent>
        <SocialLinkIcon
          onClick={() => openNewUrl("https://twitter.com/HopeGalaxyNFT")}
          imageUrl="/social-icons/twitter.png"
        />
        <SocialLinkIcon
          onClick={() => openNewUrl("https://discord.gg/BfKPacc5jF")}
          imageUrl="/social-icons/discord.png"
        />
        <SocialLinkIcon
          onClick={() => openNewUrl("https://hopegalaxy.medium.com/")}
          imageUrl="/social-icons/medium.png"
        />
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
