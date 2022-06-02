import React from "react";

const Icon: React.FC<any> = (props) => {
  return (
    <svg
      width={props.width}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.15999 1.07L0.98999 8.31L5.42998 12.91L12.96 13.85L6.39998 6.48L13.87 12.93L12.83 5.44L8.15999 1.07Z"
        fill={props.color}
      />
      <path
        d="M19.82 26.91L26.99 19.68L22.55 15.08L15.03 14.14L21.59 21.5L14.11 15.06L15.16 22.54L19.82 26.91Z"
        fill={props.color}
      />
      <path
        d="M1.06995 19.82L8.30994 26.99L12.9099 22.55L13.8499 15.03L6.47993 21.59L12.9299 14.11L5.43994 15.16L1.06995 19.82Z"
        fill={props.color}
      />
      <path
        d="M26.91 8.16L19.68 0.989998L15.08 5.43L14.14 12.96L21.5 6.4L15.06 13.87L22.54 12.83L26.91 8.16Z"
        fill={props.color}
      />
    </svg>
  );
};

export default Icon;
