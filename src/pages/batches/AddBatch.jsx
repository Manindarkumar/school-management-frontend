import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AddBatch() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [grades, setGrades] = useState([]);

  const [batch, setBatch] = useState({
    batchName: "",
    courseId: "",
    teacherId: "",
    gradeId: "",
    totalStudents: "",
    batchTiming: "",
    status: "",
    batchYear: "",
    section: "",
  });

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const [courseRes, teacherRes, gradeRes] = await Promise.all([
        apiService.fetchAllCourse(),
        apiService.getAllTeacher(),
        apiService.getAllGrade(),
      ]);

      if (courseRes.data.status === 0) {
        setCourses(courseRes.data.data);
      }

      if (teacherRes.data.status === 0) {
        setTeachers(teacherRes.data.data);
      }

      if (gradeRes.data.status === 0) {
        setGrades(gradeRes.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setBatch({
      ...batch,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiService.createBatch(batch);

      if (response.data.status === 0) {
        alert(response.data.message);

        // Reset all form fields after successful submission
        setBatch({
          batchName: "",
          courseId: "",
          teacherId: "",
          gradeId: "",
          totalStudents: "",
          batchTiming: "",
          status: "",
          batchYear: "",
          section: "",
        });

        // If you want to go back to batch list, uncomment this
        // navigate("/batches");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create batch");
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

      <h1 className="text-4xl font-bold mb-8">Add Batch</h1>

      <div className="bg-white p-8 rounded-3xl shadow-md">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Batch Name */}
          <div>
            <label className="block mb-2 font-semibold">
              Batch Name
            </label>

            <input
              type="text"
              name="batchName"
              value={batch.batchName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              placeholder="Morning Batch A"
            />
          </div>

          {/* Course */}
          <div>
            <label className="block mb-2 font-semibold">
              Course Name
            </label>

            <select
              name="courseId"
              value={batch.courseId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            >
              <option value="">Select Course</option>

              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher */}
          <div>
            <label className="block mb-2 font-semibold">
              Teacher Name
            </label>

            <select
              name="teacherId"
              value={batch.teacherId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            >
              <option value="">Select Teacher</option>

              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.teacherFullName}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block mb-2 font-semibold">
              Year
            </label>

            <select
              name="gradeId"
              value={batch.gradeId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            >
              <option value="">Select Year</option>

              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.gradeName}
                </option>
              ))}
            </select>
          </div>

          {/* Total Students */}
          <div>
            <label className="block mb-2 font-semibold">
              Total Students
            </label>

            <input
              type="number"
              name="totalStudents"
              value={batch.totalStudents}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              placeholder="60"
            />
          </div>

          {/* Batch Timing - Start Time Only */}
          <div>
            <label className="block mb-2 font-semibold">
              Batch Start Time
            </label>

            <input
              type="time"
              name="batchTiming"
              value={batch.batchTiming}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />
          </div>

          {/* Batch Year */}
          <div>
            <label className="block mb-2 font-semibold">
              Batch Year
            </label>

            <input
              type="text"
              name="batchYear"
              value={batch.batchYear}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              placeholder="2020-2025"
            />
          </div>

          {/* Section */}
          <div>
            <label className="block mb-2 font-semibold">
              Section
            </label>

            <input
              type="text"
              name="section"
              value={batch.section}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              placeholder="A"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 font-semibold">
              Status
            </label>

            <select
              name="status"
              value={batch.status}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            >
              <option value="">Select Status</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="UPCOMING">Upcoming</option>
            </select>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              Save Batch
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddBatch;