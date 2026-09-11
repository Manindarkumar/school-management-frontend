import { useState, useEffect } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";


import {
  FaFileSignature,
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaCheckCircle
} from "react-icons/fa";


import AdminLayout
from "../../layouts/AdminLayout";


import apiService
from "../../api/apiService";



function StudentAnswerDetails() {


  const navigate = useNavigate();


  const { id } = useParams();



  const [answer, setAnswer] =
    useState(null);



  useEffect(() => {

    loadAnswerDetails();

  }, []);



  const loadAnswerDetails = async () => {


    try {


      const response =
        await apiService.getStudentAnswerById(id);



      if(response.data.status === 0){


        setAnswer(
          response.data.data
        );


      }


    } catch(error){


      console.error(
        "Student Answer Details Error:",
        error.response?.data || error
      );


    }


  };



  if(!answer){


    return (

      <AdminLayout>


        <h2 className="
          text-2xl
          font-bold
        ">
          Loading...
        </h2>


      </AdminLayout>

    );


  }



  return (

    <AdminLayout>


      <button

        onClick={() => navigate(-1)}

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



      <div className="
        flex
        items-center
        gap-3
        mb-8
      ">


        <FaFileSignature
          className="
            text-4xl
            text-blue-600
          "
        />


        <h1 className="
          text-4xl
          font-bold
        ">

          Student Answer Details

        </h1>


      </div>
            <div className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
      ">


        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-8
        ">


          {/* Student */}

          <div>


            <p className="
              text-gray-500
              mb-2
            ">

              Student Name

            </p>



            <h2 className="
              text-xl
              font-semibold
              flex
              items-center
              gap-2
            ">


              <FaUserGraduate />


              {answer.studentName}


            </h2>


          </div>




          {/* Assignment */}


          <div>


            <p className="
              text-gray-500
              mb-2
            ">

              Assignment

            </p>



            <h2 className="
              text-xl
              font-semibold
              flex
              items-center
              gap-2
            ">


              <FaBook />


              {answer.assignmentName}


            </h2>


          </div>





          {/* Answer Type */}


          <div>


            <p className="
              text-gray-500
              mb-2
            ">

              Answer Type

            </p>



            <h2 className="
              text-xl
              font-semibold
              flex
              items-center
              gap-2
            ">


              <FaClipboardList />


              Answer


            </h2>


          </div>





          {/* Marks */}


          <div>


            <p className="
              text-gray-500
              mb-2
            ">

              Obtained Marks

            </p>



            <h2 className="
              text-xl
              font-semibold
            ">


              {answer.obtainedMarks}


            </h2>


          </div>





          {/* Status */}


          <div>


            <p className="
              text-gray-500
              mb-2
            ">

              Status

            </p>



            <span className="
              bg-blue-100
              text-blue-700
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
              inline-flex
              items-center
              gap-2
            ">


              <FaCheckCircle />


              {answer.status}


            </span>


          </div>

                    {/* Question */}


          <div className="
            md:col-span-2
          ">


            <p className="
              text-gray-500
              mb-2
            ">

              Question

            </p>



            <div className="
              bg-gray-100
              p-5
              rounded-2xl
            ">


              <p className="
                text-lg
              ">

                {answer.question}


              </p>


            </div>


          </div>





          {/* Student Answer */}


          <div className="
            md:col-span-2
          ">


            <p className="
              text-gray-500
              mb-2
            ">

              Student Answer

            </p>



            <div className="
              bg-blue-50
              p-5
              rounded-2xl
            ">


              <p className="
                text-lg
                leading-8
              ">


                {answer.answer}


              </p>


            </div>


          </div>





          {/* Teacher Remark */}


          <div className="
            md:col-span-2
          ">


            <p className="
              text-gray-500
              mb-2
            ">

              Teacher Remark

            </p>



            <div className="
              bg-yellow-50
              p-5
              rounded-2xl
            ">


              <p className="text-lg">


                {
                  answer.teacherRemark
                  ?
                  answer.teacherRemark
                  :
                  "No remark added"
                }


              </p>


            </div>


          </div>



        </div>


      </div>


    </AdminLayout>


  );


}


export default StudentAnswerDetails;