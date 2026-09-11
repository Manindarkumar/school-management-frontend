import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import apiService from "../../api/apiService";


function EditGrade() {


  const navigate = useNavigate();


  const { id } = useParams();


  const [loading, setLoading] = useState(true);


  const [updating, setUpdating] = useState(false);


  const [grade, setGrade] = useState({

    gradeName: "",

    description: ""

  });


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

        "Grade Details:",

        response.data

      );


      if (

        response.data.status === 0

      ) {


        const data =

          response.data.data;


        setGrade({

          gradeName:

            data.gradeName || "",


          description:

            data.description || ""

        });


      } else {


        alert(

          response.data.message

        );

      }


    } catch (error) {


      console.error(

        "Fetch grade error:",

        error

      );


      alert(

        error.response?.data?.message ||

        "Failed to load grade details"

      );


    } finally {


      setLoading(false);

    }

  };


  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {


    setGrade({

      ...grade,

      [e.target.name]:

        e.target.value

    });

  };


  // =========================
  // UPDATE GRADE
  // =========================

  const handleSubmit = async (e) => {


    e.preventDefault();


    try {


      setUpdating(true);


      const payload = {


        gradeName:

          grade.gradeName,


        description:

          grade.description

      };


      const response =

        await apiService.updateGrade(

          id,

          payload

        );


      console.log(

        "Update Response:",

        response.data

      );


      if (

        response.data.status === 0

      ) {


        alert(

          response.data.message

        );


        // After clicking OK,

        // reload the page

        window.location.reload();


      } else {


        alert(

          response.data.message

        );

      }


    } catch (error) {


      console.error(

        "Update grade error:",

        error

      );


      alert(

        error.response?.data?.message ||

        "Failed to update grade"

      );


    } finally {


      setUpdating(false);

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


          Loading Grade...


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


        Edit Grade


      </h1>


      {/* FORM CARD */}


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

            gap-6

          "

        >


          {/* GRADE NAME */}


          <div>


            <label className="

              font-semibold

            ">


              Grade Name


            </label>


            <input

              type="text"

              name="gradeName"

              value={

                grade.gradeName

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

              placeholder="Enter Grade Name"

              required

            />


          </div>


          {/* DESCRIPTION */}


          <div>


            <label className="

              font-semibold

            ">


              Description


            </label>


            <textarea

              name="description"

              rows="5"

              value={

                grade.description

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

              placeholder="Enter Description"

              required

            />


          </div>


          {/* UPDATE BUTTON */}


          <div>


            <button

              type="submit"

              disabled={updating}

              className="

                bg-yellow-500

                hover:bg-yellow-600

                disabled:bg-gray-400

                text-white

                px-6

                py-3

                rounded-xl

              "

            >


              {updating

                ? "Updating..."

                : "Update Grade"

              }


            </button>


          </div>


        </form>


      </div>


    </AdminLayout>

  );

}


export default EditGrade;