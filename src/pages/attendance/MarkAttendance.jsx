import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function MarkAttendance() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [batches, setBatches] = useState([]);

  const [form, setForm] = useState({
    date: "",
    studentId: "",
    teacherId: "",
    batchId: "",
    status: "PRESENT",
  });

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const studentRes = await apiService.getAllStudents();
      const teacherRes = await apiService.getAllTeacher();
      const batchRes = await apiService.getAllBatches();

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
      console.error("Dropdown fetch failed:", error);
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

    if (!form.date) return alert("Enter Date");
    if (!form.studentId) return alert("Select Student");
    if (!form.teacherId) return alert("Select Teacher");
    if (!form.batchId) return alert("Select Batch");

    try {
      const payload = {
        date: form.date,
        status: form.status,
        studentId: Number(form.studentId),
        teacherId: Number(form.teacherId),
        batchId: Number(form.batchId),
      };

      console.log("Sending attendance:", payload);

      const response = await apiService.markAttendance(payload);

      console.log(response);

      if (response.data.status === 0) {
        alert("Attendance Marked Successfully");
        //navigate("/attendance");
        setForm({ date: "", studentId: "", teacherId: "", batchId: "", status: "", });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to mark attendance");
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

      {/* Header */}
      <h1 className="text-4xl font-bold mb-8">Mark Attendance</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-md"
      >
        {/* Student */}
        <div className="mb-5">
          <label className="font-semibold">Student</label>
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
        <div className="mb-5">
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
        <div className="mb-5">
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
                {batch.section} ({batch.year})
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="mb-5">
          <label className="font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl mt-2"
          />
        </div>

        {/* Status */}
        <div className="mb-5">
          <label className="font-semibold">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl mt-2"
          >
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Save Attendance
        </button>
      </form>
    </AdminLayout>
  );
}

export default MarkAttendance;