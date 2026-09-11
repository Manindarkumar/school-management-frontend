import { useEffect, useState } from "react";

import {
  Link
} from "react-router-dom";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFileUpload
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";


function SubmissionList() {

  const [submissions, setSubmissions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;


  /*
  ============================
  FETCH ALL SUBMISSIONS
  ============================
  */

  useEffect(() => {

    fetchSubmissions();

  }, []);


  const fetchSubmissions = async () => {

    try {

      setLoading(true);

      setError("");

      const response =
        await apiService.getAllSubmissions();

      if (
        response.data.status === 0
      ) {

        setSubmissions(
          response.data.data || []
        );

      } else {

        setSubmissions([]);

        setError(
          response.data.message ||
          "No submissions found"
        );

      }

    } catch (error) {

      console.error(
        "Error fetching submissions:",
        error
      );

      setError(
        "Failed to load submissions"
      );

      setSubmissions([]);

    } finally {

      setLoading(false);

    }

  };


  /*
  ============================
  SEARCH
  ============================
  */

  const filteredSubmissions =
    submissions.filter(
      (submission) => {

        const searchText =
          search.toLowerCase();

        return (

          (submission.studentName || "")
            .toLowerCase()
            .includes(searchText)

          ||

          (submission.studentId || "")
            .toLowerCase()
            .includes(searchText)

          ||

          (submission.title || "")
            .toLowerCase()
            .includes(searchText)

          ||

          (submission.subject || "")
            .toLowerCase()
            .includes(searchText)

          ||

          (submission.teacherName || "")
            .toLowerCase()
            .includes(searchText)

        );

      }
    );


  /*
  ============================
  PAGINATION
  ============================
  */

  const totalPages =
    Math.ceil(
      filteredSubmissions.length /
      itemsPerPage
    );


  const lastIndex =
    currentPage *
    itemsPerPage;


  const firstIndex =
    lastIndex -
    itemsPerPage;


  const currentSubmissions =
    filteredSubmissions.slice(
      firstIndex,
      lastIndex
    );


  /*
  ============================
  RESET PAGE ON SEARCH
  ============================
  */

  const handleSearch = (e) => {

    setSearch(
      e.target.value
    );

    setCurrentPage(1);

  };


  /*
  ============================
  DELETE SUBMISSION
  ============================
  */

  const deleteSubmission =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this submission?"
        );


      if (!confirmDelete) {

        return;

      }


      try {

        /*
        IMPORTANT:
        Replace this API method
        with your actual delete API
        */

        const response =
          await apiService
            .deleteSubmission(id);


        if (
          response.data.status === 0
        ) {

          alert(
            response.data.message
          );


          setSubmissions(

            submissions.filter(
              (submission) =>
                submission.id !== id
            )

          );

        } else {

          alert(
            response.data.message
          );

        }

      } catch (error) {

        console.error(
          "Delete error:",
          error
        );

        alert(
          "Failed to delete submission"
        );

      }

    };


  return (

    <AdminLayout>


      {/* =========================
          HEADER
      ========================= */}

      <div
        className="
          flex
          flex-col
          md:flex-row
          justify-between
          md:items-center
          gap-5
          mb-8
        "
      >


        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <FaFileUpload
            className="
              text-3xl
              text-blue-600
            "
          />


          <h1
            className="
              text-4xl
              font-bold
            "
          >

            Submissions

          </h1>

        </div>


        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-4
          "
        >


          {/* SEARCH */}

          <div
            className="
              flex
              items-center
              bg-white
              px-4
              rounded-xl
              shadow-md
            "
          >

            <FaSearch
              className="
                text-gray-400
              "
            />


            <input
              type="text"
              placeholder="
                Search by student,
                assignment or subject...
              "
              value={search}
              onChange={handleSearch}
              className="
                p-3
                outline-none
                w-72
              "
            />

          </div>


          {/* ADD SUBMISSION */}

          <Link
            to="/admin/submissions/add"
          >

            <button
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-3
                rounded-xl
              "
            >

              + Add Submission

            </button>

          </Link>

        </div>

      </div>


      {/* =========================
          TABLE
      ========================= */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-md
          overflow-auto
        "
      >

        <table
          className="
            w-full
            min-w-[1200px]
          "
        >


          {/* TABLE HEADER */}

          <thead
            className="
              bg-gray-100
              text-gray-600
            "
          >

            <tr>

              <th
                className="
                  p-5
                  text-left
                "
              >
                ID
              </th>


              <th
                className="
                  p-5
                  text-left
                "
              >
                STUDENT
              </th>


              <th
                className="
                  p-5
                  text-left
                "
              >
                STUDENT ID
              </th>


              <th
                className="
                  p-5
                  text-left
                "
              >
                ASSIGNMENT
              </th>


              <th
                className="
                  p-5
                  text-left
                "
              >
                SUBJECT
              </th>


              <th
                className="
                  p-5
                  text-left
                "
              >
                TEACHER
              </th>


              <th
                className="
                  p-5
                  text-left
                "
              >
                DUE DATE
              </th>


              <th
                className="
                  p-5
                  text-left
                "
              >
                MARKS
              </th>


              <th
                className="
                  p-5
                  text-left
                "
              >
                FILE
              </th>


              <th
                className="
                  p-5
                  text-left
                "
              >
                ACTION
              </th>

            </tr>

          </thead>


          {/* TABLE BODY */}

          <tbody>


            {/* LOADING */}

            {loading && (

              <tr>

                <td
                  colSpan="10"
                  className="
                    text-center
                    p-10
                    text-lg
                  "
                >

                  Loading submissions...

                </td>

              </tr>

            )}


            {/* ERROR */}

            {!loading &&
              error && (

                <tr>

                  <td
                    colSpan="10"
                    className="
                      text-center
                      p-10
                      text-red-600
                    "
                  >

                    {error}

                  </td>

                </tr>

              )}


            {/* DATA */}

            {!loading &&
              !error &&
              currentSubmissions.length >
              0 &&

              currentSubmissions.map(
                (submission) => (

                  <tr
                    key={
                      submission.id
                    }
                    className="
                      border-t
                      hover:bg-gray-50
                    "
                  >


                    {/* ID */}

                    <td
                      className="
                        p-5
                      "
                    >

                      {
                        submission.id
                      }

                    </td>


                    {/* STUDENT */}

                    <td
                      className="
                        p-5
                        font-semibold
                      "
                    >

                      {
                        submission.studentName ||
                        "N/A"
                      }

                    </td>


                    {/* STUDENT ID */}

                    <td
                      className="
                        p-5
                      "
                    >

                      {
                        submission.studentId ||
                        "N/A"
                      }

                    </td>


                    {/* ASSIGNMENT */}

                    <td
                      className="
                        p-5
                      "
                    >

                      {
                        submission.title
                      }

                    </td>


                    {/* SUBJECT */}

                    <td
                      className="
                        p-5
                      "
                    >

                      {
                        submission.subject ||
                        "N/A"
                      }

                    </td>


                    {/* TEACHER */}

                    <td
                      className="
                        p-5
                      "
                    >

                      {
                        submission.teacherName ||
                        "N/A"
                      }

                    </td>


                    {/* DUE DATE */}

                    <td
                      className="
                        p-5
                      "
                    >

                      {
                        submission.dueDate
                      }

                    </td>


                    {/* MARKS */}

                    <td
                      className="
                        p-5
                      "
                    >

                      {

                        submission.marks !==
                          null

                          ? submission.marks

                          : (

                            <span
                              className="
                                text-gray-400
                              "
                            >

                              Not Evaluated

                            </span>

                          )

                      }

                    </td>


                    {/* FILE */}

                    <td
                      className="
                        p-5
                      "
                    >

                      {

                        submission.fileName

                          ? (

                            <div>

                              <p
                                className="
                                  font-semibold
                                "
                              >

                                {
                                  submission.fileName
                                }

                              </p>


                              <p
                                className="
                                  text-xs
                                  text-gray-500
                                "
                              >

                                {
                                  submission.fileType
                                }

                              </p>

                            </div>

                          )

                          : (

                            <span
                              className="
                                text-gray-400
                              "
                            >

                              No File

                            </span>

                          )

                      }

                    </td>


                    {/* ACTION */}

                    <td
                      className="
                        p-5
                      "
                    >

                      <div
                        className="
                          flex
                          gap-3
                        "
                      >


                        {/* VIEW */}

                        <Link
                          to={
                            `/admin/submissions/details/${submission.id}`
                          }
                        >

                          <button
                            className="
                              bg-blue-600
                              hover:bg-blue-700
                              text-white
                              p-3
                              rounded-lg
                            "
                          >

                            <FaEye />

                          </button>

                        </Link>


                        {/* EDIT */}

                        <Link
                          to={
                            `/admin/submissions/edit/${submission.id}`
                          }
                        >

                          <button
                            className="
                              bg-yellow-500
                              hover:bg-yellow-600
                              text-white
                              p-3
                              rounded-lg
                            "
                          >

                            <FaEdit />

                          </button>

                        </Link>


                        {/* DELETE */}

                        <button
                          onClick={() =>
                            deleteSubmission(
                              submission.id
                            )
                          }
                          className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            p-3
                            rounded-lg
                          "
                        >

                          <FaTrash />

                        </button>

                      </div>

                    </td>

                  </tr>

                )

              )


            }


            {/* NO DATA */}

            {!loading &&
              !error &&
              currentSubmissions.length ===
              0 && (

                <tr>

                  <td
                    colSpan="10"
                    className="
                      text-center
                      p-10
                    "
                  >

                    No Submissions Found

                  </td>

                </tr>

              )}

          </tbody>

        </table>


        {/* =========================
            PAGINATION
        ========================= */}

        {totalPages > 0 && (

          <div
            className="
              flex
              justify-end
              items-center
              gap-2
              p-5
              flex-wrap
            "
          >


            <button
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
              disabled={
                currentPage === 1
              }
              className="
                bg-gray-200
                px-4
                py-2
                rounded-lg
                disabled:opacity-50
              "
            >

              Previous

            </button>


            {[

              ...Array(totalPages)

            ].map(
              (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(
                      index + 1
                    )
                  }
                  className={`

                    px-4
                    py-2
                    rounded-lg

                    ${currentPage ===
                      index + 1

                      ? "bg-blue-600 text-white"

                      : "bg-gray-200"

                    }

                  `}
                >

                  {
                    index + 1
                  }

                </button>

              )
            )}


            <button
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
              disabled={
                currentPage ===
                totalPages
              }
              className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded-lg
                disabled:opacity-50
              "
            >

              Next

            </button>

          </div>

        )}

      </div>

    </AdminLayout>

  );

}

export default SubmissionList;