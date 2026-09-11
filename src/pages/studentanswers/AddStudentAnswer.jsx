import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AddStudentAnswer() {

  const navigate = useNavigate();

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
  }, []);

  const loadAssignments = async () => {

    try {

      const response = await apiService.getAllAssignments();

      if (response.data.status === 0) {
        setAssignments(response.data.data);
      }

    } catch (error) {
      console.error(error);
    }

  };

  const loadQuestions = async () => {

    try {

      const response = await apiService.getAllQuestions();

      if (response.data.status === 0) {
        setQuestions(response.data.data);
      }

    } catch (error) {
      console.error(error);
    }

  };

  const handleChange = (e) => {

    setAnswer({
      ...answer,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await apiService.createStudentAnswer(answer);

      if (response.data.status === 0) {

        alert(response.data.message);

        setAnswer({
          assignmentId: "",
          questionId: "",
          answerText: ""
        })
        //navigate("/admin/student-answers");

      } else {

        alert(response.data.message);

      }

    } catch (error) {

      console.error(
        "Student Answer Error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
        "Failed to submit answer"
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
        Add Student Answer
      </h1>

      <div className="bg-white p-8 rounded-3xl shadow-md">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Assignment */}

          <div>

            <label className="font-semibold block mb-2">
              Assignment
            </label>

            <select
              name="assignmentId"
              value={answer.assignmentId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            >

              <option value="">
                Select Assignment
              </option>

              {assignments.map((assignment) => (

                <option
                  key={assignment.id}
                  value={assignment.id}
                >
                  {assignment.title}
                </option>

              ))}

            </select>

          </div>

          {/* Question */}

          <div>

            <label className="font-semibold block mb-2">
              Question
            </label>

            <select
              name="questionId"
              value={answer.questionId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            >

              <option value="">
                Select Question
              </option>

              {questions.map((question) => (

                <option
                  key={question.id}
                  value={question.id}
                >
                  {question.questionText}
                </option>

              ))}

            </select>

          </div>

          {/* Student Answer */}

          <div className="md:col-span-2">

            <label className="font-semibold block mb-2">
              Student Answer
            </label>

            <textarea
              rows="6"
              name="answerText"
              value={answer.answerText}
              onChange={handleChange}
              placeholder="Enter Student Answer"
              className="w-full border p-3 rounded-xl"
              required
            />

          </div>
          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-xl text-white ${loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Submitting..." : "Submit Answer"}
            </button>

          </div>

        </form>

      </div>

    </AdminLayout>

  );

}

export default AddStudentAnswer;