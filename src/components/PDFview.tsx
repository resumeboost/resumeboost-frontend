import { Document, Page, pdfjs } from "react-pdf";
import React, { useEffect, useMemo, useState } from "react";

import api from "../utils/api";
import toast from "react-hot-toast";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Props {
  resumeLink: string | undefined;
}

const PDFView: React.FC<Props> = ({ resumeLink }) => {
  const [resumeFile, setResumeFile] = useState<Uint8Array>();

  useEffect(() => {
    // TODO: Fix memory usage caused by too many workers
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }, []);

  useEffect(() => {
    (async () => {
      if (resumeLink) {
        const resumeFileDataResponse = await api.getResumeFile(resumeLink);
        setResumeFile(resumeFileDataResponse);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeLink]);

  return resumeFile ? (
    <div>
      <Document
        file={{
          data: resumeFile,
        }}
        error="No Resume Found"
        loading="Loading PDF..."
        onLoadError={() => toast.error("Error loading PDF")}
      >
        <Page pageNumber={1} />
      </Document>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(PDFView);
