import styled, { css } from "styled-components";

export const StyledImage = styled.img<{
  width?: string;
  height?: string;
  imageVisible?: boolean;
}>`
  cursor: pointer;
  opacity: 0;
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}
  ${({ imageVisible }) =>
    imageVisible &&
    css`
      opacity: 1;
    `};

  ${({ width, height }) =>
    !width &&
    !height &&
    css`
      max-width: 100%;
      max-height: 100%;
      width: max-content;
      height: max-content;
    `}
  cursor: pointer;
  /* width: 370px;
  height: 400px; */
  border-radius: 30px;
`;
