import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function EditTimetable() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [batches, setBatches] = useState([]);

  const [form, setForm] = useState({
    day: "",
    startTime: "",
    endTime: "",
    courseId: "",
    teacherId: "",
    batchId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        timetableRes,
        courseRes,
        teacherRes,
        batchRes
      ] = await Promise.all([
        apiService.getTimeTableById(id),
        apiService.fetchAllCourse(),
        apiService.getAllTeacher(),
        apiService.getAllBatches(),
      ]);

      const timetable = timetableRes.data.data;
      const courseList = courseRes.data.data;
      const teacherList = teacherRes.data.data;
      const batchList = batchRes.data.data;

      setCourses(courseList);
      setTeachers(teacherList);
      setBatches(batchList);

      // Find selected Course
      const selectedCourse = courseList.find(
        (c) => c.courseName === timetable.courseName
      );

      // Find selected Teacher
      const selectedTeacher = teacherList.find(
        (t) => t.teacherFullName === timetable.teacherFullName
      );

      // timetable.batch = "Second Year - B"
      const batchSection = timetable.batch?.split("-")[1]?.trim();

      const selectedBatch = batchList.find(
        (b) => b.section === batchSection
      );

      setForm({
        day: timetable.day || "",
        startTime: timetable.startTime || "",
        endTime: timetable.endTime || "",
        courseId: selectedCourse?.id || "",
        teacherId: selectedTeacher?.id || "",
        batchId: selectedBatch?.id || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        day: form.day,
        startTime: form.startTime,
        endTime: form.endTime,
        courseId: Number(form.courseId),
        teacherId: Number(form.teacherId),
        batchId: Number(form.batchId),
      };

      const response = await apiService.updateTimeTable(id, payload);

      if (response.data.status === 0) {
        alert(response.data.message);
        navigate("/admin/timetable");
      } else {
        alert(response.data.message);
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
          className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-8">
        Edit Timetable
      </h1>

      <div className="bg-white p-8 rounded-3xl shadow-md">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Day */}
          <div>
            <label className="font-semibold">Day</label>

            <input
              type="text"
              name="day"
              value={form.day}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="font-semibold">Start Time</label>

            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="font-semibold">End Time</label>

            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Course */}
          <div>
            <label className="font-semibold">Course</label>

            <select
              name="courseId"
              value={form.courseId}
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

          {/* Teacher */}
          <div>
            <label className="font-semibold">Teacher</label>

            <select
              name="teacherId"
              value={form.teacherId}
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

          {/* Batch */}
          <div>
            <label className="font-semibold">Batch</label>

            <select
              name="batchId"
              value={form.batchId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">Select Batch</option>

              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.grade} - {batch.section}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl"
            >
              Update Timetable
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default EditTimetable;