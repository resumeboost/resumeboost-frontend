import { Resume } from "./Resume";

export interface Reviewee {
  user: {
    _id: string;
    targetPositions: string[];
    targetCompanies: string[];
    resume: Resume;
  };
  //   resumeFile: {
  //     type: "Buffer";
  //     data: Uint8Array;
  //   };
}
