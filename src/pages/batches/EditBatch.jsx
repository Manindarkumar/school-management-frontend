import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function EditExam() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [exam, setExam] = useState({
    examName: "",
    examDate: "",
    totalMarks: "",
    courseId: "",
    batchId: "",
    teacherId: "",
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [
        examRes,
        courseRes,
        batchRes,
        teacherRes
      ] = await Promise.all([
        apiService.getExamById(id),
        apiService.fetchAllCourse(),
        apiService.getAllBatches(),
        apiService.getAllTeacher()
      ]);

      const courseList = courseRes.data.data || [];
      const batchList = batchRes.data.data || [];
      const teacherList = teacherRes.data.data || [];

      setCourses(courseList);
      setBatches(batchList);
      setTeachers(teacherList);

      if (examRes.data.status === 0) {
        const data = examRes.data.data;

        // match by name because backend sends names, not IDs
        const selectedCourse = courseList.find(
          c => c.courseName === data.course
        );

        const selectedBatch = batchList.find(
          b => b.batchName === data.batchName
        );

        const selectedTeacher = teacherList.find(
          t => t.teacherFullName === data.invigilator
        );

        setExam({
          examName: data.examName || "",
          examDate: data.examDate || "",
          totalMarks: data.totalMarks || "",
          courseId: selectedCourse?.id || "",
          batchId: selectedBatch?.id || "",
          teacherId: selectedTeacher?.id || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setExam({
      ...exam,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        examName: exam.examName,
        examDate: exam.examDate,
        totalMarks: exam.totalMarks,
        courseId: Number(exam.courseId),
        batchId: Number(exam.batchId),
        teacherId: Number(exam.teacherId),
      };

      const response = await apiService.updateExam(id, payload);

      if (response.data.status === 0) {
        alert(response.data.message);
        navigate("/admin/exams");
      }
    } catch (error) {
      console.log(error);
      alert("Update failed");
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

      <h1 className="text-4xl font-bold mb-8">Edit Exam</h1>

      <div className="bg-white p-8 rounded-3xl shadow-md">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Exam Name */}
          <div>
            <label className="font-semibold">Exam Name</label>
            <input
              type="text"
              name="examName"
              value={exam.examName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Total Marks */}
          <div>
            <label className="font-semibold">Total Marks</label>
            <input
              type="number"
              name="totalMarks"
              value={exam.totalMarks}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Date */}
          <div>
            <label className="font-semibold">Exam Date</label>
            <input
              type="date"
              name="examDate"
              value={exam.examDate}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Course */}
          <div>
            <label className="font-semibold">Course</label>
            <select
              name="courseId"
              value={exam.courseId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          {/* Batch */}
          <div>
            <label className="font-semibold">Batch</label>
            <select
              name="batchId"
              value={exam.batchId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">Select Batch</option>
              {batches.map(batch => (
                <option key={batch.id} value={batch.id}>
                  {batch.batchName}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher */}
          <div>
            <label className="font-semibold">Teacher</label>
            <select
              name="teacherId"
              value={exam.teacherId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">Select Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.teacherFullName}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl"
            >
              Update Exam
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default EditExam;