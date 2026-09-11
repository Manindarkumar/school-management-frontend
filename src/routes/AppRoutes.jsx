// // import {
// //   Routes,
// //   Route
// // } from "react-router-dom";

// // // Auth
// // import Login
// // from "../pages/auth/LoginPage";

// // // Admin Dashboard
// // import AdminDashboard
// // from "../pages/dashboard/Dashboard";

// // // Teacher Dashboard
// // import TeacherDashboard
// // from "../pages/teachers/Teacherdashboard";

// // // Student Dashboard
// // import StudentDashboard
// // from "../pages/students/Studentashboard";

// // // Teachers
// // import TeacherList
// // from "../pages/teachers/TeacherList";

// // import AddTeacher
// // from "../pages/teachers/AddTeacher";

// // import EditTeacher
// // from "../pages/teachers/EditTeacher";

// // import TeacherProfile
// // from "../pages/teachers/TeacherProfile";

// // // Students
// // import StudentList
// // from "../pages/students/StudentsList";

// // import AddStudent
// // from "../pages/students/AddStudent";

// // import EditStudent
// // from "../pages/students/EditStudent";

// // import StudentProfile
// // from "../pages/students/StudentProfile";

// // // Courses
// // import CourseList
// // from "../pages/courses/CourseList";

// // import AddCourse
// // from "../pages/courses/AddCourse";

// // import EditCourse
// // from "../pages/courses/EditCourse";

// // import CourseDetails
// // from "../pages/courses/CourseDetails";

// // // Attendance
// // import AttendanceList
// // from "../pages/attendance/AttendanceList";

// // import MarkAttendance
// // from "../pages/attendance/MarkAttendance";

// // import AttendanceDetails
// // from "../pages/attendance/AttendanceDetails";

// // import EditAttendance
// // from "../pages/attendance/EditAttendance";

// // // Exams
// // import ExamList
// // from "../pages/exams/ExamList";

// // import AddExam
// // from "../pages/exams/AddExam";

// // import EditExam
// // from "../pages/exams/EditExam";

// // import ExamDetails
// // from "../pages/exams/ExamDetails";

// // // Results
// // import ResultList
// // from "../pages/results/ResultList";

// // import AddResult
// // from "../pages/results/AddResult";

// // import EditResult
// // from "../pages/results/EditResult";

// // import ResultDetails
// // from "../pages/results/ResultDetails";

// // // Timetable
// // import TimetableList
// // from "../pages/timetable/TimetableList";

// // import AddTimetable
// // from "../pages/timetable/AddTimetable";

// // import EditTimetable
// // from "../pages/timetable/EditTimetable";

// // import TimetableDetails
// // from "../pages/timetable/TimetableDetails";

// // // Notice Board
// // import NoticeList
// // from "../pages/noticeboard/NoticeList";

// // import AddNotice
// // from "../pages/noticeboard/AddNotice";

// // import EditNotice
// // from "../pages/noticeboard/EditNotice";

// // import NoticeDetails
// // from "../pages/noticeboard/NoticeDetails";

// // // Assignments
// // import AssignmentList
// // from "../pages/assignments/AssignmentList";

// // import AddAssignment
// // from "../pages/assignments/AddAssignment";

// // import EditAssignment
// // from "../pages/assignments/EditAssignment";

// // import AssignmentDetails
// // from "../pages/assignments/AssignmentDetails";

// // // Submissions
// // import SubmissionList
// // from "../pages/submissions/SubmissionList";

// // import AddSubmission
// // from "../pages/submissions/AddSubmission";

// // import EditSubmission
// // from "../pages/submissions/EditSubmission";

// // import SubmissionDetails
// // from "../pages/submissions/SubmissionDetails";

// // // Grades
// // import GradeList
// // from "../pages/grades/GradeList";

// // import AddGrade
// // from "../pages/grades/AddGrade";

// // import EditGrade
// // from "../pages/grades/EditGrade";

// // import GradeDetails
// // from "../pages/grades/GradeDetails";

// // // Batches
// // import BatchList
// // from "../pages/batches/BatchList";

// // import AddBatch
// // from "../pages/batches/AddBatch";

// // import EditBatch
// // from "../pages/batches/EditBatch";

// // import BatchDetails
// // from "../pages/batches/BatchDetails";

// // // Teacher Courses
// // import TeacherCourseList
// // from "../pages/teachercourses/TeacherCourseList";

// // import EditTeacherCourse
// // from "../pages/teachercourses/EditTeacherCourse";

// // import TeacherCourseDetails
// // from "../pages/teachercourses/TeacherCourseDetails";

// // import AddTeacherCourse
// // from "../pages/teachercourses/AddTeacherCourse";

// // // Questions
// // import QuestionList
// // from "../pages/questions/QuestionList";

// // import AddQuestion
// // from "../pages/questions/AddQuestion";

// // import EditQuestion
// // from "../pages/questions/EditQuestion";

// // import QuestionDetails
// // from "../pages/questions/QuestionDetails";

// // // Student Answers
// // import StudentAnswerList
// // from "../pages/studentanswers/StudentAnswerList";

// // import AddStudentAnswer
// // from "../pages/studentanswers/AddStudentAnswer";

// // import EditStudentAnswer
// // from "../pages/studentanswers/EditStudentAnswer";

// // import StudentAnswerDetails
// // from "../pages/studentanswers/StudentAnswerDetails";

// // // Leave Requests
// // import LeaveRequestList
// // from "../pages/leaverequests/LeaveRequestList";

// // import AddLeaveRequest
// // from "../pages/leaverequests/AddLeaveRequest";

// // import EditLeaveRequest
// // from "../pages/leaverequests/EditLeaveRequest";

// // import LeaveRequestDetails
// // from "../pages/leaverequests/LeaveRequestDetails";

// // // Holidays
// // import HolidayList
// // from "../pages/holidays/HolidayList";

// // import AddHoliday
// // from "../pages/holidays/AddHoliday";

// // import EditHoliday
// // from "../pages/holidays/EditHoliday";

// // import HolidayDetails
// // from "../pages/holidays/HolidayDetails";

// // function AppRoutes() {

// //   return (

// //     <Routes>

// //       {/* Auth */}
// //       <Route
// //         path="/"
// //         element={<Login />}
// //       />

// //       <Route
// //         path="/login"
// //         element={<Login />}
// //       />

// //       {/* Dashboard Routes */}
// //       <Route
// //         path="/admin-dashboard"
// //         element={<AdminDashboard />}
// //       />

// //       <Route
// //         path="/teacher-dashboard"
// //         element={<TeacherDashboard />}
// //       />

// //       <Route
// //         path="/student-dashboard"
// //         element={<StudentDashboard />}
// //       />

// //       {/* Teachers */}
// //       <Route
// //         path="/teachers"
// //         element={<TeacherList />}
// //       />

// //       <Route
// //         path="/add-teacher"
// //         element={<AddTeacher />}
// //       />

// //       <Route
// //         path="/edit-teacher"
// //         element={<EditTeacher />}
// //       />

// //       <Route
// //         path="/teacher-profile"
// //         element={<TeacherProfile />}
// //       />

// //       {/* Students */}
// //       <Route
// //         path="/students"
// //         element={<StudentList />}
// //       />

// //       <Route
// //         path="/add-student"
// //         element={<AddStudent />}
// //       />

// //       <Route
// //         path="/edit-student"
// //         element={<EditStudent />}
// //       />

// //       <Route
// //         path="/student-profile/:id"
// //         element={<StudentProfile />}
// //       />

// //       {/* Continue remaining routes same as your existing code */}

// //     </Routes>

// //   );
// // }

// // export default AppRoutes;

// import { Routes, Route } from "react-router-dom";

// // Auth
// import Login from "../pages/auth/LoginPage";

// // Role Based Routes
// import AdminRoutes from "./AdminRoutes";
// import TeacherRoutes from "./TeacherRoutes";
// import StudentRoutes from "./StudentRoutes";

// function AppRoutes() {
//   return (
//     <Routes>
//       {/* Login */}
//       <Route path="/" element={<Login />} />
//       <Route path="/login" element={<Login />} />

//       {/* Admin */}
//       <Route path="/admin/*" element={<AdminRoutes />} />

//       {/* Teacher */}
//       <Route path="/teacher/*" element={<TeacherRoutes />} />

//       {/* Student */}
//       <Route path="/student/*" element={<StudentRoutes />} />
//     </Routes>
//   );
// }

// export default AppRoutes;

import { Routes, Route } from "react-router-dom";

// Auth
import Login from "../pages/auth/LoginPage";

// Role-based route groups
import AdminRoutes from "./AdminRoute";
import TeacherRoutes from "./TeacherRoute";
import StudentRoutes from "./StudentRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Admin routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* Teacher routes */}
      <Route path="/teacher/*" element={<TeacherRoutes />} />

      {/* Student routes */}
      <Route path="/student/*" element={<StudentRoutes />} />
    </Routes>
  );
}

export default AppRoutes;
