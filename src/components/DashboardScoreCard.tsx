import React from "react";

interface Props {
  metric: string;
  score: number;
}

export const DashboardScoreCard: React.FC<Props> = ({ metric, score }) => {
  return (
    <div
      className=" rounded-lg border shadow-lg h-48 w-48 flex items-center justify-center"
      data-testid="scorecard"
    >
      <div>
        <div className="flex justify-center text-2xl font-semibold text-gray-500 ">
          {metric}
        </div>
        <div
          className="flex justify-center font-bold h-4/6 text-5xl"
          id={`score-${metric}`}
        >
          {score.toPrecision(2)}
        </div>
      </div>
    </div>
  );
};

export default DashboardScoreCard;
