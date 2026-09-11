import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AddCourse() {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    courseName: "",
    description: "",
  });

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
      console.log("Sending:", course);

      const response = await apiService.createCourse(course);

      console.log(response);

      if (response.data.status === 0) {
        alert("Course Added Successfully");

        setCourse({
          courseName: "",
          description: "",
        })
        //navigate("/courses");
      }
    } catch (error) {
      console.error("Create course failed:", error);
      alert("Failed to add course");
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
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Add Course</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-3xl shadow-md p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6"
        >
          {/* Course Name */}
          <div>
            <label className="font-semibold">Course Name</label>
            <input
              type="text"
              name="courseName"
              value={course.courseName}
              placeholder="Enter Course Name"
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
              placeholder="Enter Course Description"
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Button */}
          <div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Save Course
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddCourse;