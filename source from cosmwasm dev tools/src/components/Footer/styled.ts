import styled from "styled-components";

export const FooterWrapper = styled.div`
  width: 100%;
  background-color: rgba(20, 20, 20, 1);
  border-top: 3px solid #d58181;
  height: 104px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
`;

export const SocialLinkIcon = styled.div<{ imageUrl: string }>`
  background: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  width: 20px;
  height: 20px;
  margin: 0 10px;
  cursor: pointer;
`;
