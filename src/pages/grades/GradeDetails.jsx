import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import apiService from "../../api/apiService";


function GradeDetails() {


  const navigate = useNavigate();


  const { id } = useParams();


  const [grade, setGrade] = useState(null);


  const [loading, setLoading] = useState(true);


  // =========================
  // FETCH GRADE DETAILS
  // =========================

  useEffect(() => {

    fetchGradeDetails();

  }, [id]);


  const fetchGradeDetails = async () => {


    try {


      const response =

        await apiService.getGradeById(id);


      console.log(

        "Grade Details Response:",

        response.data

      );


      if (

        response.data.status === 0

      ) {


        setGrade(

          response.data.data

        );


      } else {


        alert(

          response.data.message

        );

      }


    } catch (error) {


      console.error(

        "Error fetching grade details:",

        error

      );


      alert(

        error.response?.data?.message ||

        "Failed to fetch grade details"

      );


    } finally {


      setLoading(false);


    }

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {


    return (

      <AdminLayout>


        <div className="

          text-center

          mt-10

          text-xl

        ">


          Loading Grade Details...


        </div>


      </AdminLayout>

    );

  }


  // =========================
  // NO DATA
  // =========================

  if (!grade) {


    return (

      <AdminLayout>


        <div className="

          text-center

          mt-10

          text-xl

          text-red-500

        ">


          Grade details not found.


        </div>


      </AdminLayout>

    );

  }


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


        Grade Details


      </h1>


      {/* DETAILS CARD */}


      <div className="

        bg-white

        p-8

        rounded-3xl

        shadow-md

        grid

        gap-6

      ">


        {/* ID */}


        <div>


          <p className="

            text-gray-500

          ">


            Grade ID


          </p>


          <h2 className="

            text-xl

            font-semibold

          ">


            {grade.id}


          </h2>


        </div>


        {/* GRADE NAME */}


        <div>


          <p className="

            text-gray-500

          ">


            Grade Name


          </p>


          <h2 className="

            text-xl

            font-semibold

          ">


            {grade.gradeName}


          </h2>


        </div>


        {/* DESCRIPTION */}


        <div>


          <p className="

            text-gray-500

          ">


            Description


          </p>


          <p className="

            text-lg

            text-gray-700

          ">


            {grade.description}


          </p>


        </div>


      </div>


    </AdminLayout>

  );

}


export default GradeDetails;