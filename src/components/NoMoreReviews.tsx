import React from "react";
import { ReactComponent as Illustration } from "../assets/MyUniverse.svg";

const NoMoreReviews: React.FC = () => {
  return (
    <div>
      <div className="flex justify-around content-center items-center">
        <div className="flex-col justify-items-center">
          <h1 className="text-3xl font-medium">
            Hey there! Slow down, leave some reviews for other users too ⚡
          </h1>
          <Illustration />
        </div>
      </div>
    </div>
  );
};

export default NoMoreReviews;
