import { useState }
from "react";

import { useNavigate }
from "react-router-dom";

import AdminLayout
from "../../layouts/AdminLayout";

function EditTeacherCourse() {

  const navigate = useNavigate();

  const [teacherCourse, setTeacherCourse] =
    useState({

      teacher: "Rahul Sharma",
      course: "Computer Science",
      subject: "Java",
      batch: "Batch A",
      status: "Active"

    });

  const handleChange = (e) => {

    setTeacherCourse({

      ...teacherCourse,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(teacherCourse);

    alert(
      "Teacher Course Updated Successfully"
    );

    navigate("/teacher-courses");

  };

  return (

    <AdminLayout>

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="
          bg-gray-200
          hover:bg-gray-300
          px-5 py-2
          rounded-xl
          mb-6
        "
      >
        ← Back
      </button>

      {/* Title */}
      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Edit Teacher Course
      </h1>

      {/* Form */}
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
            md:grid-cols-2
            gap-6
          "
        >

          {/* Teacher */}
          <div>

            <label className="
              font-semibold
              block
              mb-2
            ">
              Teacher Name
            </label>

            <input
              type="text"
              name="teacher"
              value={teacherCourse.teacher}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

          </div>

          {/* Course */}
          <div>

            <label className="
              font-semibold
              block
              mb-2
            ">
              Course
            </label>

            <input
              type="text"
              name="course"
              value={teacherCourse.course}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

          </div>

          {/* Subject */}
          <div>

            <label className="
              font-semibold
              block
              mb-2
            ">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={teacherCourse.subject}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

          </div>

          {/* Batch */}
          <div>

            <label className="
              font-semibold
              block
              mb-2
            ">
              Batch
            </label>

            <input
              type="text"
              name="batch"
              value={teacherCourse.batch}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            />

          </div>

          {/* Status */}
          <div>

            <label className="
              font-semibold
              block
              mb-2
            ">
              Status
            </label>

            <select
              name="status"
              value={teacherCourse.status}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            >

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          </div>

          {/* Button */}
          <div className="
            md:col-span-2
          ">

            <button
              type="submit"
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6 py-3
                rounded-xl
              "
            >
              Update Assignment
            </button>

          </div>

        </form>

      </div>

    </AdminLayout>
  );
}

export default EditTeacherCourse;