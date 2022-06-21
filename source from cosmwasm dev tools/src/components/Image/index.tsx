import React, { useState } from "react";

import { StyledImage } from "./styled";

export interface ImageProps {
  onClick?: any;
  alt: string;
  src: string;
}

const Image: React.FC<ImageProps> = ({ onClick, alt, src }) => {
  const [imageSize, setImageSize] = useState<{
    width?: string;
    height?: string;
  }>({});
  const [imageVisible, setImageVisible] = useState<boolean>(false);
  const handleOnClick = (e: any) => {
    if (onClick && typeof onClick === "function") onClick(e);
  };

  const handleOnLoadImage: React.ReactEventHandler<HTMLImageElement> = (
    e: any
  ) => {
    const {
      target: { naturalWidth, naturalHeight },
    } = e;
    const parent = e.target.parentElement || {};
    const { offsetHeight, offsetWidth } = parent;
    if (offsetHeight && offsetWidth) {
      const ratioParent = offsetHeight / offsetWidth;
      const ratioImage = naturalHeight / naturalWidth;
      if (ratioParent < ratioImage) {
        setImageSize({
          height: "100%",
        });
      } else {
        setImageSize({
          width: "100%",
        });
      }
    }
    setImageVisible(true);
  };

  return (
    <StyledImage
      onClick={handleOnClick}
      onLoad={handleOnLoadImage}
      alt={alt}
      src={src}
      width={imageSize.width}
      height={imageSize.height}
      imageVisible={imageVisible}
    />
  );
};

export default Image;
