import { useNavigate }
from "react-router-dom";

import {
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
  FaLayerGroup,
  FaCheckCircle
} from "react-icons/fa";

import AdminLayout
from "../../layouts/AdminLayout";

function TeacherCourseDetails() {

  const navigate = useNavigate();

  const teacherCourse = {

    teacher: "Rahul Sharma",
    course: "Computer Science",
    subject: "Java",
    batch: "Batch A",
    status: "Active"

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

      {/* Header */}
      <div className="
        flex
        items-center
        gap-3
        mb-8
      ">

        <FaChalkboardTeacher
          className="
            text-4xl
            text-blue-600
          "
        />

        <h1 className="
          text-4xl
          font-bold
        ">
          Teacher Course Details
        </h1>

      </div>

      {/* Details */}
      <div className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-8
        ">

          {/* Teacher */}
          <div className="
            flex
            items-center
            gap-4
          ">

            <FaChalkboardTeacher
              className="
                text-2xl
                text-blue-600
              "
            />

            <div>

              <p className="text-gray-500">
                Teacher
              </p>

              <h2 className="
                text-xl
                font-semibold
              ">
                {teacherCourse.teacher}
              </h2>

            </div>

          </div>

          {/* Course */}
          <div className="
            flex
            items-center
            gap-4
          ">

            <FaBook
              className="
                text-2xl
                text-green-600
              "
            />

            <div>

              <p className="text-gray-500">
                Course
              </p>

              <h2 className="
                text-xl
                font-semibold
              ">
                {teacherCourse.course}
              </h2>

            </div>

          </div>

          {/* Subject */}
          <div className="
            flex
            items-center
            gap-4
          ">

            <FaClipboardList
              className="
                text-2xl
                text-purple-600
              "
            />

            <div>

              <p className="text-gray-500">
                Subject
              </p>

              <h2 className="
                text-xl
                font-semibold
              ">
                {teacherCourse.subject}
              </h2>

            </div>

          </div>

          {/* Batch */}
          <div className="
            flex
            items-center
            gap-4
          ">

            <FaLayerGroup
              className="
                text-2xl
                text-orange-600
              "
            />

            <div>

              <p className="text-gray-500">
                Batch
              </p>

              <h2 className="
                text-xl
                font-semibold
              ">
                {teacherCourse.batch}
              </h2>

            </div>

          </div>

          {/* Status */}
          <div className="
            flex
            items-center
            gap-4
          ">

            <FaCheckCircle
              className="
                text-2xl
                text-green-600
              "
            />

            <div>

              <p className="text-gray-500">
                Status
              </p>

              <span className="
                bg-green-100
                text-green-700
                px-4 py-2
                rounded-full
                text-sm
                font-semibold
              ">
                {teacherCourse.status}
              </span>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default TeacherCourseDetails;