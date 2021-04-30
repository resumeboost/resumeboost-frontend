import Reviews, { DashboardReviews } from "../components/DashboardReviews";
import { cleanup, render } from "@testing-library/react";

import React from "react";
import ReactDOM from "react-dom";
import UserContext from "../context/UserContext";

afterEach(cleanup);

describe("DashboardReviews", () => {
  // eslint-disable-next-line jest/expect-expect
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Reviews />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders reviews in table", () => {
    const { getByTestId } = render(
      <UserContext.Provider
        value={{
          user: {
            _id: "id",
            email: "email",
            points: 0,
            targetCompanies: [],
            targetPositions: [],
            resumes: [],
            reviews: [
              {
                _id: "reviewID",
                visual: 1,
                content: 2,
                relevance: 3,
                feedback: "Feedback",
                createdAt: "01/01/2000",
              },
            ],
          },
          setUser: jest.fn(),
          // resumeFile: "",
          // setResumeFile: jest.fn(),
          reviews: [],
          setReviews: jest.fn(),
        }}
      >
        <DashboardReviews />
      </UserContext.Provider>
    );
    expect(getByTestId("reviewTable").childElementCount).toBe(1);
  });
});

// it("renders Reviews title correctly", () => {
//   const { getByTestId } = render(<Reviews />);
//   expect(getByTestId("reviews")).toHaveTextContent("Reviews");
// });
