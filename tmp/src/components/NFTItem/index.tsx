import React from "react";

// import { useBarcode } from "@createnextapp/react-barcode";

import {
  NFTItemWrapper,
  // NFTItemHeader,
  // NFTItemBarcode,
  // NFTItemLabel as Label,
  // NFTItemBody,
  // NFTItemImage,
  // NFTItemFooter,
  // NFTItemInfo,
  // NFTLogoImage,
  // NFTItemMintStatus,
} from "./styled";

export interface NFTItemProps {
  id: string;
}

export default function NFTItem({ id }: NFTItemProps) {
  // const { inputRef: barcode } = useBarcode({
  //   value: id,
  //   options: {
  //     background: "transparent",
  //     lineColor: "white",
  //     // displayValue: false,
  //     text: " ",
  //   },
  // });

  // const NFTItemLabel = (fontSize: string) => (
  //   <Label fontSize={fontSize}>
  //     <Label>HOP</Label>
  //     <Label color="#d49796">E</Label>
  //   </Label>
  // );

  return (
    <NFTItemWrapper>
      {/* <NFTItemHeader>
        <div>
          <Label mr="20px" fontSize="16px">
            NFT
          </Label>
          {NFTItemLabel("18px")}
        </div>
        <NFTItemBarcode ref={barcode} />
      </NFTItemHeader>
      <NFTItemBody>
        <NFTItemImage imageUrl="/others/HOPE-image.png" />
      </NFTItemBody>
      <NFTItemFooter>
        <NFTItemInfo>
          <div>
            <NFTLogoImage />
            {NFTItemLabel("24px")}
          </div>
          <Label color="#d49796" fontSize="18px" keepLowerCase>
            Qty.2000
          </Label>
        </NFTItemInfo>
        <NFTItemMintStatus>MINT PASS</NFTItemMintStatus>
      </NFTItemFooter> */}
    </NFTItemWrapper>
  );
}
