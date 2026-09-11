import { useEffect, useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaChalkboardTeacher
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function TeacherCourseList() {

  const navigate = useNavigate();

  const [teacherCourses, setTeacherCourses] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const itemsPerPage = 5;


  // =========================
  // FETCH TEACHER COURSES
  // =========================

  useEffect(() => {

    fetchTeacherCourses();

  }, []);


  const fetchTeacherCourses = async () => {

    try {

      setLoading(true);

      const response =
        await apiService.getAllTeacherCourses();

      console.log(
        "Teacher Course Response:",
        response.data
      );


      if (response.data.status === 0) {

        setTeacherCourses(
          response.data.data
        );

      } else {

        alert(
          response.data.message
        );

      }

    } catch (error) {

      console.error(
        "Error fetching teacher courses:",
        error
      );

      alert(
        "Failed to fetch teacher courses"
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // SEARCH
  // =========================

  const filteredTeacherCourses =
    teacherCourses.filter((item) => {

      const teacherName =
        item.teacherName || "";

      const courseName =
        item.courseName || "";

      return (

        teacherName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        courseName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      );

    });


  // =========================
  // PAGINATION
  // =========================

  const lastIndex =
    currentPage * itemsPerPage;

  const firstIndex =
    lastIndex - itemsPerPage;

  const currentTeacherCourses =
    filteredTeacherCourses.slice(
      firstIndex,
      lastIndex
    );

  const totalPages =
    Math.ceil(
      filteredTeacherCourses.length /
      itemsPerPage
    );


  // =========================
  // DELETE
  // =========================

  const deleteTeacherCourse = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this teacher course assignment?"
      );

    if (!confirmDelete) {

      return;

    }


    try {

      /*
        Add your delete API here.

        Example:

        await apiService.deleteTeacherCourse(id);
      */


      // Temporary UI remove
      setTeacherCourses(

        teacherCourses.filter(

          (item) =>
            item.id !== id

        )

      );


      alert(
        "Teacher course deleted successfully"
      );


    } catch (error) {

      console.error(
        "Delete error:",
        error
      );

      alert(
        "Failed to delete teacher course"
      );

    }

  };


  return (

    <AdminLayout>


      {/* ================= HEADER ================= */}

      <div className="
        flex
        flex-col
        md:flex-row
        justify-between
        md:items-center
        gap-5
        mb-8
      ">


        <div className="
          flex
          items-center
          gap-3
        ">

          <FaChalkboardTeacher
            className="
              text-3xl
              text-blue-600
            "
          />

          <h1 className="
            text-4xl
            font-bold
          ">

            Teacher Courses

          </h1>

        </div>


        <div className="
          flex
          flex-col
          sm:flex-row
          gap-4
        ">


          {/* SEARCH */}

          <div className="
            flex
            items-center
            bg-white
            px-4
            rounded-xl
            shadow-md
          ">

            <FaSearch
              className="
                text-gray-400
              "
            />

            <input

              type="text"

              placeholder="
                Search Teacher or Course...
              "

              value={
                search
              }

              onChange={(e) => {

                setSearch(
                  e.target.value
                );

                setCurrentPage(
                  1
                );

              }}

              className="
                p-3
                outline-none
              "

            />

          </div>


          {/* ADD */}

          <Link
            to="/admin/teacherCourse/add"
          >

            <button
              className="
                bg-blue-600
                text-white
                px-5
                py-3
                rounded-xl
              "
            >

              + Assign Course

            </button>

          </Link>

        </div>

      </div>


      {/* ================= TABLE ================= */}

      <div className="
        bg-white
        rounded-3xl
        shadow-md
        overflow-auto
      ">


        <table
          className="
            w-full
          "
        >


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

                TEACHER

              </th>


              <th
                className="
                  p-5
                  text-left
                "
              >

                COURSE

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


          <tbody>


            {/* LOADING */}

            {loading && (

              <tr>

                <td
                  colSpan="4"
                  className="
                    text-center
                    p-10
                  "
                >

                  Loading...

                </td>

              </tr>

            )}


            {/* DATA */}

            {!loading &&

              currentTeacherCourses.length > 0 &&

              currentTeacherCourses.map(

                (item) => (

                  <tr

                    key={
                      item.id
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
                        item.id
                      }

                    </td>


                    {/* TEACHER */}

                    <td
                      className="
                        p-5
                        font-semibold
                      "
                    >

                      {
                        item.teacherName
                      }

                    </td>


                    {/* COURSE */}

                    <td
                      className="
                        p-5
                      "
                    >

                      {
                        item.courseName
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
                          to={`/teacher-course-details/${item.id}`}
                        >

                          <button
                            className="
                              bg-blue-600
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
                          to={`/edit-teacher-course/${item.id}`}
                        >

                          <button
                            className="
                              bg-yellow-500
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

                            deleteTeacherCourse(
                              item.id
                            )

                          }

                          className="
                            bg-red-600
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

              currentTeacherCourses.length === 0 &&

              (

                <tr>

                  <td

                    colSpan="4"

                    className="
                      text-center
                      p-10
                    "

                  >

                    No Teacher Courses Found

                  </td>

                </tr>

              )

            }


          </tbody>

        </table>


        {/* ================= PAGINATION ================= */}

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


            {/* PREVIOUS */}

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


            {/* PAGE NUMBERS */}

            {[...Array(totalPages)].map(

              (_, index) => (

                <button

                  key={
                    index
                  }

                  onClick={() =>

                    setCurrentPage(
                      index + 1
                    )

                  }

                  className={`

                    px-4
                    py-2
                    rounded-lg

                    ${
                      currentPage ===
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


            {/* NEXT */}

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


export default TeacherCourseList;