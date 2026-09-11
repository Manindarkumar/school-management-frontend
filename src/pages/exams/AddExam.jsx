import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AddExam() {
  const navigate = useNavigate();

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
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const [courseRes, batchRes, teacherRes] = await Promise.all([
        apiService.fetchAllCourse(),
        apiService.getAllBatches(),
        apiService.getAllTeacher(),
      ]);

      if (courseRes.data.status === 0) {
        setCourses(courseRes.data.data);
      }

      if (batchRes.data.status === 0) {
        setBatches(batchRes.data.data);
      }

      if (teacherRes.data.status === 0) {
        setTeachers(teacherRes.data.data);
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
      const response = await apiService.createExam(exam);

      if (response.data.status === 0) {
        alert(response.data.message);
        //navigate("/exams");

        setExam({
          examName: "",
          examDate: "",
          totalMarks: "",
          courseId: "",
          batchId: "",
          teacherId: "",
        })
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create exam");
    }
  };

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
        Add Exam
      </h1>

      {/* Form */}
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
              placeholder="Enter Exam Name"
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
              placeholder="Enter Total Marks"
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Exam Date */}
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
              {courses.map((course) => (
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
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.batchName}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher */}
          <div>
            <label className="font-semibold">Invigilator</label>
            <select
              name="teacherId"
              value={exam.teacherId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.teacherFullName}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Save Exam
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddExam;