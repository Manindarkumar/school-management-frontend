import { Routes, Route } from "react-router-dom";

// Dashboard
import AdminDashboard from "../pages/dashboard/Dashboard";

// Teachers
import TeacherList from "../pages/teachers/TeacherList";
import AddTeacher from "../pages/teachers/AddTeacher";
import EditTeacher from "../pages/teachers/EditTeacher";
import TeacherProfile from "../pages/teachers/TeacherProfile";

// Students
import StudentList from "../pages/students/StudentsList";
import AddStudent from "../pages/students/AddStudent";
import EditStudent from "../pages/students/EditStudent";
import StudentProfile from "../pages/students/StudentProfile";

// Courses
import CourseList from "../pages/courses/CourseList";
import AddCourse from "../pages/courses/AddCourse";
import EditCourse from "../pages/courses/EditCourse";
import CourseDetails from "../pages/courses/CourseDetails";

// Attendance
import AttendanceList from "../pages/attendance/AttendanceList";
import MarkAttendance from "../pages/attendance/MarkAttendance";
import AttendanceDetails from "../pages/attendance/AttendanceDetails";
import EditAttendance from "../pages/attendance/EditAttendance";

// Exams
import ExamList from "../pages/exams/ExamList";
import AddExam from "../pages/exams/AddExam";
import EditExam from "../pages/exams/EditExam";
import ExamDetails from "../pages/exams/ExamDetails";

// Results
import ResultList from "../pages/results/ResultList";
import AddResult from "../pages/results/AddResult";
import EditResult from "../pages/results/EditResult";
import ResultDetails from "../pages/results/ResultDetails";

// Timetable
import TimetableList from "../pages/timetable/TimetableList";
import AddTimetable from "../pages/timetable/AddTimetable";
import EditTimetable from "../pages/timetable/EditTimetable";
import TimetableDetails from "../pages/timetable/TimetableDetails";

// Notice
import NoticeList from "../pages/noticeboard/NoticeList";
import AddNotice from "../pages/noticeboard/AddNotice";
import EditNotice from "../pages/noticeboard/EditNotice";
import NoticeDetails from "../pages/noticeboard/NoticeDetails";

// Assignment
import AssignmentList from "../pages/assignments/AssignmentList";
import AddAssignment from "../pages/assignments/AddAssignment";
import EditAssignment from "../pages/assignments/EditAssignment";
import AssignmentDetails from "../pages/assignments/AssignmentDetails";

// Submission
import SubmissionList from "../pages/submissions/SubmissionList";
import AddSubmission from "../pages/submissions/AddSubmission";
import EditSubmission from "../pages/submissions/EditSubmission";
import SubmissionDetails from "../pages/submissions/SubmissionDetails";

// Grades
import GradeList from "../pages/grades/GradeList";
import AddGrade from "../pages/grades/AddGrade";
import EditGrade from "../pages/grades/EditGrade";
import GradeDetails from "../pages/grades/GradeDetails";

// Batches
import BatchList from "../pages/batches/BatchList";
import AddBatch from "../pages/batches/AddBatch";
import EditBatch from "../pages/batches/EditBatch";
import BatchDetails from "../pages/batches/BatchDetails";

// Teacher Courses
import TeacherCourseList from "../pages/teachercourses/TeacherCourseList";
import AddTeacherCourse from "../pages/teachercourses/AddTeacherCourse";
import EditTeacherCourse from "../pages/teachercourses/EditTeacherCourse";
import TeacherCourseDetails from "../pages/teachercourses/TeacherCourseDetails";

// Questions
import QuestionList from "../pages/questions/QuestionList";
import AddQuestion from "../pages/questions/AddQuestion";
import EditQuestion from "../pages/questions/EditQuestion";
import QuestionDetails from "../pages/questions/QuestionDetails";

// Student Answers
import StudentAnswerList from "../pages/studentanswers/StudentAnswerList";
import AddStudentAnswer from "../pages/studentanswers/AddStudentAnswer";
import EditStudentAnswer from "../pages/studentanswers/EditStudentAnswer";
import StudentAnswerDetails from "../pages/studentanswers/StudentAnswerDetails";

// Leave Requests
import LeaveRequestList from "../pages/leaverequests/LeaveRequestList";
import AddLeaveRequest from "../pages/leaverequests/AddLeaveRequest";
import EditLeaveRequest from "../pages/leaverequests/EditLeaveRequest";
import LeaveRequestDetails from "../pages/leaverequests/LeaveRequestDetails";

// Holidays
import HolidayList from "../pages/holidays/HolidayList";
import AddHoliday from "../pages/holidays/AddHoliday";
import EditHoliday from "../pages/holidays/EditHoliday";
import HolidayDetails from "../pages/holidays/HolidayDetails";

// admin profiles
import AdminProfile from "../pages/dashboard/AdminProfile";


function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />

      {/* Students */}
      <Route path="students" element={<StudentList />} />
      <Route path="students/add" element={<AddStudent />} />
      <Route path="students/profile/:id" element={<StudentProfile />} />
      <Route path="students/edit/:id" element={<EditStudent />} />

      {/* Teachers */}
      <Route path="teachers" element={<TeacherList />} />
      <Route path="teachers/add" element={<AddTeacher />} />
      <Route path="teachers/profile/:id" element={<TeacherProfile />} />
      <Route path="teachers/edit/:id" element={<EditTeacher />} />

      {/* Courses */}
      <Route path="courses" element={<CourseList />} />
      <Route path="courses/add" element={<AddCourse />} />
      <Route path="courses/details/:id" element={<CourseDetails />} />
      <Route path="courses/edit/:id" element={<EditCourse />} />

      {/* Attendance */}
      <Route path="attendance" element={<AttendanceList />} />
      <Route path="attendance/add" element={<MarkAttendance />} />
      <Route path="attendance/details/:id" element={<AttendanceDetails />} />
      <Route path="attendance/edit/:id" element={<EditAttendance />} />

       {/* Batch */}
      <Route path="batch" element={<BatchList />} />
      <Route path="batch/add" element={<AddBatch />} />
      <Route path="batch/details/:id" element={<BatchDetails />} />
      <Route path="batch/edit/:id" element={<EditBatch />} />

      {/* Exams */}
      <Route path="exams" element={<ExamList />} />
      <Route path="exams/add" element={<AddExam />} />
      <Route path="exams/details/:id" element={<ExamDetails />} />
      <Route path="exams/edit/:id" element={<EditExam />} />

      {/* Results */}
      <Route path="results" element={<ResultList />} />
      <Route path="results/add" element={<AddResult />} />
      <Route path="results/details/:id" element={<ResultDetails />} />
      <Route path="results/edit/:id" element={<EditResult />} />

      {/* Timetable */}
      <Route path="timetable" element={<TimetableList />} />
      <Route path="timetable/add" element={<AddTimetable />} />
      <Route path="timetable/details/:id" element={<TimetableDetails />} />
      <Route path="timetable/edit/:id" element={<EditTimetable />} />

      {/* Notice Board */}
      <Route path="notice-board" element={<NoticeList />} />
      <Route path="notice-board/add" element={<AddNotice />} />
      <Route path="notice-board/details/:id" element={<NoticeDetails />} />
      <Route path="notice-board/edit/:id" element={<EditNotice />} />

      {/* Assignment */}
      <Route path="assignment" element={<AssignmentList />} />
      <Route path="assignment/add" element={<AddAssignment />} />
      <Route path="assignment/details/:id" element={<AssignmentDetails />} />
      <Route path="assignment/edit/:id" element={<EditAssignment />} />

      {/* Submission */}
      <Route path="submissions" element={<SubmissionList />} />
      <Route path="submissions/add" element={<AddSubmission />} />
      <Route path="submissions/details/:id" element={<SubmissionDetails />} />
      <Route path="submissions/edit/:id" element={<EditSubmission />} />


      {/* Grade */}
      <Route path="grades" element={<GradeList />} />
      <Route path="grades/add" element={<AddGrade />} />
      <Route path="grades/details/:id" element={<GradeDetails />} />
      <Route path="grades/edit/:id" element={<EditGrade />} />

{/* TEACHER COURSE */}
      <Route path="teacherCourse" element={<TeacherCourseList />} />
      <Route path="teacherCourse/add" element={<AddTeacherCourse />} />
      <Route path="teacherCourse/details/:id" element={<TeacherCourseDetails />} />
      <Route path="teacherCourse/edit/:id" element={<EditTeacherCourse />} />

{/* QUESTIONS */}
      <Route path="questions" element={<QuestionList />} />
      <Route path="questions/add" element={<AddQuestion />} />
      <Route path="questions/details/:id" element={<QuestionDetails />} />
      <Route path="questions/edit/:id" element={<EditQuestion />} />

{/* LEAVE REQUEST */}
      <Route path="leaveRequests" element={<LeaveRequestList />} />
      <Route path="leaveRequests/add" element={<AddLeaveRequest />} />
      <Route path="leaveRequests/details/:id" element={<LeaveRequestDetails />} />
      <Route path="leaveRequests/edit/:id" element={<EditLeaveRequest />} />

<Route
  path="leaveRequests/details/:id"
  element={<LeaveRequestDetails />}
/>

<Route
  path="leaveRequests/edit/:id"
  element={<EditLeaveRequest />}
/>


{/* HOLIDAYS */}
      <Route path="holidays" element={<HolidayList />} />
      <Route path="holidays/add" element={<AddHoliday />} />
      <Route path="holidays/details/:id" element={<HolidayDetails />} />
      <Route path="holidays/edit/:id" element={<EditHoliday />} />

      {/*STDEUNT ANSWER */}
      <Route path="student-answers" element={<StudentAnswerList/>}></Route>
      <Route path="student-answers/add" element={<AddStudentAnswer/>}></Route>
      <Route path="student-answers/details/:id" element={<StudentAnswerDetails/>}></Route>
      <Route path="student-answers/edit/:id" element={<EditStudentAnswer/>}></Route>

       <Route path="profile" element={<AdminProfile />}/>


    </Routes>
  );
}
export default AdminRoutes;
