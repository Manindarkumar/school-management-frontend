import { useState, useEffect } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import apiService from "../../api/apiService";


function EditStudentAnswer() {


  const navigate = useNavigate();

  const { id } = useParams();


  const [loading, setLoading] = useState(false);


  const [assignments, setAssignments] = useState([]);

  const [questions, setQuestions] = useState([]);



  const [answer, setAnswer] = useState({

    assignmentId: "",

    questionId: "",

    answerText: ""

  });



  useEffect(() => {

    loadAssignments();

    loadQuestions();

    loadAnswer();

  }, []);



  // =========================
  // Get All Assignments
  // =========================

  const loadAssignments = async () => {

    try {

      const response =
        await apiService.getAllAssignments();


      if(response.data.status === 0){

        setAssignments(response.data.data);

      }


    } catch(error){

      console.error(error);

    }

  };




  // =========================
  // Get All Questions
  // =========================

  const loadQuestions = async () => {

    try {

      const response =
        await apiService.getAllQuestions();


      if(response.data.status === 0){

        setQuestions(response.data.data);

      }


    } catch(error){

      console.error(error);

    }

  };





  // =========================
  // Get Existing Answer
  // =========================

  const loadAnswer = async () => {

    try {

        const response =
            await apiService.getStudentAnswerById(id);


        if(response.data.status === 0){

            const data = response.data.data;


            setAnswer({

                assignmentId: String(data.assignmentId),

                questionId: String(data.questionId),

                answerText: data.answer || ""

            });


        }


    } catch(error){

        console.error(
            "Load Answer Error:",
            error
        );



    }

  };






  const handleChange = (e) => {


    setAnswer({

      ...answer,

      [e.target.name]:
        e.target.value

    });


  };






  const handleSubmit = async (e) => {


    e.preventDefault();


    try {


      setLoading(true);



      const response =
        await apiService.updateStudentAnswer(
          id,
          answer
        );



      if(response.data.status === 0){


        alert(response.data.message);


        navigate(
          "/admin/student-answers"
        );


      }



    } catch(error){


      console.error(
        "Update Error",
        error.response?.data || error
      );


      alert(
        "Failed to update answer"
      );


    } finally {


      setLoading(false);


    }


  };






  return (

    <AdminLayout>


      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 px-5 py-2 rounded-xl mb-6"
      >

        ← Back

      </button>



      <h1 className="text-4xl font-bold mb-8">

        Edit Student Answer

      </h1>





      <div className="bg-white p-8 rounded-3xl shadow-md">



        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >





          {/* Assignment Dropdown */}

          <div>


            <label className="block font-semibold mb-2">

              Assignment

            </label>



            <select

              name="assignmentId"

              value={answer.assignmentId}

              onChange={handleChange}

              className="w-full border p-3 rounded-xl"

            >


              <option value="">

                Select Assignment

              </option>



              {

                assignments.map((item)=>(


                  <option

                    key={item.id}

                    value={item.id}

                  >

                    {item.title}

                  </option>


                ))

              }


            </select>



          </div>







          {/* Question Dropdown */}


          <div>


            <label className="block font-semibold mb-2">

              Question

            </label>




            <select

              name="questionId"

              value={answer.questionId}

              onChange={handleChange}

              className="w-full border p-3 rounded-xl"

            >


              <option value="">

                Select Question

              </option>



              {

                questions.map((item)=>(


                  <option

                    key={item.id}

                    value={item.id}

                  >

                    {item.questionText}

                  </option>


                ))

              }


            </select>



          </div>








          {/* Answer */}


          <div className="md:col-span-2">


            <label className="block font-semibold mb-2">

              Student Answer

            </label>




            <textarea

              rows="6"

              name="answerText"

              value={answer.answerText}

              onChange={handleChange}

              className="w-full border p-3 rounded-xl"

            />


          </div>







          <div className="md:col-span-2">


            <button

              type="submit"

              disabled={loading}

              className="bg-blue-600 text-white px-6 py-3 rounded-xl"

            >

              {
                loading
                ?
                "Updating..."
                :
                "Update Answer"
              }


            </button>


          </div>



        </form>


      </div>



    </AdminLayout>

  );

}


export default EditStudentAnswer;