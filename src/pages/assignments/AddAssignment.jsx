import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AddAssignment() {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [batches, setBatches] = useState([]);

  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    teacherId: "",
    batchId: "",
  });

  useEffect(() => {
    fetchTeachers();
    fetchBatches();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await apiService.getAllTeacher();

      console.log("Teacher Response:", response.data);

      if (response.data.status === 0) {
        setTeachers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBatches = async () => {
    try {
      const response = await apiService.getAllBatches();

      if (response.data.status === 0) {
        setBatches(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setAssignment({
      ...assignment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Submitted");
    console.log("Assignment Data:", assignment);

    try {
      const response = await apiService.createAssignment(assignment);

      console.log("API Response:", response);

      if (response.data.status === 0) {
        alert(response.data.message);
        // navigate("/admin/assignments");
        setAssignment({
          title: "",
          description: "",
          dueDate: "",
          teacherId: "",
          batchId: "",
        })
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("API Error:", error);
      console.log("Response:", error.response);
      alert("Failed to create assignment");
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
        Add Assignment
      </h1>

      <div className="bg-white p-8 rounded-3xl shadow-md">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Title */}
          <div>
            <label className="font-semibold">
              Assignment Title
            </label>

            <input
              type="text"
              name="title"
              value={assignment.title}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
              required
            />
          </div>

          {/* Teacher */}
          <div>
            <label className="font-semibold">
              Teacher
            </label>

            <select
              name="teacherId"
              value={assignment.teacherId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
              required
            >
              <option value="">
                Select Teacher
              </option>

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
              value={assignment.batchId}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
              required
            >
              <option value="">
                Select Batch
              </option>

              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.grade} - {batch.section}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="font-semibold">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={assignment.dueDate}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="font-semibold">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={assignment.description}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
              required
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Save Assignment
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddAssignment;