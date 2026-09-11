
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AddTimetable() {
  const navigate = useNavigate();

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
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    try {
      const [courseRes, teacherRes, batchRes] = await Promise.all([
        apiService.fetchAllCourse(),
        apiService.getAllTeacher(),
        apiService.getAllBatches(),
      ]);

      setCourses(courseRes.data.data || []);
      setTeachers(teacherRes.data.data || []);
      setBatches(batchRes.data.data || []);
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

    const payload = {
      day: form.day,
      startTime: form.startTime,
      endTime: form.endTime,
      courseId: Number(form.courseId),
      teacherId: Number(form.teacherId),
      batchId: Number(form.batchId),
    };

    try {
      const response = await apiService.createTimetable(payload);

      if (response.data.status === 0) {
        // First show alert
        // After clicking OK, below code will execute
        alert(response.data.message);

        // Clear all fields after clicking OK
        setForm({
          day: "",
          startTime: "",
          endTime: "",
          courseId: "",
          teacherId: "",
          batchId: "",
        });

        // navigate("/admin/timetable");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create timetable");
    }
  };

  return (
    <AdminLayout>
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl mb-6"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-8">
        Add Timetable
      </h1>

      <div className="bg-white p-8 rounded-3xl shadow-md">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Day */}
          <div>
            <label className="font-semibold">
              Day
            </label>

            <select
              name="day"
              value={form.day}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">
                Select Day
              </option>

              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="font-semibold">
              Course
            </label>

            <select
              name="courseId"
              value={form.courseId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">
                Select Course
              </option>

              {courses.map((course) => (
                <option
                  key={course.id}
                  value={course.id}
                >
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher */}
          <div>
            <label className="font-semibold">
              Teacher
            </label>

            <select
              name="teacherId"
              value={form.teacherId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">
                Select Teacher
              </option>

              {teachers.map((teacher) => (
                <option
                  key={teacher.id}
                  value={teacher.id}
                >
                  {teacher.teacherFullName}
                </option>
              ))}
            </select>
          </div>

          {/* Batch */}
          <div>
            <label className="font-semibold">
              Batch
            </label>

            <select
              name="batchId"
              value={form.batchId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">
                Select Batch
              </option>

              {batches.map((batch) => (
                <option
                  key={batch.id}
                  value={batch.id}
                >
                  {batch.batchName}
                </option>
              ))}
            </select>
          </div>

          {/* Start Time */}
          <div>
            <label className="font-semibold">
              Start Time
            </label>

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
            <label className="font-semibold">
              End Time
            </label>

            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Save Timetable
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddTimetable;

