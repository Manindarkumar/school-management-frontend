import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function SubmissionDetails() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showFileModal, setShowFileModal] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [fileLoading, setFileLoading] = useState(false);

  useEffect(() => {

    fetchSubmissionDetails();

  }, [id]);


  const fetchSubmissionDetails = async () => {

    try {

      const response =
        await apiService.getSubmissionById(id);

      if (response.data.status === 0) {

        setSubmission(
          response.data.data
        );

      }

    } catch (error) {

      console.log(error);

      alert(
        "Failed to load submission details"
      );

    } finally {

      setLoading(false);

    }

  };


  // VIEW FILE IN POPUP
  const handleViewFile = async () => {

    try {

      setFileLoading(true);

      const response =
        await apiService.viewSubmissionFile(id);

      const blob =
        new Blob(
          [response.data],
          {
            type:
              submission.fileType ||
              response.headers["content-type"]
          }
        );

      const url =
        window.URL.createObjectURL(blob);

      setFileUrl(url);

      setShowFileModal(true);

    } catch (error) {

      console.log(
        "Error viewing file:",
        error
      );

      alert(
        "Unable to view file"
      );

    } finally {

      setFileLoading(false);

    }

  };


  // CLOSE POPUP
  const closeFileModal = () => {

    if (fileUrl) {

      window.URL.revokeObjectURL(
        fileUrl
      );

    }

    setFileUrl("");

    setShowFileModal(false);

  };


  // DOWNLOAD FILE
  const handleDownloadFile = async () => {

    try {

      const response =
        await apiService.downloadSubmissionFile(id);

      const blob =
        new Blob(
          [response.data]
        );

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        submission.fileName ||
        "submission-file";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(
        url
      );

    } catch (error) {

      console.log(
        "Download error:",
        error
      );

      alert(
        "Unable to download file"
      );

    }

  };


  if (loading) {

    return (

      <AdminLayout>

        <div className="
          text-center
          mt-10
          text-xl
        ">

          Loading...

        </div>

      </AdminLayout>

    );

  }


  if (!submission) {

    return (

      <AdminLayout>

        <div className="
          text-center
          mt-10
          text-xl
        ">

          Submission not found

        </div>

      </AdminLayout>

    );

  }


  const isImage =
    submission.fileType &&
    submission.fileType.startsWith(
      "image/"
    );


  const isPdf =
    submission.fileType ===
    "application/pdf";


  return (

    <AdminLayout>


      {/* BACK BUTTON */}

      <button
        onClick={() => navigate(-1)}
        className="
          bg-gray-200
          hover:bg-gray-300
          px-5 py-2
          rounded-xl
          mb-6
        "
      >

        ← Back

      </button>


      {/* TITLE */}

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">

        Submission Details

      </h1>


      {/* DETAILS */}

      <div className="
        bg-white
        p-8
        rounded-3xl
        shadow-md
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
      ">


        <div>

          <p className="text-gray-500">

            Student

          </p>

          <h2 className="
            text-xl
            font-semibold
          ">

            {submission.studentName || "N/A"}

          </h2>

        </div>


        <div>

          <p className="text-gray-500">

            Student ID

          </p>

          <h2 className="
            text-xl
            font-semibold
          ">

            {submission.studentId || "N/A"}

          </h2>

        </div>


        <div>

          <p className="text-gray-500">

            Assignment

          </p>

          <h2 className="
            text-xl
            font-semibold
          ">

            {submission.title || "N/A"}

          </h2>

        </div>


        <div>

          <p className="text-gray-500">

            Subject

          </p>

          <h2 className="
            text-xl
            font-semibold
          ">

            {submission.subject || "N/A"}

          </h2>

        </div>


        <div>

          <p className="text-gray-500">

            Teacher

          </p>

          <h2 className="
            text-xl
            font-semibold
          ">

            {submission.teacherName || "N/A"}

          </h2>

        </div>


        <div>

          <p className="text-gray-500">

            Due Date

          </p>

          <h2 className="
            text-xl
            font-semibold
          ">

            {submission.dueDate || "N/A"}

          </h2>

        </div>


        <div>

          <p className="text-gray-500">

            Batch

          </p>

          <h2 className="
            text-xl
            font-semibold
          ">

            {submission.batchYear || "N/A"}

          </h2>

        </div>


        <div>

          <p className="text-gray-500">

            Section

          </p>

          <h2 className="
            text-xl
            font-semibold
          ">

            {submission.batchSection || "N/A"}

          </h2>

        </div>


        {/* FEEDBACK */}

        <div className="md:col-span-2">

          <p className="text-gray-500">

            Feedback

          </p>

          <p className="text-lg">

            {submission.feedback ||
              "No feedback"}

          </p>

        </div>


        {/* REMARKS */}

        <div className="md:col-span-2">

          <p className="text-gray-500">

            Remarks

          </p>

          <p className="text-lg">

            {submission.remarks ||
              "No remarks"}

          </p>

        </div>


        {/* FILE */}

        <div className="
          md:col-span-2
          border-t
          pt-6
        ">

          <p className="
            text-gray-500
            mb-3
          ">

            Submitted File

          </p>


          {submission.fileName ? (

            <div className="
              flex
              flex-wrap
              items-center
              gap-4
            ">


              <div className="
                bg-gray-100
                px-4
                py-3
                rounded-xl
              ">

                <p className="font-semibold">

                  {submission.fileName}

                </p>

                <p className="
                  text-sm
                  text-gray-500
                ">

                  {submission.fileType}

                </p>

              </div>


              {/* VIEW */}

              <button
                onClick={handleViewFile}
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-5
                  py-3
                  rounded-xl
                "
              >

                {fileLoading
                  ? "Loading..."
                  : "View File"}

              </button>


              {/* DOWNLOAD */}

              <button
                onClick={handleDownloadFile}
                className="
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-5
                  py-3
                  rounded-xl
                "
              >

                Download File

              </button>

            </div>

          ) : (

            <p className="text-gray-500">

              No file submitted

            </p>

          )}

        </div>

      </div>


      {/* FILE MODAL */}

      {showFileModal && (

        <div className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black
          bg-opacity-70
          p-4
        ">


          <div className="
            bg-white
            rounded-2xl
            shadow-2xl
            w-full
            max-w-5xl
            max-h-[90vh]
            overflow-hidden
          ">


            {/* MODAL HEADER */}

            <div className="
              flex
              justify-between
              items-center
              p-4
              border-b
            ">

              <h2 className="
                text-xl
                font-bold
              ">

                {submission.fileName}

              </h2>


              <button
                onClick={closeFileModal}
                className="
                  text-2xl
                  font-bold
                  text-gray-600
                  hover:text-red-600
                "
              >

                ✕

              </button>

            </div>


            {/* FILE CONTENT */}

            <div className="
              p-4
              max-h-[75vh]
              overflow-auto
              flex
              justify-center
              items-center
            ">


              {/* IMAGE */}

              {isImage && (

                <img
                  src={fileUrl}
                  alt={submission.fileName}
                  className="
                    max-w-full
                    max-h-[70vh]
                    object-contain
                    rounded-lg
                  "
                />

              )}


              {/* PDF */}

              {isPdf && (

                <iframe
                  src={fileUrl}
                  title={submission.fileName}
                  className="
                    w-full
                    h-[70vh]
                    rounded-lg
                  "
                />

              )}


              {/* OTHER FILES */}

              {!isImage && !isPdf && (

                <div className="
                  text-center
                  p-10
                ">

                  <p className="
                    text-lg
                    mb-4
                  ">

                    This file type cannot be previewed.

                  </p>

                  <button
                    onClick={handleDownloadFile}
                    className="
                      bg-green-600
                      text-white
                      px-5
                      py-3
                      rounded-xl
                    "
                  >

                    Download File

                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </AdminLayout>

  );

}

export default SubmissionDetails;