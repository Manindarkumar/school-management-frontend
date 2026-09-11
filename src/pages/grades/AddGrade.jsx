
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AddGrade() {

  const navigate = useNavigate();

  const [grade, setGrade] = useState({
    gradeName: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setGrade({
      ...grade,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!grade.gradeName || !grade.description) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const payload = {
        gradeName: grade.gradeName,
        description: grade.description,
      };

      const response =
        await apiService.createGrade(payload);

      console.log("Grade Response:", response);

      if (response.data?.status === 0) {

        alert(
          response.data.message ||
          "Grade created successfully"
        );

        // Clear fields after clicking OK
        setGrade({
          gradeName: "",
          description: "",
        });

      } else {

        alert(
          response.data?.message ||
          "Failed to create grade"
        );
      }

    } catch (error) {

      console.error("Grade Error:", error);

      alert(
        error.response?.data?.message ||
        "Something went wrong while creating grade"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <AdminLayout>

      {/* BACK BUTTON */}

      <button
        onClick={() => navigate(-1)}
        className="
          bg-gray-200
          hover:bg-gray-300
          px-5
          py-2
          rounded-xl
          mb-6
        "
      >
        ← Back
      </button>


      {/* TITLE */}

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Add Grade
      </h1>


      <div className="
        bg-white
        p-8
        rounded-3xl
        shadow-md
      ">

        <form
          onSubmit={handleSubmit}
          className="
            grid
            grid-cols-1
            gap-6
          "
        >

          {/* GRADE NAME */}

          <div>

            <label className="
              block
              font-semibold
              mb-2
            ">
              Course Name
            </label>

            <input
              type="text"
              name="gradeName"
              value={grade.gradeName}
              onChange={handleChange}
              placeholder="Enter Course Name"
              className="
                w-full
                border
                p-3
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              required
            />

          </div>


          {/* DESCRIPTION */}

          <div>

            <label className="
              block
              font-semibold
              mb-2
            ">
              Description
            </label>

            <textarea
              name="description"
              rows="5"
              value={grade.description}
              onChange={handleChange}
              placeholder="Enter Grade Description"
              className="
                w-full
                border
                p-3
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              required
            />

          </div>


          {/* BUTTON */}

          <div>

            <button
              type="submit"
              disabled={loading}
              className="
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-gray-400
                text-white
                px-6
                py-3
                rounded-xl
              "
            >

              {loading
                ? "Saving..."
                : "Save Grade"
              }

            </button>

          </div>

        </form>

      </div>

    </AdminLayout>

  );
}

export default AddGrade;

