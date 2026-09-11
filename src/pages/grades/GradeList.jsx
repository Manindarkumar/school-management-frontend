import { useEffect, useState } from "react";

import {
  Link
} from "react-router-dom";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaAward
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";

import apiService from "../../api/apiService";


function GradeList() {


  const [grades, setGrades] =
    useState([]);


  const [search, setSearch] =
    useState("");


  const [currentPage, setCurrentPage] =
    useState(1);


  const [loading, setLoading] =
    useState(true);


  const itemsPerPage = 5;


  // =========================
  // FETCH ALL GRADES
  // =========================

  useEffect(() => {

    fetchGrades();

  }, []);


  const fetchGrades = async () => {

    try {

      setLoading(true);


      const response =
        await apiService.getAllGrades();


      console.log(
        "Grade Response:",
        response.data
      );


      if (
        response.data.status === 0
      ) {

        setGrades(
          response.data.data
        );

      } else {

        setGrades([]);

      }


    } catch (error) {

      console.error(

        "Error fetching grades:",

        error

      );

      alert(

        error.response?.data?.message ||

        "Failed to fetch grades"

      );

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // SEARCH
  // =========================

  const filteredGrades =

    grades.filter((grade) =>

      grade.gradeName

        ?.toLowerCase()

        .includes(

          search.toLowerCase()

        )

    );


  // =========================
  // PAGINATION
  // =========================

  const lastIndex =

    currentPage *

    itemsPerPage;


  const firstIndex =

    lastIndex -

    itemsPerPage;


  const currentGrades =

    filteredGrades.slice(

      firstIndex,

      lastIndex

    );


  const totalPages =

    Math.ceil(

      filteredGrades.length /

      itemsPerPage

    );


  // =========================
  // DELETE GRADE
  // =========================

  const deleteGrade = async (id) => {


    const confirmDelete =

      window.confirm(

        "Delete this grade?"

      );


    if (!confirmDelete) {

      return;

    }


    try {


      const response =

        await apiService.deleteGrade(id);


      if (

        response.data.status === 0

      ) {


        alert(

          response.data.message

        );


        // Reload list after delete

        fetchGrades();


      } else {


        alert(

          response.data.message

        );

      }


    } catch (error) {


      console.error(

        "Delete grade error:",

        error

      );


      alert(

        error.response?.data?.message ||

        "Failed to delete grade"

      );

    }

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {


    return (

      <AdminLayout>


        <div className="

          flex

          justify-center

          items-center

          h-64

          text-xl

        ">


          Loading Grades...


        </div>


      </AdminLayout>

    );

  }


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


        {/* TITLE */}


        <div className="

          flex

          items-center

          gap-3

        ">


          <FaAward

            className="

              text-3xl

              text-blue-600

            "

          />


          <h1 className="

            text-4xl

            font-bold

          ">


            Grades


          </h1>


        </div>


        {/* SEARCH + ADD */}


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

              placeholder="Search Grade..."

              value={search}

              onChange={(e) => {


                setSearch(

                  e.target.value

                );


                setCurrentPage(1);


              }}

              className="

                p-3

                outline-none

              "

            />


          </div>


          {/* ADD GRADE */}


          <Link

            to="/admin/grades/add"

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


              + Add Grade


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


        <table className="

          w-full

        ">


          <thead className="

            bg-gray-100

            text-gray-600

          ">


            <tr>


              <th className="

                p-5

                text-left

              ">


                ID


              </th>


              <th className="

                p-5

                text-left

              ">


                GRADE NAME


              </th>


              <th className="

                p-5

                text-left

              ">


                DESCRIPTION


              </th>


              <th className="

                p-5

                text-left

              ">


                ACTION


              </th>


            </tr>


          </thead>


          <tbody>


            {currentGrades.length > 0 ? (


              currentGrades.map((grade) => (


                <tr

                  key={grade.id}

                  className="

                    border-t

                    hover:bg-gray-50

                  "

                >


                  {/* ID */}


                  <td className="

                    p-5

                  ">


                    {grade.id}


                  </td>


                  {/* GRADE NAME */}


                  <td className="

                    p-5

                    font-semibold

                  ">


                    {grade.gradeName}


                  </td>


                  {/* DESCRIPTION */}


                  <td className="

                    p-5

                    text-gray-600

                  ">


                    {grade.description}


                  </td>


                  {/* ACTION */}


                  <td className="

                    p-5

                  ">


                    <div className="

                      flex

                      gap-3

                    ">


                      {/* VIEW */}


                      <Link

                        to={`/admin/grades/details/${grade.id}`}

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

                        to={`/admin/grades/edit/${grade.id}`}

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

                          deleteGrade(

                            grade.id

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


              ))


            ) : (


              <tr>


                <td

                  colSpan="4"

                  className="

                    text-center

                    p-10

                  "

                >


                  No Grades Found


                </td>


              </tr>


            )}


          </tbody>


        </table>


        {/* ================= PAGINATION ================= */}


        {totalPages > 0 && (


          <div className="

            flex

            justify-end

            items-center

            gap-2

            p-5

            flex-wrap

          ">


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

                    ${

                      currentPage ===

                      index + 1

                        ? "bg-blue-600 text-white"

                        : "bg-gray-200"

                    }

                  `}

                >


                  {index + 1}


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


export default GradeList;