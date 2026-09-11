import { useState }
from "react";

import { useNavigate }
from "react-router-dom";

import AdminLayout
from "../../layouts/AdminLayout";

function EditQuestion() {

  const navigate = useNavigate();

  const [question, setQuestion] =
    useState({

      question: "What is React?",
      subject: "React",
      type: "Short Answer",
      marks: 5,
      difficulty: "Easy",
      status: "Active"

    });

  const handleChange = (e) => {

    setQuestion({

      ...question,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    alert(
      "Question Updated Successfully"
    );

    navigate("/questions");

  };

  return (

    <AdminLayout>

      <button
        onClick={() => navigate(-1)}
        className="
          bg-gray-200
          px-5 py-2
          rounded-xl
          mb-6
        "
      >
        ← Back
      </button>

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Edit Question
      </h1>

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
            md:grid-cols-2
            gap-6
          "
        >

          <div className="md:col-span-2">

            <label className="
              font-semibold
              block
              mb-2
            ">
              Question
            </label>

            <textarea
              name="question"
              rows="4"
              value={question.question}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

          </div>

        </form>

      </div>

    </AdminLayout>
  );
}

export default EditQuestion;