import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState({
    courseName: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      if (!id) return;

      const response = await apiService.getCourseById(id);

      console.log("Course Response:", response);

      if (response.data.status === 0) {
        setCourse({
          courseName: response.data.data.courseName || "",
          description: response.data.data.description || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch course", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!course.courseName.trim()) {
      alert("Enter Course Name");
      return;
    }

    if (!course.description.trim()) {
      alert("Enter Description");
      return;
    }

    try {
      const response = await apiService.updateCourse(id, course);

      console.log(response);

      if (response.data.status === 0) {
        alert("Course Updated Successfully");
        //navigate("/courses");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update course");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-10">Loading...</div>
      </AdminLayout>
    );
  }

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
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Edit Course</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-3xl shadow-md p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {/* Course Name */}
          <div>
            <label className="font-semibold">Course Name</label>
            <input
              type="text"
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">Description</label>
            <textarea
              name="description"
              rows="5"
              value={course.description}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Button */}
          <div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl"
            >
              Update Course
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default EditCourse;