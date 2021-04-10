import React, { useContext, useEffect } from "react";

import Header from "../components/Header";
import PDFView from "../components/PDFview";
import Reviews from "../components/DashboardReviews";
import ScoreCard from "../components/DashboardScoreCard";
import UserContext from "../context/UserContext";
import api from "../utils/api";
import utils from "../utils/utils";

const Dashboard: React.FC = () => {
  const { user, setReviews, reviews } = useContext(UserContext);

  useEffect(() => {
    if (user?._id) {
      api
        .getAllReviews(user._id)
        .then((userReviews) => user && setReviews(userReviews));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user && reviews ? (
    <div>
      <Header title="Dashboard" />
      <div className="flex space-x-6">
        <div className="w-1/2 flex flex-col space-y-6">
          <div className="flex space-x-6">
            <ScoreCard
              metric="Visual"
              score={utils.getAvergeFromReviews(reviews, "visual")}
            />
            <ScoreCard
              metric="Content"
              score={utils.getAvergeFromReviews(reviews, "content")}
            />
            <ScoreCard
              metric="Relevance"
              score={utils.getAvergeFromReviews(reviews, "relevance")}
            />
          </div>
          <div className="border rounded-lg shadow-lg">
            <Reviews />
          </div>
        </div>
        <div className="max-w-1/2 rounded-lg shadow-lg">
          {/* Resume Placeholder */}
          <PDFView />
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Dashboard;
