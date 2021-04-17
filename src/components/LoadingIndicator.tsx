import React from "react";
import { css } from "@emotion/react";

import GridLoader from "react-spinners/GridLoader";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
`;

const LoadingIndicator = () => {
  return (
    <div>
      <GridLoader size={20} css={override} color="#5521b5" />
    </div>
  );
};

export default LoadingIndicator;
