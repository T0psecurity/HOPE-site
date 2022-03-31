import styled from "styled-components";

export const NFTItemWrapper = styled.div`
  width: 350px;
  height: 555px;
  background-image: linear-gradient(to bottom, #6f2987, #232c63);
  padding: 30px 20px 0 20px;
  border-radius: 30px;
  border: 5px solid #f59186;
`;

export const NFTItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13px;
`;

export const NFTItemBarcode = styled.img`
  width: 115px;
  height: 25px;
`;

export const NFTItemLabel = styled.span<{
  fontSize?: string;
  color?: string;
  mr?: string;
  keepLowerCase?: boolean;
}>`
  ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
  ${({ mr }) => mr && `margin-right: ${mr};`}
  color: ${({ color }) => color ?? "white"};
  font-weight: bold;
  ${({ keepLowerCase }) => !keepLowerCase && "text-transform: uppercase;"}
`;

export const NFTItemBody = styled.div`
  border: 5px solid white;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 375px;
`;

export const NFTItemImage = styled.div<{ imageUrl: string }>`
  background: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  width: 240px;
  height: 240px;
`;

export const NFTItemFooter = styled.div`
  margin-top: 15px;
  height: calc(100% - 25px - 13px - 375px - 10px - 15px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const NFTItemInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
  }
`;

export const NFTLogoImage = styled.div`
  background: url("/others/HOPE-image.png");
  background-size: cover;
  background-position: center;
  width: 40px;
  height: 40px;
  margin-right: 5px;
`;

export const NFTItemMintStatus = styled.div`
  text-align: center;
  color: white;
  font-size: 22px;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 10px;
`;
