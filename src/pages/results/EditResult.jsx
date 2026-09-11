import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function EditResult() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);

  const [result, setResult] = useState({
    studentId: "",
    examId: "",
    marksObtained: "",
    grade: "",
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [
        resultRes,
        studentRes,
        examRes
      ] = await Promise.all([
        apiService.getResultsById(id),
        apiService.getAllStudents(),
        apiService.getAllExams(),
      ]);

      const studentList = studentRes.data.data || [];
      const examList = examRes.data.data || [];

      setStudents(studentList);
      setExams(examList);

      if (resultRes.data.status === 0) {
        const data = resultRes.data.data;

        const selectedStudent = studentList.find(
          s =>
            s.studentFullName === data.studentName ||
            s.studentFullId === data.studentId
        );

        const selectedExam = examList.find(
          e =>
            e.examName === data.examName &&
            e.examDate === data.examDate
        );

        setResult({
          studentId: selectedStudent?.id || "",
          examId: selectedExam?.id || "",
          marksObtained: data.marksObtained,
          grade: data.grade,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setResult({
      ...result,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        marksObtained: Number(result.marksObtained),
        grade: result.grade,
        studentId: Number(result.studentId),
        examId: Number(result.examId),
      };

      const response = await apiService.updateResult(id, payload);

      if (response.data.status === 0) {
        alert(response.data.message);
        navigate("/admin/results");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update result");
    }
  };

  return (
    <AdminLayout>

      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl font-semibold"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-8">
        Edit Result
      </h1>

      <div className="bg-white p-8 rounded-3xl shadow-md">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Student */}
          <div>
            <label className="font-semibold">
              Student
            </label>

            <select
              name="studentId"
              value={result.studentId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">
                Select Student
              </option>

              {students.map((student) => (
                <option
                  key={student.id}
                  value={student.id}
                >
                  {student.studentFullName}
                </option>
              ))}
            </select>
          </div>

          {/* Exam */}
          <div>
            <label className="font-semibold">
              Exam
            </label>

            <select
              name="examId"
              value={result.examId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">
                Select Exam
              </option>

              {exams.map((exam) => (
                <option
                  key={exam.id}
                  value={exam.id}
                >
                  {exam.examName}
                </option>
              ))}
            </select>
          </div>

          {/* Marks */}
          <div>
            <label className="font-semibold">
              Marks Obtained
            </label>

            <input
              type="number"
              name="marksObtained"
              value={result.marksObtained}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Grade */}
          <div>
            <label className="font-semibold">
              Grade
            </label>

            <select
              name="grade"
              value={result.grade}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">Select Grade</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl"
            >
              Update Result
            </button>
          </div>

        </form>

      </div>

    </AdminLayout>
  );
}

export default EditResult;