import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AddSubmission() {

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [submission, setSubmission] = useState({
    assignmentId: "",
    studentFullId: "",
    file: null,
    remark: "",
  });

  const [loading, setLoading] = useState(false);


  // ================= FETCH DATA =================

  useEffect(() => {

    fetchStudents();
    fetchAssignments();

  }, []);


  // ================= FETCH STUDENTS =================

  const fetchStudents = async () => {

    try {

      const response =
        await apiService.getAllSubmissions();

      if (response.data.status === 0) {

        const uniqueStudents = [];

        response.data.data.forEach((item) => {

          if (
            item.studentId &&
            !uniqueStudents.some(
              (student) =>
                student.studentId === item.studentId
            )
          ) {

            uniqueStudents.push({

              studentId: item.studentId,

              studentName:
                item.studentName,

            });

          }

        });

        setStudents(uniqueStudents);

      }

    } catch (error) {

      console.log(
        "Student fetch error:",
        error
      );

    }

  };


  // ================= FETCH ASSIGNMENTS =================

  const fetchAssignments = async () => {

    try {

      const response =
        await apiService.getAllAssignments();

      if (response.data.status === 0) {

        setAssignments(
          response.data.data
        );

      }

    } catch (error) {

      console.log(
        "Assignment fetch error:",
        error
      );

    }

  };


  // ================= HANDLE INPUT =================

  const handleChange = (e) => {

    const {
      name,
      value,
      files
    } = e.target;

    if (name === "file") {

      setSubmission((prev) => ({

        ...prev,

        file: files[0],

      }));

    } else {

      setSubmission((prev) => ({

        ...prev,

        [name]: value,

      }));

    }

  };


  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    const formData = new FormData();

    formData.append(
      "assignmentId",
      Number(submission.assignmentId)
    );

    formData.append(
      "studentFullId",
      submission.studentFullId
    );

    formData.append(
      "remark",
      submission.remark || ""
    );

    formData.append(
      "file",
      submission.file
    );

    const response =
      await apiService.createSubmission(formData);

    console.log(
      "Submission Response:",
      response.data
    );

    if (response.data.status === 0) {

      // Popup will appear
      alert(
        "Submission added successfully"
      );

      // This executes after clicking OK
      window.location.reload();

    } else {

      alert(
        response.data.message
      );

    }

  } catch (error) {

    console.error(
      "Submission error:",
      error.response?.data || error
    );

    alert(
      error.response?.data?.message ||
      "Failed to submit assignment"
    );

  } finally {

    setLoading(false);

  }

};


  return (

    <AdminLayout>


      {/* BACK BUTTON */}

      <button

        onClick={() =>
          navigate(-1)
        }

        className="
          bg-gray-200
          hover:bg-gray-300
          px-5
          py-2
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

        Add Submission

      </h1>


      <div className="
        bg-white
        p-8
        rounded-3xl
        shadow-md
      ">


        <form

          onSubmit={
            handleSubmit
          }

          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "

        >


          {/* ================= ASSIGNMENT ================= */}

          <div>

            <label className="
              font-semibold
            ">

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

                    {
                      assignment.title
                    }

                  </option>

                )

              )}

            </select>

          </div>


          {/* ================= STUDENT ================= */}

          <div>

            <label className="
              font-semibold
            ">

              Student

            </label>


            <select

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

            >

              <option value="">

                Select Student

              </option>


              {students.map(

                (student) => (

                  <option

                    key={
                      student.studentId
                    }

                    value={
                      student.studentId
                    }

                  >

                    {
                      student.studentId
                    }

                    {" - "}

                    {
                      student.studentName
                    }

                  </option>

                )

              )}

            </select>

          </div>


          {/* ================= FILE ================= */}

          <div className="
            md:col-span-2
          ">

            <label className="
              font-semibold
            ">

              Upload Assignment

            </label>


            <input

              type="file"

              name="file"

              accept="
                .pdf,
                .doc,
                .docx,
                .jpg,
                .jpeg,
                .png
              "

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


            {submission.file && (

              <p className="
                text-green-600
                mt-2
              ">

                Selected File:

                <strong>

                  {" "}

                  {
                    submission.file.name
                  }

                </strong>

              </p>

            )}

          </div>


          {/* ================= REMARK ================= */}

          <div className="
            md:col-span-2
          ">

            <label className="
              font-semibold
            ">

              Remark

            </label>


            <textarea

              rows="4"

              name="remark"

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

              placeholder="
                Enter Remark
              "

            />

          </div>


          {/* ================= BUTTON ================= */}

          <div className="
            md:col-span-2
          ">

            <button

              type="submit"

              disabled={
                loading
              }

              className="
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-gray-400
                text-white
                px-6
                py-3
                rounded-xl
              "

            >

              {loading

                ? "Submitting..."

                : "Save Submission"

              }

            </button>

          </div>


        </form>

      </div>

    </AdminLayout>

  );

}


export default AddSubmission;