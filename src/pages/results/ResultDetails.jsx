import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function ResultDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResult();
  }, [id]);

  const fetchResult = async () => {
    try {
      const response = await apiService.getResultsById(id);
 console.log(response);
      if (response.data.status === 0) {
        setResult(response.data.data);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to fetch result details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center mt-10 text-lg">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  if (!result) {
    return (
      <AdminLayout>
        <div className="text-center mt-10 text-red-500">
          Result not found.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      {/* Back Button */}
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
        Result Details
      </h1>

      {/* Details Card */}
      <div className="bg-white p-8 rounded-3xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <p className="text-gray-500">Student Name</p>
          <h2 className="text-lg font-semibold">
            {result.studentName}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Student ID</p>
          <h2 className="text-lg font-semibold">
            {result.studentId}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Course</p>
          <h2 className="text-lg font-semibold">
            {result.courseName}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Exam Name</p>
          <h2 className="text-lg font-semibold">
            {result.examName}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Exam Date</p>
          <h2 className="text-lg font-semibold">
            {result.examDate}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Marks Obtained</p>
          <h2 className="text-lg font-semibold">
            {result.marksObtained} / {result.totalMarks}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Grade</p>
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            {result.grade}
          </span>
        </div>

        <div>
          <p className="text-gray-500">Section</p>
          <h2 className="text-lg font-semibold">
            {result.section}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Batch Year</p>
          <h2 className="text-lg font-semibold">
            {result.batchYear}
          </h2>
        </div>

      </div>

    </AdminLayout>
  );
}

export default ResultDetails;