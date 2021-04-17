import "rc-slider/assets/index.css";

import { Badge, Button, Label, Textarea } from "@windmill/react-ui";
import { Form, useFormik } from "formik";

import PDFView from "./PDFview";
import React, { useContext, useEffect, useState } from "react";
import RatingSlider from "./RatingSlider";
import { Reviewee } from "../interfaces/Reviewee";
import api from "../utils/api";
import UserContext from "../context/UserContext";
import { PostReviewDto } from "../interfaces/PostReviewDto";
import toast from "react-hot-toast";
import NoMoreReviews from "./NoMoreReviews";
import LoadingIndicator from "./LoadingIndicator";

const Feedback: React.FC = () => {
  const [reviewee, setReviewee] = useState<Reviewee>();
  const { user } = useContext(UserContext);

  const getNextUserToReview = async () => {
    const reviewUserDetails = await api.getNextUserToReview();
    setReviewee(reviewUserDetails);
  };

  const formik = useFormik({
    initialValues: {
      feedback: "",
      visual: 3,
      content: 3,
      relevance: 3,
    },
    onSubmit: async (values) => {
      console.log(values);
      if (reviewee && user) {
        const reviewData: PostReviewDto = {
          revieweeId: reviewee?.user._id,
          reviewerId: user?._id,
          resumeId: reviewee?.user.resume._id,
          visual: values.visual,
          content: values.content,
          relevance: values.relevance,
          feedback: values.feedback,
        };

        await api.postReview(reviewData);
        setReviewee(undefined);
        getNextUserToReview().catch((err) =>
          toast.error("Error fetching next user")
        );
      }
    },
  });

  useEffect(() => {
    (() => {
      getNextUserToReview();
    })();
  }, []);

  if (reviewee) {
    return (
      <div className="flex space-x-6">
        <div className="w-1/2 shadow-lg">
          {/* TODO: Replace with actual resume */}
          <PDFView resumeLink={reviewee.user.resume.link} />
        </div>
        <div className="w-1/2 flex-reverse justify-center content-center items-center">
          <div className="w-full shadow rounded-md p-12 bg-white">
            <h1 className="text-3xl">Satoshi Nakamoto</h1>
            <div className="my-4 flex-wrap">
              <span>Target Companies: </span>
              {reviewee.user.targetCompanies.map((company) => (
                <Badge className="text-md bg-gray-200 p-2 mx-2" type="neutral">
                  {company}
                </Badge>
              ))}
            </div>
            <div className="my-4 flex-wrap">
              <span>Target Positions: </span>
              {reviewee.user.targetPositions.map((position) => (
                <Badge className="text-md bg-gray-200 p-2 mx-2" type="neutral">
                  {position}
                </Badge>
              ))}
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full shadow my-12 rounded-md pt-8 pb-16 bg-white">
              <h1 className="ml-8 font-normal text-xl mb-4">Rating</h1>
              <div className="w-128 mx-20">
                <span>Visual</span>
                <RatingSlider
                  value={formik.values.visual}
                  fieldName="visual"
                  setFieldValue={formik.setFieldValue}
                />
              </div>
              <div className="w-128 mx-20 mt-12">
                <span>Content</span>
                <RatingSlider
                  value={formik.values.content}
                  fieldName="content"
                  setFieldValue={formik.setFieldValue}
                />
              </div>
              <div className="w-128 mx-20 my-12">
                <span>Relevance</span>
                <RatingSlider
                  value={formik.values.relevance}
                  fieldName="relevance"
                  setFieldValue={formik.setFieldValue}
                />
              </div>
            </div>

            <div className="w-full my-12">
              <Label>
                <Textarea
                  css=""
                  className="h-48 w-full"
                  id="response"
                  name="response"
                  placeholder="Write down your response"
                  onChange={(event) =>
                    formik.setFieldValue("feedback", event.target.value)
                  }
                  value={formik.values.feedback}
                />
              </Label>

              <Button className="float-right my-8" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <LoadingIndicator />
    </div>
  );
};

export default Feedback;
