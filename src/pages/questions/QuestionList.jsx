import { useEffect, useState } from "react";

import {
  Link
} from "react-router-dom";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaQuestionCircle
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";

import apiService from "../../api/apiService";


function QuestionList() {


  const [questions, setQuestions] =
    useState([]);


  const [search, setSearch] =
    useState("");


  const [currentPage, setCurrentPage] =
    useState(1);


  const [loading, setLoading] =
    useState(true);


  const itemsPerPage = 5;


  // =========================
  // FETCH ALL QUESTIONS
  // =========================

  useEffect(() => {

    fetchQuestions();

  }, []);


  const fetchQuestions = async () => {

    try {

      setLoading(true);


      const response =
        await apiService.getAllQuestions();


      console.log(
        "Question Response:",
        response.data
      );


      if (

        response.data.status === 0

      ) {

        setQuestions(

          response.data.data

        );

      }


    } catch (error) {

      console.error(

        "Error fetching questions:",

        error

      );

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // SEARCH
  // =========================

  const filteredQuestions =

    questions.filter((item) =>

      item.questionText

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


  const currentQuestions =

    filteredQuestions.slice(

      firstIndex,

      lastIndex

    );


  const totalPages =

    Math.ceil(

      filteredQuestions.length /

      itemsPerPage

    );


  // =========================
  // DELETE QUESTION
  // =========================

  const deleteQuestion = (id) => {


    const confirmDelete =

      window.confirm(

        "Delete this question?"

      );


    if (confirmDelete) {


      // Temporary frontend delete

      setQuestions(

        questions.filter(

          (item) =>

            item.id !== id

        )

      );


    }

  };


  return (


    <AdminLayout>


      {/* =========================
          HEADER
      ========================== */}

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


          <FaQuestionCircle

            className="

              text-3xl

              text-blue-600

            "

          />


          <h1 className="

            text-4xl

            font-bold

          ">


            Questions


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

              placeholder="Search Question..."

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


          {/* ADD QUESTION */}

          <Link

            to="/admin/questions/add"

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


              + Add Question


            </button>


          </Link>


        </div>


      </div>


      {/* =========================
          TABLE
      ========================== */}

      <div className="

        bg-white

        rounded-3xl

        shadow-md

        overflow-auto

      ">


        <table className="w-full">


          <thead className="

            bg-gray-100

            text-gray-600

          ">


            <tr>


              <th className="p-5 text-left">

                ID

              </th>


              <th className="p-5 text-left">

                QUESTION

              </th>


              <th className="p-5 text-left">

                STATUS

              </th>


              <th className="p-5 text-left">

                CREATED BY

              </th>


              <th className="p-5 text-left">

                CREATED AT

              </th>


              <th className="p-5 text-left">

                ACTION

              </th>


            </tr>


          </thead>


          <tbody>


            {loading ? (


              <tr>


                <td

                  colSpan="6"

                  className="

                    text-center

                    p-10

                  "

                >


                  Loading Questions...


                </td>


              </tr>


            ) : currentQuestions.length > 0 ? (


              currentQuestions.map((item) => (


                <tr

                  key={item.id}

                  className="

                    border-t

                    hover:bg-gray-50

                  "

                >


                  {/* ID */}

                  <td className="p-5">


                    {item.id}


                  </td>


                  {/* QUESTION */}

                  <td className="

                    p-5

                    font-semibold

                  ">


                    {item.questionText}


                  </td>


                  {/* STATUS */}

                  <td className="p-5">


                    <span

                      className={`

                        px-4

                        py-2

                        rounded-full

                        text-sm

                        font-semibold

                        ${

                          item.status ===

                          "ACTIVE"

                            ? "bg-green-100 text-green-700"

                            : "bg-yellow-100 text-yellow-700"

                        }

                      `}

                    >


                      {item.status}


                    </span>


                  </td>


                  {/* CREATED BY */}

                  <td className="p-5">


                    <div>


                      <p className="

                        font-semibold

                      ">


                        {item.createdBy

                          ?.username}


                      </p>


                      <p className="

                        text-sm

                        text-gray-500

                      ">


                        {item.createdBy

                          ?.role}


                      </p>


                    </div>


                  </td>


                  {/* CREATED AT */}

                  <td className="p-5">


                    {item.createdAt

                      ? new Date(

                          item.createdAt

                        ).toLocaleString()

                      : "-"}


                  </td>


                  {/* ACTION */}

                  <td className="p-5">


                    <div className="

                      flex

                      gap-3

                    ">


                      {/* VIEW */}

                      <Link

                        to={`/admin/questions/view/${item.id}`}

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

                        to={`/admin/questions/edit/${item.id}`}

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

                          deleteQuestion(

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


              ))


            ) : (


              <tr>


                <td

                  colSpan="6"

                  className="

                    text-center

                    p-10

                  "

                >


                  No Questions Found


                </td>


              </tr>


            )}


          </tbody>


        </table>


        {/* =========================
            PAGINATION
        ========================== */}

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


export default QuestionList;