import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function EditAttendance() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [batches, setBatches] = useState([]);

  const [form, setForm] = useState({
    date: "",
    status: "",
    studentId: "",
    teacherId: "",
    batchId: "",
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [
        attendanceRes,
        studentRes,
        teacherRes,
        batchRes
      ] = await Promise.all([
        apiService.getAttendanceById(id),
        apiService.getAllStudents(),
        apiService.getAllTeacher(),
        apiService.getAllBatches(),
      ]);

      if (attendanceRes.data.status === 0) {
        const attendance = attendanceRes.data.data;

        setForm({
          date: attendance.date || "",
          status: attendance.status || "",
          studentId: attendance.student?.id || "",
          teacherId: attendance.teacher?.id || "",
          batchId: attendance.batch?.id || "",
        });
      }

      if (studentRes.data.status === 0) {
        setStudents(studentRes.data.data);
      }

      if (teacherRes.data.status === 0) {
        setTeachers(teacherRes.data.data);
      }

      if (batchRes.data.status === 0) {
        setBatches(batchRes.data.data);
      }
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
      const response = await apiService.updateAttendance(id, form);

      if (response.data.status === 0) {
        alert(response.data.message);
        //navigate("/attendance");
      }
    } catch (error) {
      console.log(error);
      alert("Update failed");
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
        Edit Attendance
      </h1>

      <div className="bg-white p-8 rounded-3xl shadow-md">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Student */}
          <div>
            <label className="font-semibold">
              Student Name
            </label>

            <select
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">Select Student</option>

              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.studentFullName}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher */}
          <div>
            <label className="font-semibold">
              Teacher Name
            </label>

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
            <label className="font-semibold">
              Batch
            </label>

            <select
              name="batchId"
              value={form.batchId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">Select Batch</option>

              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.section} - {batch.year}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="font-semibold">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <label className="font-semibold">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">Select Status</option>
              <option value="PRESENT">Present</option>
              <option value="ABSENT">Absent</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl"
            >
              Update Attendance
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default EditAttendance;