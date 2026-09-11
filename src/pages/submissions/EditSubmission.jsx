import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function EditSubmission() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [assignments, setAssignments] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);


  const [submission, setSubmission] = useState({

    assignmentId: "",

    studentFullId: "",

    remark: "",

  });


  useEffect(() => {

    loadData();

  }, [id]);


  const loadData = async () => {

    try {

      const [

        submissionResponse,

        assignmentResponse

      ] = await Promise.all([

        apiService.getSubmissionById(id),

        apiService.getAllAssignments(),

      ]);


      // =========================
      // ASSIGNMENT LIST
      // =========================

      if (
        assignmentResponse.data.status === 0
      ) {

        setAssignments(
          assignmentResponse.data.data
        );

      }


      // =========================
      // SUBMISSION DATA
      // =========================

      if (
        submissionResponse.data.status === 0
      ) {

        const data =
          submissionResponse.data.data;


        // =========================
        // FIND ASSIGNMENT
        // =========================

        const selectedAssignment =
          assignmentResponse.data.data.find(

            (assignment) =>

              assignment.title ===
              data.title

          );


        console.log(
          "Submission Title:",
          data.title
        );


        console.log(
          "Selected Assignment:",
          selectedAssignment
        );


        // =========================
        // SET FORM DATA
        // =========================

        setSubmission({

          assignmentId:

            selectedAssignment
              ? selectedAssignment.id
              : "",


          studentFullId:

            data.studentId || "",


          remark:

            data.remarks || "",

        });

      }


    } catch (error) {

      console.log(error);

      alert(
        "Failed to load submission"
      );

    } finally {

      setLoading(false);

    }

  };


  const handleChange = (e) => {

    setSubmission({

      ...submission,

      [e.target.name]:

        e.target.value,

    });

  };


  const handleFileChange = (e) => {

    setSelectedFile(

      e.target.files[0]

    );

  };


  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const formData = new FormData();

    formData.append(
      "assignmentId",
      submission.assignmentId
    );

    formData.append(
      "studentFullId",
      submission.studentFullId
    );

    formData.append(
      "remark",
      submission.remark
    );

    if (selectedFile) {

      formData.append(
        "file",
        selectedFile
      );

    }

    const response =
      await apiService.updateSubmission(
        id,
        formData
      );

    if (response.data.status === 0) {

      alert(
        "Submission details updated successfully"
      );

      // Alert closes only after clicking OK.
      // Then the page will reload.
      window.location.reload();

    } else {

      alert(
        response.data.message
      );

    }

  } catch (error) {

    console.log(error);

    alert(
      "Failed to update submission"
    );

  }

};
  if (loading) {

    return (

      <AdminLayout>

        <div className="text-center mt-10 text-xl">

          Loading...

        </div>

      </AdminLayout>

    );

  }


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

        Edit Submission

      </h1>


      <div className="

        bg-white

        p-8

        rounded-3xl

        shadow-md

      ">


        <form

          onSubmit={handleSubmit}

          className="

            grid

            grid-cols-1

            md:grid-cols-2

            gap-6

          "

        >


          {/* =========================
              ASSIGNMENT
          ========================== */}

          <div>

            <label className="font-semibold">

              Assignment

            </label>


            <select

              name="assignmentId"

              value={

                submission.assignmentId

              }

              onChange={

                handleChange

              }

              className="

                w-full

                border

                p-3

                rounded-xl

                mt-2

              "

              required

            >

              <option value="">

                Select Assignment

              </option>


              {assignments.map(

                (assignment) => (

                  <option

                    key={

                      assignment.id

                    }

                    value={

                      assignment.id

                    }

                  >

                    {assignment.title}

                  </option>

                )

              )}

            </select>

          </div>


          {/* =========================
              STUDENT FULL ID
          ========================== */}

          <div>

            <label className="font-semibold">

              Student Full ID

            </label>


            <input

              type="text"

              name="studentFullId"

              value={

                submission.studentFullId

              }

              onChange={

                handleChange

              }

              className="

                w-full

                border

                p-3

                rounded-xl

                mt-2

              "

              required

            />

          </div>


          {/* =========================
              REMARK
          ========================== */}

          <div className="md:col-span-2">

            <label className="font-semibold">

              Remark

            </label>


            <textarea

              name="remark"

              rows="4"

              value={

                submission.remark

              }

              onChange={

                handleChange

              }

              className="

                w-full

                border

                p-3

                rounded-xl

                mt-2

              "

              placeholder="Enter remark"

            />

          </div>


          {/* =========================
              FILE
          ========================== */}

          <div className="md:col-span-2">

            <label className="font-semibold">

              Upload New File

            </label>


            <input

              type="file"

              onChange={

                handleFileChange

              }

              className="

                w-full

                border

                p-3

                rounded-xl

                mt-2

              "

              accept="

                .jpg,

                .jpeg,

                .png,

                .pdf,

                .doc,

                .docx

              "

            />


            {selectedFile && (

              <p className="

                mt-2

                text-green-600

              ">

                Selected File:

                {" "}

                {selectedFile.name}

              </p>

            )}

          </div>


          {/* =========================
              UPDATE BUTTON
          ========================== */}

          <div className="md:col-span-2">

            <button

              type="submit"

              className="

                bg-yellow-500

                hover:bg-yellow-600

                text-white

                px-6 py-3

                rounded-xl

              "

            >

              Update Submission

            </button>

          </div>


        </form>

      </div>


    </AdminLayout>

  );

}


export default EditSubmission;