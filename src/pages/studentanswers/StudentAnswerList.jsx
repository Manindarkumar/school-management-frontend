import { useState, useEffect } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFileSignature
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";

import apiService from "../../api/apiService";


function StudentAnswerList() {


  const navigate = useNavigate();


  const [answers, setAnswers] =
    useState([]);


  const [loading, setLoading] =
    useState(false);


  const [search, setSearch] =
    useState("");


  const [currentPage, setCurrentPage] =
    useState(1);


  const itemsPerPage = 5;



  useEffect(() => {

    loadStudentAnswers();

  }, []);



  const loadStudentAnswers = async () => {


    try {


      setLoading(true);


      const response =
        await apiService.getAllStudentAnswers();



      if(response.data.status === 0){


        setAnswers(
          response.data.data
        );


      }


    } catch(error){


      console.error(
        "Student Answer Error:",
        error.response?.data || error
      );


    } finally {


      setLoading(false);


    }


  };



  // Search

  const filteredAnswers =
    answers.filter((item) =>


      item.studentName
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )


    );



  // Pagination

  const lastIndex =
    currentPage * itemsPerPage;


  const firstIndex =
    lastIndex - itemsPerPage;



  const currentAnswers =
    filteredAnswers.slice(
      firstIndex,
      lastIndex
    );


  const totalPages =
    Math.ceil(
      filteredAnswers.length /
      itemsPerPage
    );



  // Delete

const deleteAnswer = async (id) => {

  const confirmDelete =
    window.confirm(
      "Do u want to delete this answer?"
    );


  if(!confirmDelete){
    return;
  }


  try {


    const response =
      await apiService.deleteStudentAnswer(id);



    if(response.data.status === 0){


      alert(
        response.data.message
      );


      // remove from UI

      setAnswers(

        answers.filter(
          (item)=> item.id !== id
        )

      );


    }
    else{


      alert(
        response.data.message
      );


    }



  } catch(error){


    console.error(
      "Delete Answer Error:",
      error.response?.data || error
    );


    alert(
      "Failed to delete answer"
    );


  }


};



  return (

    <AdminLayout>

            {/* Header */}

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


          <FaFileSignature
            className="
              text-3xl
              text-blue-600
            "
          />


          <h1 className="
            text-4xl
            font-bold
          ">
            Student Answers
          </h1>


        </div>



        <div className="
          flex
          flex-col
          sm:flex-row
          gap-4
        ">


          {/* Search */}

          <div className="
            flex
            items-center
            bg-white
            px-4
            rounded-xl
            shadow-md
          ">


            <FaSearch className="text-gray-400"/>


            <input

              type="text"

              placeholder="Search Student..."

              value={search}

              onChange={(e)=>
                setSearch(e.target.value)
              }

              className="
                p-3
                outline-none
              "

            />


          </div>



          {/* Add */}

          <Link to="/admin/student-answers/add">


            <button
              className="
                bg-blue-600
                text-white
                px-5 py-3
                rounded-xl
              "
            >
              + Add Answer
            </button>


          </Link>


        </div>


      </div>




      {/* Table */}


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
                STUDENT
              </th>


              <th className="p-5 text-left">
                QUESTION
              </th>


              <th className="p-5 text-left">
                ASSIGNMENT
              </th>


              <th className="p-5 text-left">
                MARKS
              </th>


              <th className="p-5 text-left">
                STATUS
              </th>


              <th className="p-5 text-left">
                ACTION
              </th>


            </tr>


          </thead>



          <tbody>


          {
            loading ? (

              <tr>

                <td
                  colSpan="7"
                  className="
                    text-center
                    p-10
                  "
                >
                  Loading...
                </td>

              </tr>


            ) :


            currentAnswers.length > 0 ? (


              currentAnswers.map((item)=>(


                <tr

                  key={item.id}

                  className="
                    border-t
                    hover:bg-gray-50
                  "

                >


                  <td className="p-5">

                    {item.id}

                  </td>



                  <td className="
                    p-5
                    font-semibold
                  ">

                    {item.studentName}

                  </td>



                  <td className="p-5">

                    {item.question}

                  </td>



                  <td className="p-5">

                    {item.assignmentName}

                  </td>



                  <td className="p-5">

                    {item.obtainedMarks}

                  </td>

                                    <td className="p-5">


                    <span className={`
                      px-4 py-2
                      rounded-full
                      text-sm
                      font-semibold


                      ${
                        item.status === "SUBMITTED"
                        ? "bg-blue-100 text-blue-700"
                        :
                        item.status === "CHECKED"
                        ? "bg-green-100 text-green-700"
                        :
                        "bg-yellow-100 text-yellow-700"
                      }

                    `}>


                      {item.status}


                    </span>


                  </td>



                  <td className="p-5">


                    <div className="
                      flex
                      gap-3
                    ">


                      <Link
                        to={`/admin/student-answers/details/${item.id}`}
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



                      <Link
                        to={`/admin/student-answers/edit/${item.id}`}
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



                      <button

                        onClick={() =>
                          deleteAnswer(item.id)
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

                  colSpan="7"

                  className="
                    text-center
                    p-10
                  "

                >

                  No Data Found


                </td>


              </tr>


            )

          }


          </tbody>


        </table>



        {/* Pagination */}


        <div className="
          flex
          justify-end
          items-center
          gap-2
          p-5
          flex-wrap
        ">


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
              px-4 py-2
              rounded-lg
            "

          >

            Previous

          </button>



          {
            [...Array(totalPages)]
            .map((_, index)=>(


              <button

                key={index}

                onClick={() =>
                  setCurrentPage(
                    index + 1
                  )
                }

                className={`

                  px-4 py-2

                  rounded-lg


                  ${
                    currentPage === index + 1

                    ? "bg-blue-600 text-white"

                    : "bg-gray-200"

                  }

                `}

              >

                {index + 1}

              </button>


            ))
          }



          <button

            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }

            disabled={
              currentPage === totalPages
            }

            className="
              bg-blue-600
              text-white
              px-4 py-2
              rounded-lg
            "

          >

            Next

          </button>


        </div>


      </div>


    </AdminLayout>

  );


}


export default StudentAnswerList;