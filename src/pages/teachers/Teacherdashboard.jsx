
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import {
  FaUserGraduate,
  FaBookOpen,
  FaClipboardCheck,
  FaTasks,
  FaCalendarAlt,
  FaBullhorn,
  FaChartBar,
  FaFileAlt,
  FaQuestionCircle,
  FaTimes,
  FaGraduationCap,
} from "react-icons/fa";

import apiService from "../../api/apiService";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);

  /*
  ============================================================
  FETCH TEACHER DASHBOARD + ALL STUDENTS + ALL COURSES
  ============================================================
  */

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        console.log("Logged User:", user);

        if (!user) {
          setLoading(false);
          return;
        }

        const teacherId = user.teacherId || user.id;

        console.log("Teacher ID:", teacherId);

        if (!teacherId) {
          console.error("Teacher ID not found");
          setLoading(false);
          return;
        }

        /*
        ========================================================
        TEACHER DASHBOARD
        ========================================================
        */

        const dashboardResponse =
          await apiService.getTeacherDashboard(teacherId);

        console.log(
          "Teacher Dashboard Response:",
          dashboardResponse
        );

        if (dashboardResponse?.data?.status === 0) {
          const dashboardData = dashboardResponse.data.data;

          setDashboard(dashboardData);

          /*
          ------------------------------------------------------
          FALLBACK
          If backend eventually sends allStudents/allCourses,
          use those directly.
          ------------------------------------------------------
          */

          if (
            Array.isArray(dashboardData?.allStudents)
          ) {
            setStudents(dashboardData.allStudents);
          }

          if (
            Array.isArray(dashboardData?.allCourses)
          ) {
            setCourses(dashboardData.allCourses);
          }
        }

        /*
        ========================================================
        FETCH ALL STUDENTS
        ========================================================
        */

        try {
          if (
            typeof apiService.getAllStudents ===
            "function"
          ) {
            const studentResponse =
              await apiService.getAllStudents();

            console.log(
              "All Students Response:",
              studentResponse
            );

            const studentData =
              studentResponse?.data?.data;

            if (Array.isArray(studentData)) {
              setStudents(studentData);
            } else if (
              Array.isArray(studentResponse?.data)
            ) {
              setStudents(studentResponse.data);
            }
          } else {
            console.warn(
              "apiService.getAllStudents() not found"
            );
          }
        } catch (studentError) {
          console.error(
            "All Students API Error:",
            studentError
          );
        }

        /*
        ========================================================
        FETCH ALL COURSES
        ========================================================
        */

        try {
          if (
            typeof apiService.getAllCourses ===
            "function"
          ) {
            const courseResponse =
              await apiService.getAllCourses();

            console.log(
              "All Courses Response:",
              courseResponse
            );

            const courseData =
              courseResponse?.data?.data;

            if (Array.isArray(courseData)) {
              setCourses(courseData);
            } else if (
              Array.isArray(courseResponse?.data)
            ) {
              setCourses(courseResponse.data);
            }
          } else {
            console.warn(
              "apiService.getAllCourses() not found"
            );
          }
        } catch (courseError) {
          console.error(
            "All Courses API Error:",
            courseError
          );
        }
      } catch (error) {
        console.error(
          "Teacher Dashboard Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  /*
  ============================================================
  LOADING
  ============================================================
  */

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto"></div>

            <p className="mt-4 text-gray-500 font-medium">
              Loading Teacher Dashboard...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  /*
  ============================================================
  DASHBOARD ERROR
  ============================================================
  */

  if (!dashboard) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="bg-white rounded-3xl shadow-md p-10 text-center">
            <h2 className="text-2xl font-bold text-slate-800">
              Unable to load dashboard
            </h2>

            <p className="text-gray-500 mt-2">
              Please check the teacher login and dashboard API.
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const summary = dashboard.summary || {};
  const questionSummary =
    dashboard.questionSummary || {};
  const submissionSummary =
    dashboard.submissionSummary || {};

  /*
  ============================================================
  STUDENT LIST
  ============================================================
  */

  const studentList =
    students.length > 0
      ? students
      : dashboard.allStudents ||
        dashboard.recentStudents ||
        [];

  /*
  ============================================================
  COURSE LIST
  ============================================================
  */

  const courseList =
    courses.length > 0
      ? courses
      : dashboard.allCourses || [];

  /*
  ============================================================
  DASHBOARD CARDS
  ============================================================
  */

  const cards = [
    /*
    ============================================================
    STUDENTS
    ============================================================
    */

    {
      key: "students",
      title: "My Students",
      value: summary.totalStudents ?? studentList.length,
      icon: <FaUserGraduate />,
      bg: "bg-blue-600",

      details: (
        <div className="space-y-5">

          <DetailRow
            label="Total Students"
            value={
              summary.totalStudents ??
              studentList.length
            }
          />

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              All Students
            </h3>

            {studentList.length > 0 ? (
              <div className="space-y-3">

                {studentList.map(
                  (student, index) => (
                    <div
                      key={
                        student.id ||
                        student.studentId ||
                        student.userId ||
                        index
                      }
                      className="bg-blue-50 rounded-2xl p-4 border border-blue-100"
                    >

                      <div className="flex justify-between items-center gap-4">

                        <div className="min-w-0">

                          <p className="font-semibold text-slate-800 text-base">
                            {student.studentName ||
                              student.fullName ||
                              [
                                student.firstName,
                                student.middleName,
                                student.lastName,
                              ]
                                .filter(Boolean)
                                .join(" ") ||
                              "Student"}
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            {student.courseName ||
                              student.course ||
                              "Course N/A"}

                            {student.batchName
                              ? ` • ${student.batchName}`
                              : ""}
                          </p>

                        </div>

                        <div className="text-right flex-shrink-0">

                          <p className="text-blue-700 font-semibold text-sm">
                            {student.rollNumber ||
                              student.studentRollNumber ||
                              ""}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {student.mobileNumber ||
                              student.mobile ||
                              ""}
                          </p>

                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>
            ) : (
              <EmptyMessage message="No students available." />
            )}
          </div>

        </div>
      ),
    },

    /*
    ============================================================
    COURSES
    ============================================================
    */

    {
      key: "courses",
      title: "My Courses",
      value:
        summary.totalCourses ??
        courseList.length,

      icon: <FaBookOpen />,
      bg: "bg-green-600",

      details: (
        <div className="space-y-5">

          <DetailRow
            label="Total Courses"
            value={
              summary.totalCourses ??
              courseList.length
            }
          />

          <div>

            <h3 className="text-xl font-bold text-slate-800 mb-4">
              My Courses
            </h3>

            {courseList.length > 0 ? (
              <div className="space-y-3">

                {courseList.map(
                  (course, index) => (
                    <div
                      key={
                        course.id ||
                        course.courseId ||
                        index
                      }
                      className="bg-green-50 rounded-2xl p-4 border border-green-100"
                    >

                      <div className="flex justify-between items-center gap-4">

                        <div>

                          <p className="font-semibold text-slate-800 text-base">
                            {course.courseName ||
                              course.name ||
                              course.title ||
                              "Course"}
                          </p>

                          {course.description && (
                            <p className="text-sm text-gray-500 mt-1">
                              {course.description}
                            </p>
                          )}

                        </div>

                        <div className="text-right">

                          {course.courseCode && (
                            <p className="text-green-700 font-semibold text-sm">
                              {course.courseCode}
                            </p>
                          )}

                          {course.batchName && (
                            <p className="text-xs text-gray-500 mt-1">
                              {course.batchName}
                            </p>
                          )}

                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>
            ) : (
              <EmptyMessage message="No courses available." />
            )}

          </div>

        </div>
      ),
    },

    /*
    ============================================================
    ATTENDANCE
    ============================================================
    */

    {
      key: "attendance",
      title: "Attendance",
      value: `${summary.attendancePercentage ?? 0}%`,
      icon: <FaClipboardCheck />,
      bg: "bg-purple-600",

      details: (
        <div className="space-y-4">

          <DetailRow
            label="Attendance"
            value={`${summary.attendancePercentage ?? 0}%`}
          />

          <DetailRow
            label="Total Attendance"
            value={
              summary.totalAttendance ?? 0
            }
          />

          <DetailRow
            label="Present"
            value={
              summary.presentAttendance ?? 0
            }
          />

          <DetailRow
            label="Absent"
            value={
              summary.absentAttendance ?? 0
            }
          />

          <DetailList
            title="Recent Attendance"
            data={dashboard.recentAttendance}
            renderItem={(attendance) => (
              <div className="bg-purple-50 rounded-xl p-4 flex justify-between items-center">

                <div>
                  <p className="font-semibold text-slate-800">
                    {attendance.className ||
                      attendance.courseName ||
                      "Attendance"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {attendance.date || "N/A"}
                  </p>
                </div>

                <span className="bg-purple-100 text-purple-700 px-3 py-2 rounded-lg font-semibold">
                  {attendance.percentage !==
                  undefined
                    ? `${attendance.percentage}%`
                    : attendance.status ||
                      "N/A"}
                </span>

              </div>
            )}
          />

        </div>
      ),
    },

    /*
    ============================================================
    ASSIGNMENTS
    ============================================================
    */

    {
      key: "assignments",
      title: "Assignments",
      value: summary.totalAssignments ?? 0,
      icon: <FaTasks />,
      bg: "bg-orange-500",

      details: (
        <div className="space-y-4">

          <DetailRow
            label="Total Assignments"
            value={
              summary.totalAssignments ?? 0
            }
          />

          <DetailList
            title="Pending Assignments"
            data={dashboard.pendingAssignments}
            renderItem={(assignment) => (
              <div className="bg-orange-50 rounded-xl p-4">

                <div className="flex justify-between gap-3">

                  <div>
                    <p className="font-semibold text-slate-800">
                      {assignment.title ||
                        "Assignment"}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {assignment.className ||
                        assignment.courseName ||
                        assignment.batchName ||
                        ""}
                    </p>
                  </div>

                  <span className="bg-orange-100 text-orange-700 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap">
                    {assignment.dueDate ||
                      "Pending"}
                  </span>

                </div>

              </div>
            )}
          />

        </div>
      ),
    },

    /*
    ============================================================
    EXAMS
    ============================================================
    */

    {
      key: "exams",
      title: "Exams",
      value: summary.totalExams ?? 0,
      icon: <FaGraduationCap />,
      bg: "bg-pink-600",

      details: (
        <div className="space-y-4">

          <DetailRow
            label="Total Exams"
            value={summary.totalExams ?? 0}
          />

          <DetailList
            title="Upcoming Exams"
            data={dashboard.upcomingExams}
            renderItem={(exam) => (
              <div className="bg-pink-50 rounded-xl p-4">

                <div className="flex justify-between gap-4">

                  <div>
                    <p className="font-semibold text-slate-800">
                      {exam.examName ||
                        "Exam"}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {exam.courseName ||
                        "N/A"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {exam.batchName || ""}
                    </p>
                  </div>

                  <div className="text-right">

                    <p className="text-pink-700 font-semibold">
                      {exam.examDate ||
                        "N/A"}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {exam.totalMarks
                        ? `${exam.totalMarks} Marks`
                        : ""}
                    </p>

                  </div>

                </div>

              </div>
            )}
          />

        </div>
      ),
    },

    /*
    ============================================================
    RESULTS
    ============================================================
    */

    {
      key: "results",
      title: "Results",
      value: summary.totalResults ?? 0,
      icon: <FaChartBar />,
      bg: "bg-indigo-600",

      details: (
        <div className="space-y-4">

          <DetailRow
            label="Total Results"
            value={
              summary.totalResults ?? 0
            }
          />

          <DetailList
            title="Recent Results"
            data={dashboard.recentResults}
            renderItem={(result) => (
              <div className="bg-indigo-50 rounded-xl p-4 flex justify-between items-center">

                <div>
                  <p className="font-semibold text-slate-800">
                    {result.studentName ||
                      "Student"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {result.examName ||
                      "Exam"}
                  </p>
                </div>

                <div className="text-right">

                  <p className="font-bold text-indigo-700">
                    {result.marksObtained ??
                      0}
                  </p>

                  <p className="text-xs text-gray-500">
                    Grade:{" "}
                    {result.grade ||
                      "N/A"}
                  </p>

                </div>

              </div>
            )}
          />

        </div>
      ),
    },

    /*
    ============================================================
    SUBMISSIONS
    ============================================================
    */

    {
      key: "submissions",
      title: "Submissions",
      value:
        summary.totalSubmissions ??
        submissionSummary.totalSubmissions ??
        0,

      icon: <FaFileAlt />,
      bg: "bg-cyan-600",

      details: (
        <div className="space-y-4">

          <DetailRow
            label="Total Submissions"
            value={
              submissionSummary.totalSubmissions ??
              0
            }
          />

          <DetailRow
            label="Pending"
            value={
              submissionSummary.pendingSubmissions ??
              0
            }
          />

          <DetailRow
            label="Checked"
            value={
              submissionSummary.checkedSubmissions ??
              0
            }
          />

          <DetailList
            title="Recent Submissions"
            data={dashboard.recentSubmissions}
            renderItem={(submission) => (
              <div className="bg-cyan-50 rounded-xl p-4 flex justify-between items-center">

                <div>
                  <p className="font-semibold text-slate-800">
                    {submission.studentName ||
                      "Student"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {submission.assignmentTitle ||
                      submission.title ||
                      "Submission"}
                  </p>
                </div>

                <span className="bg-cyan-100 text-cyan-700 px-3 py-2 rounded-lg text-xs font-semibold">
                  {submission.status ||
                    "Submitted"}
                </span>

              </div>
            )}
          />

        </div>
      ),
    },

    /*
    ============================================================
    QUESTIONS
    ============================================================
    */

    {
      key: "questions",
      title: "Questions",
      value:
        summary.totalQuestions ??
        questionSummary.totalQuestions ??
        0,

      icon: <FaQuestionCircle />,
      bg: "bg-yellow-500",

      details: (
        <div className="space-y-4">

          <DetailRow
            label="Total Questions"
            value={
              questionSummary.totalQuestions ??
              0
            }
          />

          <DetailRow
            label="Student Answers"
            value={
              questionSummary.totalStudentAnswers ??
              0
            }
          />

          <div className="bg-yellow-50 rounded-xl p-4">
            <p className="text-sm text-yellow-700">
              Question and student answer
              statistics are shown here.
            </p>
          </div>

        </div>
      ),
    },
  ];

  return (
    <AdminLayout>

      <div className="w-full bg-slate-50 min-h-screen p-4 md:p-5">

        {/* =====================================================
            FIRST 4 CARDS
        ====================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {cards.slice(0, 4).map((card) => (
            <DashboardCard
              key={card.key}
              card={card}
              onClick={() =>
                setSelectedCard(card)
              }
            />
          ))}

        </div>

        {/* =====================================================
            NEXT 4 CARDS
        ====================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">

          {cards.slice(4, 8).map((card) => (
            <DashboardCard
              key={card.key}
              card={card}
              onClick={() =>
                setSelectedCard(card)
              }
            />
          ))}

        </div>

        {/* =====================================================
            TODAY CLASSES + UPCOMING EXAMS
        ====================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">

          <DashboardSection
            title="Today's Classes"
            icon={<FaCalendarAlt />}
            color="blue"
          >
            {dashboard.todayClasses?.length >
            0 ? (
              dashboard.todayClasses.map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 rounded-xl p-4 mb-3 flex justify-between items-center"
                  >

                    <div>
                      <p className="font-semibold text-slate-800">
                        {item.subject ||
                          item.courseName ||
                          "Class"}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.className ||
                          item.batchName ||
                          ""}
                      </p>
                    </div>

                    <div className="text-blue-700 font-bold">
                      {item.time ||
                        `${item.startTime || ""}${
                          item.endTime
                            ? ` - ${item.endTime}`
                            : ""
                        }`}
                    </div>

                  </div>
                )
              )
            ) : (
              <EmptyMessage message="No classes scheduled for today." />
            )}
          </DashboardSection>

          <DashboardSection
            title="Upcoming Exams"
            icon={<FaGraduationCap />}
            color="pink"
          >
            {dashboard.upcomingExams?.length >
            0 ? (
              dashboard.upcomingExams.map(
                (exam) => (
                  <div
                    key={exam.examId}
                    className="bg-pink-50 rounded-xl p-4 mb-3 flex justify-between"
                  >

                    <div>
                      <p className="font-semibold text-slate-800">
                        {exam.examName}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {exam.courseName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {exam.batchName}
                      </p>
                    </div>

                    <div className="text-right">

                      <p className="font-semibold text-pink-700">
                        {exam.examDate}
                      </p>

                      <p className="text-xs text-gray-500">
                        {exam.totalMarks
                          ? `${exam.totalMarks} Marks`
                          : ""}
                      </p>

                    </div>

                  </div>
                )
              )
            ) : (
              <EmptyMessage message="No upcoming exams." />
            )}
          </DashboardSection>

        </div>

        {/* =====================================================
            ASSIGNMENTS + STUDENTS
        ====================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">

          <DashboardSection
            title="Pending Assignments"
            icon={<FaTasks />}
            color="orange"
          >
            {dashboard.pendingAssignments?.length >
            0 ? (
              dashboard.pendingAssignments.map(
                (item) => (
                  <div
                    key={item.assignmentId}
                    className="bg-orange-50 rounded-xl p-4 mb-3 flex justify-between items-center"
                  >

                    <div>
                      <p className="font-semibold text-slate-800">
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.className ||
                          item.courseName ||
                          item.batchName ||
                          ""}
                      </p>
                    </div>

                    <span className="bg-orange-100 text-orange-700 px-3 py-2 rounded-lg text-xs font-semibold">
                      {item.dueDate ||
                        "Pending"}
                    </span>

                  </div>
                )
              )
            ) : (
              <EmptyMessage message="No pending assignments." />
            )}
          </DashboardSection>

          <DashboardSection
            title="Recent Students"
            icon={<FaUserGraduate />}
            color="blue"
          >
            {dashboard.recentStudents?.length >
            0 ? (
              dashboard.recentStudents.map(
                (student, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 rounded-xl p-4 mb-3 flex justify-between items-center"
                  >

                    <div>
                      <p className="font-semibold text-slate-800">
                        {student.studentName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {student.courseName ||
                          ""}
                        {student.batchName
                          ? ` • ${student.batchName}`
                          : ""}
                      </p>
                    </div>

                    <div className="text-right">

                      <p className="text-blue-700 font-semibold">
                        {student.rollNumber ||
                          ""}
                      </p>

                      <p className="text-xs text-gray-500">
                        {student.mobileNumber ||
                          ""}
                      </p>

                    </div>

                  </div>
                )
              )
            ) : (
              <EmptyMessage message="No recent students." />
            )}
          </DashboardSection>

        </div>

        {/* =====================================================
            RECENT ATTENDANCE + RESULTS
        ====================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">

          <DashboardSection
            title="Recent Attendance"
            icon={<FaClipboardCheck />}
            color="purple"
          >
            {dashboard.recentAttendance?.length >
            0 ? (
              dashboard.recentAttendance.map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-purple-50 rounded-xl p-4 mb-3 flex justify-between items-center"
                  >

                    <div>
                      <p className="font-semibold text-slate-800">
                        {item.className ||
                          item.courseName ||
                          "Attendance"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.date || ""}
                      </p>
                    </div>

                    <span className="bg-purple-100 text-purple-700 px-3 py-2 rounded-lg font-semibold">
                      {item.percentage !==
                      undefined
                        ? `${item.percentage}%`
                        : item.status || ""}
                    </span>

                  </div>
                )
              )
            ) : (
              <EmptyMessage message="No recent attendance data." />
            )}
          </DashboardSection>

          <DashboardSection
            title="Recent Results"
            icon={<FaChartBar />}
            color="indigo"
          >
            {dashboard.recentResults?.length >
            0 ? (
              dashboard.recentResults.map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-indigo-50 rounded-xl p-4 mb-3 flex justify-between items-center"
                  >

                    <div>
                      <p className="font-semibold text-slate-800">
                        {item.studentName ||
                          "Student"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.examName || ""}
                      </p>
                    </div>

                    <div className="text-right">

                      <p className="font-bold text-indigo-700">
                        {item.marksObtained ??
                          0}
                      </p>

                      <p className="text-xs text-gray-500">
                        Grade:{" "}
                        {item.grade || "N/A"}
                      </p>

                    </div>

                  </div>
                )
              )
            ) : (
              <EmptyMessage message="No recent results." />
            )}
          </DashboardSection>

        </div>

        {/* =====================================================
            SUBMISSIONS + NOTICES
        ====================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">

          <DashboardSection
            title="Recent Submissions"
            icon={<FaFileAlt />}
            color="cyan"
          >
            {dashboard.recentSubmissions?.length >
            0 ? (
              dashboard.recentSubmissions.map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-cyan-50 rounded-xl p-4 mb-3 flex justify-between items-center"
                  >

                    <div>
                      <p className="font-semibold text-slate-800">
                        {item.studentName ||
                          "Student"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.assignmentTitle ||
                          item.title ||
                          "Submission"}
                      </p>
                    </div>

                    <span className="bg-cyan-100 text-cyan-700 px-3 py-2 rounded-lg text-xs font-semibold">
                      {item.status ||
                        "Submitted"}
                    </span>

                  </div>
                )
              )
            ) : (
              <EmptyMessage message="No recent submissions." />
            )}
          </DashboardSection>

          <DashboardSection
            title="Recent Notices"
            icon={<FaBullhorn />}
            color="red"
          >
            {dashboard.recentNotices?.length >
            0 ? (
              dashboard.recentNotices.map(
                (notice) => (
                  <div
                    key={notice.noticeId}
                    className="bg-red-50 rounded-xl p-4 mb-3"
                  >

                    <div className="flex justify-between gap-3">

                      <div>
                        <p className="font-semibold text-slate-800">
                          {notice.title}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          {notice.message}
                        </p>
                      </div>

                      <span className="text-xs bg-red-100 text-red-700 px-3 py-2 rounded-lg whitespace-nowrap">
                        {notice.date}
                      </span>

                    </div>

                  </div>
                )
              )
            ) : (
              <EmptyMessage message="No recent notices." />
            )}
          </DashboardSection>

        </div>

        {/* =====================================================
            CARD DETAILS MODAL
        ====================================================== */}

        {selectedCard && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
            onClick={() =>
              setSelectedCard(null)
            }
          >

            <div
              className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* =================================================
                  MODAL HEADER
              ================================================= */}

              <div
                className={`${selectedCard.bg} px-6 py-5 text-white flex justify-between items-center flex-shrink-0`}
              >

                <div className="flex items-center gap-4">

                  <div className="text-3xl">
                    {selectedCard.icon}
                  </div>

                  <div>

                    <h2 className="text-2xl font-bold">
                      {selectedCard.title}
                    </h2>

                    <p className="text-sm text-white/80 mt-1">
                      Total:{" "}
                      {selectedCard.value}
                    </p>

                  </div>

                </div>

                {/* X BUTTON */}

                <button
                  type="button"
                  onClick={() =>
                    setSelectedCard(null)
                  }
                  className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xl transition"
                >
                  <FaTimes />
                </button>

              </div>

              {/* =================================================
                  MODAL BODY
              ================================================= */}

              <div className="p-6 overflow-y-auto flex-1 min-h-0">
                {selectedCard.details}
              </div>

              {/* =================================================
                  MODAL FOOTER
              ================================================= */}

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end flex-shrink-0">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedCard(null)
                  }
                  className="bg-slate-800 text-white px-7 py-3 rounded-xl font-semibold hover:bg-slate-700 transition"
                >
                  Close
                </button>

              </div>

            </div>

          </div>
        )}

      </div>

    </AdminLayout>
  );
}

/*
============================================================
SUMMARY CARD
============================================================
*/

function DashboardCard({ card, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        ${card.bg}
        min-h-[145px]
        rounded-2xl
        px-6
        py-5
        text-white
        cursor-pointer
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-200
        relative
        overflow-hidden
        group
      `}
    >

      <div className="relative z-10">

        <p className="text-sm font-semibold text-white/90">
          {card.title}
        </p>

        <h2 className="text-4xl font-bold mt-4">
          {card.value}
        </h2>

      </div>

      <div
        className="
          absolute
          right-5
          top-5
          text-4xl
          text-white/30
          group-hover:text-white/50
          group-hover:scale-110
          transition-all
        "
      >
        {card.icon}
      </div>

      <div
        className="
          absolute
          -right-8
          -bottom-8
          w-28
          h-28
          rounded-full
          bg-white/10
        "
      />

    </div>
  );
}

/*
============================================================
DETAIL ROW
============================================================
*/

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 pb-3">

      <span className="text-gray-500">
        {label}
      </span>

      <span className="font-semibold text-slate-800">
        {value}
      </span>

    </div>
  );
}

/*
============================================================
DETAIL LIST
============================================================
*/

function DetailList({
  title,
  data,
  renderItem,
}) {
  return (
    <div>

      <h3 className="font-semibold text-slate-800 mb-3">
        {title}
      </h3>

      {data?.length > 0 ? (
        <div className="space-y-3">

          {data.map((item, index) => (
            <div key={index}>
              {renderItem(item, index)}
            </div>
          ))}

        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-400">
          No records available.
        </div>
      )}

    </div>
  );
}

/*
============================================================
DASHBOARD SECTION
============================================================
*/

function DashboardSection({
  title,
  icon,
  color,
  children,
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    pink: "bg-pink-50 text-pink-600",
    indigo: "bg-indigo-50 text-indigo-600",
    cyan: "bg-cyan-50 text-cyan-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div
      className={`
        ${
          colorClasses[color]?.split(
            " "
          )[0] || "bg-white"
        }
        rounded-3xl
        p-5
        shadow-sm
        border
        border-white
      `}
    >

      <div className="flex items-center gap-3 mb-5">

        <div
          className={`
            w-10
            h-10
            rounded-xl
            flex
            items-center
            justify-center
            ${
              colorClasses[color] || ""
            }
          `}
        >
          {icon}
        </div>

        <h2 className="text-xl font-bold text-slate-800">
          {title}
        </h2>

      </div>

      {children}

    </div>
  );
}

/*
============================================================
EMPTY MESSAGE
============================================================
*/

function EmptyMessage({ message }) {
  return (
    <div className="py-8 text-center text-gray-400">
      {message}
    </div>
  );
}

export default Dashboard;

