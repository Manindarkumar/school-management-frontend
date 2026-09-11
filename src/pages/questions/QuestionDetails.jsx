import { useNavigate }
from "react-router-dom";

import {
  FaQuestionCircle,
  FaBook,
  FaClipboardList,
  FaStar
} from "react-icons/fa";

import AdminLayout
from "../../layouts/AdminLayout";

function QuestionDetails() {

  const navigate = useNavigate();

  const question = {

    question: "What is React?",
    subject: "React",
    type: "Short Answer",
    marks: 5,
    difficulty: "Easy"

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

      <div className="
        flex
        items-center
        gap-3
        mb-8
      ">

        <FaQuestionCircle
          className="
            text-4xl
            text-blue-600
          "
        />

        <h1 className="
          text-4xl
          font-bold
        ">
          Question Details
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

          <div>

            <p className="text-gray-500">
              Question
            </p>

            <h2 className="
              text-xl
              font-semibold
            ">
              {question.question}
            </h2>

          </div>

          <div>

            <p className="text-gray-500">
              Subject
            </p>

            <h2 className="
              text-xl
              font-semibold
            ">
              {question.subject}
            </h2>

          </div>

          <div>

            <p className="text-gray-500">
              Type
            </p>

            <h2 className="
              text-xl
              font-semibold
            ">
              {question.type}
            </h2>

          </div>

          <div>

            <p className="text-gray-500">
              Marks
            </p>

            <h2 className="
              text-xl
              font-semibold
            ">
              {question.marks}
            </h2>

          </div>

          <div>

            <p className="text-gray-500">
              Difficulty
            </p>

            <span className="
              bg-green-100
              text-green-700
              px-4 py-2
              rounded-full
              text-sm
              font-semibold
            ">
              {question.difficulty}
            </span>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default QuestionDetails;