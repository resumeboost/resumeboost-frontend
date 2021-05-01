import React from "react";
import PDFView from "./PDFview";
import { Resume } from "../interfaces/Resume";

interface Props {
  resume: Resume;
  name: string;
}

const Modal: React.FC<Props> = ({ resume, name }) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className="px-4 pb-2">
      <button
        className="pr-4 py-1 underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {name}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between py-2 pl-4 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{name}</h3>
                </div>
                {/* body */}
                <div className="relative flex-auto">
                  {/* TODO: Replace with actual resume */}
                  {/* <PDFView resumeLink="04e6b936-d6a6-433a-9400-307d5ee49fd3.pdf" /> */}
                  <PDFView resumeLink={resume.link} />
                </div>
                {/* footer */}
                <div className="flex items-center justify-between p-2 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    // onClick={() => setShowModal(false)}
                  >
                    Delete Resume
                  </button>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </div>
  );
};

export default Modal;
