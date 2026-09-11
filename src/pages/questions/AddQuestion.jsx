import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AddQuestion() {

  const navigate = useNavigate();

  const [question, setQuestion] = useState({

    questionText: "",
    status: ""

  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    setQuestion({

      ...question,

      [e.target.name]:
        e.target.value

    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await apiService.createQuestion(
          question
        );


      if (
        response.data.status === 0
      ) {

        alert(
          response.data.message
        );

        setQuestion({

          questionText: "",
          status: ""
        })

      } else {

        alert(
          response.data.message
        );

      }

    } catch (error) {

      console.error(
        "Question Error:",
        error.response?.data ||
        error
      );

      alert(

        error.response?.data?.message ||

        "Failed to add question"

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

        Add Question

      </h1>


      {/* FORM */}

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
            gap-6
          "

        >


          {/* QUESTION TEXT */}

          <div>

            <label className="
              font-semibold
              block
              mb-2
            ">

              Question

            </label>

            <textarea
              name="questionText"
              value={question.questionText}
              onChange={handleChange}
              rows="5"
              placeholder="Enter Question"
              className="
    w-full
    border
    border-gray-300
    p-4
    rounded-xl
    outline-none
    resize-none
    text-left
    align-top
  "
              required
            />

          </div>


          {/* STATUS */}

          <div>

            <label className="
              font-semibold
              block
              mb-2
            ">

              Status

            </label>


            <select

              name="status"

              value={
                question.status
              }

              onChange={
                handleChange
              }

              className="
                w-full
                border
                p-3
                rounded-xl
              "

              required

            >

              <option value="">

                Select Status

              </option>


              <option value="ACTIVE">

                ACTIVE

              </option>


              <option value="INACTIVE">

                INACTIVE

              </option>


            </select>

          </div>


          {/* BUTTON */}

          <div>

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

              {

                loading

                  ? "Saving..."

                  : "Save Question"

              }

            </button>

          </div>


        </form>

      </div>


    </AdminLayout>

  );

}

export default AddQuestion;