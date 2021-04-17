import { Review } from "./Review";
import { Resume } from "./Resume";

interface Employer {
  industries: string[];
  name: string;
  logo: string;
}

export default interface User {
  _id: string;
  email: string;
  points: number;
  targetCompanies: string[];
  targetPositions: string[];
  resumes: Resume[];
  reviews?: Review[];
}
