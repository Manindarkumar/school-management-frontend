import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AddTeacherCourse() {

  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(false);

  const [teacherCourse, setTeacherCourse] = useState({
    teacherId: "",
    courseId: ""
  });


  // =========================
  // FETCH TEACHERS AND COURSES
  // =========================

  useEffect(() => {

    fetchTeachers();
    fetchCourses();

  }, []);


  // =========================
  // FETCH TEACHERS
  // =========================

  const fetchTeachers = async () => {

    try {

      const response =
        await apiService.getAllTeacher();

      console.log(
        "Teacher:",
        response.data
      );

      if (
        response.data.status === 0
      ) {

        setTeachers(
          response.data.data
        );

      }

    } catch (error) {

      console.error(
        "Error fetching teachers:",
        error
      );

    }

  };


  // =========================
  // FETCH COURSES
  // =========================

  const fetchCourses = async () => {

    try {

      const response =
        await apiService.fetchAllCourse();

      console.log(
        "Course Response:",
        response.data
      );

      if (
        response.data.status === 0
      ) {

        setCourses(
          response.data.data
        );

      }

    } catch (error) {

      console.error(
        "Error fetching courses:",
        error
      );

    }

  };


  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {

    setTeacherCourse({

      ...teacherCourse,

      [e.target.name]:
        e.target.value

    });

  };


  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);


      const requestBody = {

        teacherId:
          Number(
            teacherCourse.teacherId
          ),

        courseId:
          Number(
            teacherCourse.courseId
          )

      };


      console.log(
        "Request Body:",
        requestBody
      );


      const response =
        await apiService.createTeacherCourse(
          requestBody
        );


      console.log(
        "Assign Response:",
        response.data
      );

      setTeacherCourse({
        teacherId: "",
        courseId: ""
      })


      if (

        response.data.status === 1

      ) {

        alert(
          response.data.message
        );

        // After clicking OK
        // go back to teacher course list

        // navigate(
        //   "/teacher-courses",
        //   {
        //     replace: true
        //   }
        // );

      } else {

        alert(
          response.data.message
        );

      }

    } catch (error) {

      console.error(
        "Assignment error:",
        error.response?.data ||
        error
      );

      alert(

        error.response?.data?.message ||

        "Failed to assign course"

      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <AdminLayout>


      {/* =========================
          BACK BUTTON
      ========================== */}

      <div className="mb-6">

        <button

          onClick={() =>
            navigate(-1)
          }

          className="
            bg-gray-200
            hover:bg-gray-300
            px-5
            py-2
            rounded-xl
            font-semibold
          "

        >

          ← Back

        </button>

      </div>


      {/* =========================
          HEADER
      ========================== */}

      <div className="mb-8">

        <h1 className="
          text-4xl
          font-bold
        ">

          Assign Teacher Course

        </h1>

      </div>


      {/* =========================
          FORM
      ========================== */}

      <div className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
      ">

        <form

          onSubmit={
            handleSubmit
          }

          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "

        >


          {/* =========================
              TEACHER DROPDOWN
          ========================== */}

          {/* =========================
    TEACHER DROPDOWN
========================== */}

          <div>

            <label className="font-semibold">
              Teacher
            </label>

            <select
              name="teacherId"
              value={teacherCourse.teacherId}
              onChange={handleChange}
              className="
      w-full
      border
      p-3
      rounded-xl
      mt-2
    "
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

                  {teacher.firstName}

                  {" "}

                  {teacher.middleName || ""}

                  {" "}

                  {teacher.lastName}

                  {" - "}

                  {teacher.teacherFullId}

                </option>

              ))}

            </select>

          </div>

          {/* =========================
              COURSE DROPDOWN
          ========================== */}

          <div>

            <label className="
              font-semibold
            ">

              Course

            </label>


            <select

              name="courseId"

              value={
                teacherCourse.courseId
              }

              onChange={
                handleChange
              }

              className="
                w-full
                border
                p-3
                rounded-xl
                mt-2
              "

              required

            >

              <option value="">

                Select Course

              </option>


              {

                courses.map(

                  (course) => (

                    <option

                      key={
                        course.id
                      }

                      value={
                        course.id
                      }

                    >

                      {

                        course.courseName

                      }

                    </option>

                  )

                )

              }

            </select>

          </div>


          {/* =========================
              BUTTON
          ========================== */}

          <div className="
            md:col-span-2
          ">

            <button

              type="submit"

              disabled={
                loading
              }

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

              {

                loading

                  ? "Assigning..."

                  : "Save Assignment"

              }

            </button>

          </div>


        </form>

      </div>

    </AdminLayout>

  );

}

export default AddTeacherCourse;