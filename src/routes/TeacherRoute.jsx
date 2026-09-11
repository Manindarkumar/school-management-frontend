// import { Routes, Route } from "react-router-dom";

// // Dashboard
// import TeacherDashboard from "../pages/teachers/Teacherdashboard";

// // Courses
// import CourseList from "../pages/courses/CourseList";

// // Students
// import StudentList from "../pages/students/StudentsList";

// // Attendance
// import AttendanceList from "../pages/attendance/AttendanceList";
// import MarkAttendance from "../pages/attendance/MarkAttendance";
// import AttendanceDetails from "../pages/attendance/AttendanceDetails";
// import EditAttendance from "../pages/attendance/EditAttendance";

// // Assignments
// import AssignmentList from "../pages/assignments/AssignmentList";
// import AddAssignment from "../pages/assignments/AddAssignment";
// import EditAssignment from "../pages/assignments/EditAssignment";
// import AssignmentDetails from "../pages/assignments/AssignmentDetails";

// // Questions
// import QuestionList from "../pages/questions/QuestionList";
// import AddQuestion from "../pages/questions/AddQuestion";
// import EditQuestion from "../pages/questions/EditQuestion";
// import QuestionDetails from "../pages/questions/QuestionDetails";

// // Results
// import ResultList from "../pages/results/ResultList";
// import AddResult from "../pages/results/AddResult";
// import EditResult from "../pages/results/EditResult";
// import ResultDetails from "../pages/results/ResultDetails";

// // Timetable
// import TimetableList from "../pages/timetable/TimetableList";

// // Leave Requests
// import LeaveRequestList from "../pages/leaverequests/LeaveRequestList";
// import AddLeaveRequest from "../pages/leaverequests/AddLeaveRequest";
// import EditLeaveRequest from "../pages/leaverequests/EditLeaveRequest";
// import LeaveRequestDetails from "../pages/leaverequests/LeaveRequestDetails";

// // Profile
// import TeacherProfile from "../pages/teachers/TeacherProfile";
// import TeacherCourseList from "../pages/teachercourses/TeacherCourseList";

// function TeacherRoutes() {
//   return (
//     <Routes>
//       <Route path="Dashboard" element={<TeacherDashboard />} />

//       {/* Courses */}
//       <Route path="courses" element={<CourseList />} />

//       {/* Students */}
//       <Route path="students" element={<StudentList />} />

//       {/* Attendance */}
//       <Route path="attendance" element={<AttendanceList />} />
//       <Route path="attendance/add" element={<MarkAttendance />} />
//       <Route path="attendance/details/:id" element={<AttendanceDetails />} />
//       <Route path="attendance/edit/:id" element={<EditAttendance />} />

//       {/* Assignment */}
//       <Route path="assignment" element={<AssignmentList />} />
//       <Route path="assignment/add" element={<AddAssignment />} />
//       <Route path="assignment/details/:id" element={<AssignmentDetails />} />
//       <Route path="assignment/edit/:id" element={<EditAssignment />} />

//       {/* Questions */}
//       <Route path="questions" element={<QuestionList />} />
//       <Route path="questions/add" element={<AddQuestion />} />
//       <Route path="questions/details/:id" element={<QuestionDetails />} />
//       <Route path="questions/edit/:id" element={<EditQuestion />} />

//       {/* Results */}
//       <Route path="results" element={<ResultList />} />
//       <Route path="results/add" element={<AddResult />} />
//       <Route path="results/details/:id" element={<ResultDetails />} />
//       <Route path="results/edit/:id" element={<EditResult />} />

//       {/* Timetable */}
//       <Route path="timetable" element={<TimetableList />} />

//       {/* Leave Requests */}
//       <Route path="leave-requests" element={<LeaveRequestList />} />
//       <Route path="leave-requests/add" element={<AddLeaveRequest />} />
//       <Route
//         path="leave-requests/details/:id"
//         element={<LeaveRequestDetails />}
//       />
//       <Route path="leave-requests/edit/:id" element={<EditLeaveRequest />} />

//       {/* Teachers Courses */}
//       <Route path="teachers-courses" element={<TeacherCourseList />} />

//       {/* Profile */}
//       <Route path="profile/:id" element={<TeacherProfile />} />
//     </Routes>
//   );
// }

// export default TeacherRoutes;



import { Routes, Route } from "react-router-dom";

// Dashboard
import TeacherDashboard from "../pages/teachers/Teacherdashboard";

// Courses
import CourseList from "../pages/courses/CourseList";

// Students
import StudentList from "../pages/students/StudentsList";

// Attendance
import AttendanceList from "../pages/attendance/AttendanceList";
import MarkAttendance from "../pages/attendance/MarkAttendance";
import AttendanceDetails from "../pages/attendance/AttendanceDetails";
import EditAttendance from "../pages/attendance/EditAttendance";

// Assignments
import AssignmentList from "../pages/assignments/AssignmentList";
import AddAssignment from "../pages/assignments/AddAssignment";
import EditAssignment from "../pages/assignments/EditAssignment";
import AssignmentDetails from "../pages/assignments/AssignmentDetails";

// Questions
import QuestionList from "../pages/questions/QuestionList";
import AddQuestion from "../pages/questions/AddQuestion";
import EditQuestion from "../pages/questions/EditQuestion";
import QuestionDetails from "../pages/questions/QuestionDetails";

// Results
import ResultList from "../pages/results/ResultList";
import AddResult from "../pages/results/AddResult";
import EditResult from "../pages/results/EditResult";
import ResultDetails from "../pages/results/ResultDetails";

// Timetable
import TimetableList from "../pages/timetable/TimetableList";

// Leave Requests
import LeaveRequestList from "../pages/leaverequests/LeaveRequestList";
import AddLeaveRequest from "../pages/leaverequests/AddLeaveRequest";
import EditLeaveRequest from "../pages/leaverequests/EditLeaveRequest";
import LeaveRequestDetails from "../pages/leaverequests/LeaveRequestDetails";

// Profile
import TeacherProfile from "../pages/teachers/TeacherProfile";

// Teacher Courses
import TeacherCourseList
  from "../pages/teachercourses/TeacherCourseList";

import EditTeacherProfile from "../pages/teachers/EditTeacherProfile";


function TeacherRoutes() {

  return (

    <Routes>

      {/* Dashboard */}
      <Route path="dashboard" element={<TeacherDashboard />} />

      {/* Courses */}
      <Route path="courses" element={<CourseList />} />

      {/* Students */}
      <Route path="students" element={<StudentList />} />

      {/* Attendance */}
      <Route path="attendance" element={<AttendanceList />} />
      <Route path="attendance/add" element={<MarkAttendance />} />
      <Route path="attendance/details/:id" element={<AttendanceDetails />} />
      <Route path="attendance/edit/:id" element={<EditAttendance />} />

      {/* Assignments */}
      <Route path="assignment" element={<AssignmentList />} />
      <Route path="assignment/add" element={<AddAssignment />} />
      <Route path="assignment/details/:id" element={<AssignmentDetails />} />
      <Route path="assignment/edit/:id" element={<EditAssignment />} />

      {/* Questions */}
      <Route path="questions" element={<QuestionList />} />
      <Route path="questions/add" element={<AddQuestion />} />
      <Route path="questions/details/:id" element={<QuestionDetails />} />
      <Route path="questions/edit/:id" element={<EditQuestion />} />

      {/* Results */}
      <Route path="results" element={<ResultList />} />
      <Route path="results/add" element={<AddResult />} />
      <Route path="results/details/:id" element={<ResultDetails />} />
      <Route path="results/edit/:id" element={<EditResult />} />

      {/* Timetable */}
      <Route path="timetable" element={<TimetableList />} />

      {/* Leave Requests */}
      <Route path="leave-requests" element={<LeaveRequestList />} />
      <Route path="leave-requests/add" element={<AddLeaveRequest />} />
      <Route
        path="leave-requests/details/:id"
        element={<LeaveRequestDetails />}
      />
      <Route
        path="leave-requests/edit/:id"
        element={<EditLeaveRequest />}
      />

      {/* Teacher Courses */}
      <Route
        path="teachers-courses"
        element={<TeacherCourseList />}
      />

      {/* Profile */}
      <Route
        path="profile"
        element={<TeacherProfile />}
      />
      <Route path="profile/edit" element={<EditTeacherProfile />} />

    </Routes>
  );

}

export default TeacherRoutes;