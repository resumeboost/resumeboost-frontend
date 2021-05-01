import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AddTargetEntry } from "../components/AddTargetEntry";
import Header from "../components/Header";
import PDFModal from "../components/PDFModal";
import { TargetEntry } from "../components/TargetEntry";
import UserContext from "../context/UserContext";
import api from "../utils/api";
import { useFormik } from "formik";

export const UserProfile: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (user) {
      console.log("Updating User");
      api
        .updateUserPreferences(user._id, {
          targetCompanies: user.targetCompanies,
          targetPositions: user.targetPositions,
        })
        .then(() => toast.success("Successfully updated user preferences"))
        .catch(() =>
          toast.error(
            "Error while updating preferences. Please refresh the page and try again"
          )
        );
    }
  }, [user]);

  const onFileChange = (event: any) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    if (selectedFile && user) {
      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      formData.append("resume", selectedFile, selectedFile.name);

      // TODO: Add updated resume to local state
      api
        .uploadResume(user._id, formData)
        .then(() => toast.success("Successfully uploaded resume"))
        .catch((err) =>
          toast.error("Error while uploading resume, please try again")
        );
    }
  };

  const onDeleteAccount = async () => {
    await api.deleteUser();
    setUser(undefined);
    window.location.replace("/");
  };

  const handleAddComp = (name: string) => {
    if (user) {
      setUser({
        ...user,
        targetCompanies: [...user.targetCompanies, name],
      });
    }
  };

  const handleAddPos = (name: string) => {
    if (user) {
      setUser({
        ...user,
        targetPositions: [...user.targetPositions, name],
      });
    }
  };

  const handleRemoveComp = (name: string) => {
    if (user) {
      setUser({
        ...user,
        targetCompanies: user.targetCompanies.filter(
          (company) => company !== name
        ),
      });
    }
  };

  const handleRemovePos = (name: string) => {
    if (user) {
      setUser({
        ...user,
        targetPositions: user.targetPositions.filter(
          (position) => position !== name
        ),
      });
    }
  };

  return (
    <div>
      <Header title="User Profile" />
      <div className="flex space-x-6">
        {/* Left side of page */}
        <div className="w-2/5">
          <div className="border rounded-lg shadow-lg">
            <div className="px-4 py-4 text-2xl font-bold">
              {/* TODO: get real user name */}
              FirstName LastName
            </div>
            <div className="px-4 pb-6 text-xl">{user?.email}</div>
            <div className="px-4 pb-4 text-xl">My Resumes:</div>
            {user?.resumes.map((item, index) => (
              <PDFModal
                resume={item}
                name={"resume".concat(index.toString())}
              />
            ))}
            <form className="p-4 flex justif-end">
              {/* TODO: Upload resume functionality */}
              <input type="file" onChange={onFileChange} />
              <button
                id="#submit-resume"
                type="button"
                className="px-8 p-4 border rounded-full bg-purple-800 text-white font-semibold text-sm"
                onClick={onFileUpload}
              >
                Upload Resume
              </button>
            </form>
          </div>
          <button
            type="button"
            className="mt-4 px-8 p-4 border rounded-full bg-red-600 text-white font-bold text-sm"
            onClick={onDeleteAccount}
          >
            Delete Account
          </button>
        </div>

        {/* Right side of page */}
        <div className="w-3/5 space-y-6">
          {/* target companies box */}
          <div className="border rounded-lg shadow-lg">
            <div className="p-4 text-2xl">Target Companies</div>
            <div className="flex flex-wrap pl-4">
              {user?.targetCompanies.map((item) => (
                <TargetEntry name={item} remove={handleRemoveComp} />
              ))}
            </div>
            <AddTargetEntry
              placeholder="enter company name"
              buttonLabel="Add Target Company"
              add={handleAddComp}
            />
          </div>
          {/* target positions box */}
          <div className="border rounded-lg shadow-lg">
            <div className="p-4 text-2xl">Target Positions</div>
            <div className="flex flex-wrap pl-4">
              {user?.targetPositions.map((item) => (
                <TargetEntry name={item} remove={handleRemovePos} />
              ))}
            </div>
            <AddTargetEntry
              placeholder="enter position name"
              buttonLabel="Add Target Position"
              add={handleAddPos}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
