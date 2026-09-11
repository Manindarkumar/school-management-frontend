import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function EditAssignment() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [teachers, setTeachers] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    teacherId: "",
    batchId: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [
        assignmentRes,
        teacherRes,
        batchRes
      ] = await Promise.all([
        apiService.getAssignmentById(id),
        apiService.getAllTeacher(),
        apiService.getAllBatches(),
      ]);

      if (teacherRes.data.status === 0) {
        setTeachers(teacherRes.data.data);
      }

      if (batchRes.data.status === 0) {
        setBatches(batchRes.data.data);
      }

      if (assignmentRes.data.status === 0) {

  const data = assignmentRes.data.data;

  // Find Teacher using teacherName
  const selectedTeacher = teacherRes.data.data.find(
    (teacher) =>
      teacher.teacherFullName.trim() ===
      data.teacherName.trim()
  );

  // Find Batch using year and section
  const selectedBatch = batchRes.data.data.find(
    (batch) =>
      batch.year === data.year &&
      batch.section === data.section
  );

  console.log("Assignment Year :", data.year);
console.log("Assignment Section :", data.section);

console.log("Batch List :", batchRes.data.data);

  // Format Due Date for calendar
  let dueDate = "";

  if (data.dueDate) {
    dueDate = data.dueDate.split("T")[0];
  }

  console.log("Selected Teacher :", selectedTeacher);
  console.log("Selected Batch :", selectedBatch);

  setAssignment({
    title: data.title || "",
    description: data.description || "",
    dueDate,
    teacherId: selectedTeacher ? String(selectedTeacher.id) : "",
    batchId: selectedBatch ? String(selectedBatch.id) : "",
  });

}

    } catch (error) {
      console.log(error);
      alert("Failed to load assignment.");
    } finally {
      setLoading(false);
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

    try {
      const payload = {
        title: assignment.title,
        description: assignment.description,
        dueDate: assignment.dueDate,
        teacherId: Number(assignment.teacherId),
        batchId: Number(assignment.batchId),
      };

      const response = await apiService.updateAssignment(id, payload);

      if (response.data.status === 0) {
        alert(response.data.message);
        //navigate("/admin/assignments");
      } else {
        alert(response.data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Failed to update assignment.");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center mt-10 text-xl">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 px-5 py-2 rounded-xl mb-6"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-8">
        Edit Assignment
      </h1>

      <div className="bg-white p-8 rounded-3xl shadow-md">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="font-semibold">
              Title
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
                <option
                  key={teacher.id}
                  value={teacher.id}
                >
                  {teacher.teacherFullName}
                </option>
              ))}
            </select>
          </div>

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
                <option
                  key={batch.id}
                  value={batch.id}
                >
                  {batch.year} - {batch.section}
                </option>
              ))}
            </select>
          </div>

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
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl"
            >
              Update Assignment
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default EditAssignment;