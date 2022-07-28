import React from "react";
import { useAppSelector } from "../../app/hooks";
import {
  Wrapper,
  TokenImage,
  TokenName,
  TokenMainName,
  Text,
  TokenPrice as TokenPriceContainer,
} from "./styled";

interface TokenPriceProps {
  tokenType: "juno" | "hope";
}

const Colors = {
  positive: "#35CB00",
  negative: "#FF4842",
  zero: "#919EAB",
};

const Arrow = ({ fill, transform }: { fill: string; transform: any }) => (
  <svg
    width="8"
    height="7"
    viewBox="0 0 8 7"
    fill={fill || "none"}
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: transform || "", marginRight: 5 }}
  >
    <path
      d="M4.754 0.246226C4.79267 0.283894 4.958 0.426124 5.094 0.558614C5.94933 1.33536 7.34933 3.36167 7.77667 4.42223C7.84533 4.58329 7.99067 4.9905 8 5.20807C8 5.41655 7.952 5.61528 7.85467 5.80492C7.71867 6.04132 7.50467 6.23096 7.252 6.33488C7.07667 6.40177 6.552 6.50568 6.54267 6.50568C5.96867 6.6096 5.036 6.66675 4.00533 6.66675C3.02333 6.66675 2.12867 6.6096 1.546 6.52452C1.53667 6.51477 0.884666 6.41086 0.661333 6.29721C0.253333 6.08873 8.61311e-08 5.68152 1.24229e-07 5.24574L1.27522e-07 5.20807C0.0099999 4.92426 0.263334 4.32741 0.272667 4.32741C0.700667 3.324 2.032 1.34446 2.91667 0.548872C2.91667 0.548872 3.144 0.324809 3.286 0.227391C3.49 0.0754181 3.74267 8.16438e-05 3.99533 8.16659e-05C4.27733 8.16905e-05 4.54 0.0851604 4.754 0.246226Z"
      fill={fill || "none"}
    />
  </svg>
);

const TokenPrice: React.FC<TokenPriceProps> = ({ tokenType }) => {
  const price = useAppSelector((state) => state.tokenPrices.price?.[tokenType]);
  const tokenImage = price?.image.large || "";
  const marketData = price?.market_data;
  const tokenPrice = marketData?.current_price.usd || 0;
  const priceChange = marketData?.price_change_percentage_24h || 0;

  const colorLabel =
    priceChange < 0 ? "negative" : priceChange > 0 ? "positive" : "zero";

  return (
    <Wrapper>
      <TokenImage src={tokenImage} alt="token-image" />
      <TokenName>
        <TokenMainName>
          <Text textTransform="uppercase">{tokenType}</Text>
          <Text>/USD</Text>
        </TokenMainName>
        <Text textTransform="capitalize" fontSize="13px">
          {tokenType}
        </Text>
      </TokenName>
      <TokenPriceContainer>
        <Text>{`$${tokenPrice}`}</Text>
        <Text color={Colors[colorLabel]} fontSize="13px">
          {priceChange !== 0 && (
            <Arrow
              fill={Colors[colorLabel]}
              transform={priceChange < 0 ? "rotate(180deg)" : ""}
            />
          )}
          {`(${Math.abs(priceChange).toFixed(2)}%)`}
        </Text>
      </TokenPriceContainer>
    </Wrapper>
  );
};

export default TokenPrice;
