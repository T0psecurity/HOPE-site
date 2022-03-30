import React from "react";

import { FooterWrapper, FooterContent, SocialLinkIcon } from "./styled";

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <SocialLinkIcon imageUrl="/social-icons/twitter.png" />
        <SocialLinkIcon imageUrl="/social-icons/discord.png" />
        <SocialLinkIcon imageUrl="/social-icons/medium.png" />
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
