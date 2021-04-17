import { Review } from "../interfaces/Review";
import User from "../interfaces/User";
import { createContext } from "react";

interface IUserContext {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  reviews: Review[] | undefined;
  setReviews: React.Dispatch<React.SetStateAction<Review[] | undefined>>;
  // resumeFile: string | undefined;
  // setResumeFile: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const UserContext = createContext<IUserContext>({
  user: undefined,
  setUser: () => {},
  reviews: undefined,
  setReviews: () => {},
  // resumeFile: undefined,
  // setResumeFile: () => {},
});

export default UserContext;
