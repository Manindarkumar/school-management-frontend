import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function ExamDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [exam, setExam] = useState(null);

  useEffect(() => {
    fetchExam();
  }, [id]);

  const fetchExam = async () => {
    try {
      const response = await apiService.getExamById(id);

      if (response.data.status === 0) {
        setExam(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!exam) {
    return (
      <AdminLayout>
        <div className="p-10 text-center">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Back */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl font-semibold"
        >
          ← Back
        </button>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-8">
        Exam Details
      </h1>

      {/* Details Card */}
      <div className="bg-white p-8 rounded-3xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-500">Exam Name</p>
          <h2 className="font-semibold text-lg">
            {exam.examName}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Course</p>
          <h2 className="font-semibold text-lg">
            {exam.course}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Exam Date</p>
          <h2 className="font-semibold text-lg">
            {exam.examDate}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Total Marks</p>
          <h2 className="font-semibold text-lg">
            {exam.totalMarks}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Batch</p>
          <h2 className="font-semibold text-lg">
            {exam.batchName || "N/A"}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Section</p>
          <h2 className="font-semibold text-lg">
            {exam.section}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Year</p>
          <h2 className="font-semibold text-lg">
            {exam.year}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Invigilator</p>
          <h2 className="font-semibold text-lg">
            {exam.invigilator}
          </h2>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ExamDetails;