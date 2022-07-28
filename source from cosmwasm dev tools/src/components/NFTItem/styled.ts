import styled, { css } from "styled-components";

const borderColors: { [key: string]: string } = {
  "On Sale": "#FF0000 ",
  Available: "#39C639",
  Staked: "#FF9100",
  Unstaked: "#FF9100",
};

const buttonColors: { [key: string]: string } = {
  Transfer: "#03009F",
  Withdraw: "#39C639",
  Sell: "#FF0000",
  Stake: "#FF9100",
  Unstake: "#FF9100",
};

export const NFTItemWrapper = styled.div<{ nftItemStatus: string }>`
  width: 300px;
  background-color: white;
  border: 5px solid
    ${({ nftItemStatus }) => borderColors[nftItemStatus] || "#FFFFFF"};
  position: relative;
  margin-top: 10px;

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 425px) {
    width: 200px;
  }
`;

export const NFTItemImage = styled.img`
  border-radius: 30px;
  margin: 30px 30px 0 30px;
  width: calc(100% - 60px);
  /* min-height: 300px; */

  @media (max-width: 768px) {
    margin: 10px 10px 0 10px;
    width: calc(100% - 20px);
  }

  /* background-image: linear-gradient(to bottom, #6f2987, #232c63);
  padding: 30px 20px 0 20px;
  border-radius: 30px;
  border: 5px solid #f59186; */
`;

export const NFTItemBadge = styled.div<{ nftItemStatus: string }>`
  background-color: ${({ nftItemStatus }) =>
    borderColors[nftItemStatus] || "#FFFFFF"};
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  width: 130px;
  height: 45px;
  border-radius: 0px 0px 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NFTItemImageDownloadIcon = styled.svg`
  position: absolute;
  right: 7px;
  top: 10px;
  cursor: pointer;
`;

export const NFTItemInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 30px;
`;

export const NFTItemInfo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  text-align: left;
`;

export const NFTItemOperationCell = styled.div`
  color: black;
  width: 30%;
  font-size: 16px;
  font-weight: 300;
`;

export const NFTItemOperationButton = styled.div<{
  buttonType: string;
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  border-radius: 10px;
  user-select: none;
  height: 45px;
  width: 33%;
  margin: 10px 0;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  background-color: ${({ buttonType }) => buttonColors[buttonType]};
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  cursor: ${({ disabled }) => (disabled ? "no-drop" : "pointer")};
  padding: 0 5px;
  &:hover {
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }
  @media (max-width: 768px) {
    width: max-content;
    min-width: 50px;
  }
`;

export const NFTItemTransferAddress = styled.input`
  width: calc(64% - 40px);
  height: 45px;
  border: 1px solid #000000;
  border-radius: 10px;
  position: relative;
  color: black;
  padding: 0 20px;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
`;

export const NFTItemOperationContainer = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 10px 30px;
  position: relative;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  ${({ disabled }) =>
    disabled &&
    css`
      ${NFTItemOperationButton} {
        cursor: no-drop;
      }
      ${NFTItemTransferAddress} {
        cursor: no-drop;
      }
    `}
  @media (max-width: 768px) {
    margin: 10px;
  }
`;

export const JunoWalletIndicator = styled.span`
  position: absolute;
  top: -25px;
  right: 10px;
  color: black;
  font-weight: 300;
  font-size: 16px;
  line-height: 43px;
  @media (max-width: 768px) {
    top: 45px;
  }
`;

export const RarityRankContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: black;
  position: absolute;
  right: 40px;
  top: 5px;

  @media (max-width: 768px) {
    position: relative;
    right: unset;
  }
`;

export const RarityRankContent = styled.div<{ bold?: boolean }>`
  font-size: 20px;
  line-height: 36px;
  padding: 0 10px;
  font-weight: normal;

  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
`;

// export const NFTItemHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 13px;
// `;

// export const NFTItemBarcode = styled.img`
//   width: 115px;
//   height: 25px;
// `;

// export const NFTItemLabel = styled.span<{
//   fontSize?: string;
//   color?: string;
//   mr?: string;
//   keepLowerCase?: boolean;
// }>`
//   ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
//   ${({ mr }) => mr && `margin-right: ${mr};`}
//   color: ${({ color }) => color ?? "white"};
//   font-weight: bold;
//   ${({ keepLowerCase }) => !keepLowerCase && "text-transform: uppercase;"}
// `;

// export const NFTItemBody = styled.div`
//   border: 5px solid white;
//   border-radius: 30px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 375px;
// `;

// export const NFTItemImage = styled.div<{ imageUrl: string }>`
//   background: ${({ imageUrl }) => `url(${imageUrl})`};
//   background-size: cover;
//   background-position: center;
//   width: 240px;
//   height: 240px;
// `;

// export const NFTItemFooter = styled.div`
//   margin-top: 15px;
//   height: calc(100% - 25px - 13px - 375px - 10px - 15px);
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// export const NFTItemInfo = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   & > div {
//     display: flex;
//     align-items: center;
//   }
// `;

// export const NFTLogoImage = styled.div`
//   background: url("/others/HOPE-image.png");
//   background-size: cover;
//   background-position: center;
//   width: 40px;
//   height: 40px;
//   margin-right: 5px;
// `;

// export const NFTItemMintStatus = styled.div`
//   text-align: center;
//   color: white;
//   font-size: 22px;
//   text-transform: uppercase;
//   font-weight: bold;
//   margin-bottom: 10px;
// `;
