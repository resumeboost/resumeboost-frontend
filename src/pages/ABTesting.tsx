import React, { useContext, useEffect } from "react";

import Reviews from "../components/DashboardReviews";
import ScoreCard from "../components/DashboardScoreCard";
import Header from "../components/Header";
import PDFView from "../components/PDFview";
import UserContext from "../context/UserContext";
import api from "../utils/api";
import utils from "../utils/utils";
import User from "../interfaces/User";

const getActiveResumeLink = (user: User): string | undefined => {
  if (user) {
    const activeResumes = user?.resumes.filter((item) => item.isActive);

    if (activeResumes.length > 0) {
      return activeResumes[0].link;
    }
  }

  return undefined;
};

export const ABTesting: React.FC = () => {
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
    <div className="space-y-6">
      <Header title="AB Testing" />
      <div className="flex space-x-12">
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

      {/* Resume Placeholder */}
      <div className="flex space-x-auto space-x-12">
        <div className="w-1/2 border rounded-lg shadow-lg">
          <PDFView resumeLink={getActiveResumeLink(user)} />
        </div>
        <div className="w-1/2 border rounded-lg shadow-lg">
          <PDFView resumeLink={getActiveResumeLink(user)} />
        </div>
      </div>
      <div className="flex space-x-12">
        <Reviews />
        <Reviews />
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ABTesting;
