//import api from "./axiosConfig";

import EditStudent from "../pages/students/EditStudent";
import api from "./axiosConfig";

const apiService = {

  // AUTH
  login: (data) =>
    api.post("/auth/login", data),

  register: (data) =>
    api.post("/auth/register", data),

  getMyAdminProfile: (adminId) =>
   api.get(`/auth/admin-profile?adminId=${adminId}`),

  createStudent: (student) =>
    api.post("student/create-profile", student),

  getAllStudents: () =>
    api.get("/student/all-students"),

  getStudentById: (id) =>
    api.get("/student/my-profile", {
      params: { studentID: id }
    }),
  editStudent: (id, payload) =>
    api.put(`/student/update-student-byId/${id}`, payload),

  deleteStudent: (id) =>
    api.delete(`/student/deleteById/${id}`),
  getStudentDashboard: (studentId) =>
  api.get(`/student/my-dashboard?studentID=${studentId}`),

  getMyStudentProfile: (studentID) => 
   api.get(`/student/my-profile?studentID=${studentID}`),


  updateStudentProfile: (studentId, formData) =>
  api.put(
    `/student/my-profile/update/${studentId}`,
    formData
  ),

  //TEACHER
  getAllTeacher: () =>
    api.get("/teacher/all-teachers"),

  createTeacher: (teacher) =>
    api.post("teacher/create-profile", teacher),

  getTeacherById: (id) =>
    api.get("/teacher/my-profile", {
      params: { teacherId: id }
    }),
  updateTeacher: (id, payload) =>
    api.put(`/teacher/update-teacher-byId/${id}`, payload),

  deleteTeacher: (id) =>
    api.delete(`/teacher/delete-teacher-byId/${id}`),

  getTeacherDashboard: (teacherId) =>
   api.get(`/teacher/dashboard?teacherId=${teacherId}`),

  getMyTeacherProfile: (teacherId) =>
  api.get(`/teacher/my-profile?teacherId=${teacherId}`),

// updateTeacherProfile: (teacherId, formData) =>
//   api.put(
//     `/teacher/my-profile/update/${teacherId}`,
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   ),

updateTeacherProfile: (teacherId, formData) =>
  api.put(
    `/teacher/my-profile/update/${teacherId}`,
    formData
  ),



  //COURSE
  createCourse: (data) =>
    api.post("/course/create-course", data),

  fetchAllCourse: () =>
    api.get(`/course/all`),

  updateCourse: (id, data) =>
    api.put(`/course/update-byId/${id}`, data),

  getCourseById: (id) =>
    api.get(`/course/byId/${id}`),

  getCourseDetails: (id) =>
    api.get("/course/details", {
      params: { id }
    }),

  //ATTANDANCE LIST

  getAttendanceList: () =>
    api.get("/attendance/all"),

  markAttendance: (data) =>
    api.post("/attendance/create", data),

  // getAllBatches: () =>
  //   api.get("/batch/all"),

  getAttendanceById: (id) =>
    api.get("/attendance/details", {
      params: { id }
    }),

  getAttendanceSummary: (studentId) =>
    api.get("/attendance/attendance-summary", {
      params: { studentId }
    }),

  updateAttendance: (id, data) =>
    api.put(`/attendance/update/${id}`, data),

  deleteAttendance: (id) =>
    api.delete(`/attendance/delete/byId/${id}`),


  //CREATE BATCH

  createBatch: (data) =>
    api.post("/batch/create-batch", data),


  getAllBatches: () =>
    api.get("/batch/all"),
  getAllGrade: () =>
    api.get("grade/all-grade"),

  getBatchById: (id) =>
    api.get(`/batch/byId/${id}`),

  updateBatch: (id, data) =>
    api.put(`/batch/update-byId/${id}`, data),


  //CREATE EXAM

  createExam: (data) =>
    api.post("/exams/create", data),

  getAllExams: () =>
    api.get("/exams/all"),

  getExamById: (id) => api.get(`/exams/byId/${id}`),

  updateExam: (id, data) => api.put(`/exams/update/${id}`, data),

  //RESULTS

  createResult: (data) =>
     api.post("/results/create", data),
  getAllResults: () => 
    api.get("/results/all"),

  getResultsById: (id)=>
    api.get(`/results/byId/${id}`),

  updateResult: (id, data)=>
   api.put(`/results/update/${id}`, data),

  deleteResult: (id)=>
    api.delete(`/results/delete/${id}`),

  //TIMETABLE

 createTimetable: (data) => 
   api.post("/timetable/create", data),

  getAllTimetable: () => 
   api.get("/timetable/all"),

  getTimeTableById: (id)=>
    api.get(`/timetable/byId/${id}`),

  updateTimeTable: (id, data)=>
    api.put(`/timetable/update/byId/${id}`, data),
  
  deleteTimetable: (id)=>
    api.delete(`/timetable/byId/${id}`),


  //  NOTICE BOARD


  createNotice: (data)=>
   api.post(`noticeboard/create-notice`,data ),

  getAllNotice: ()=>
    api.get("noticeboard/get/all"),

  updateNotice: (id,data)=>
  api.put(`noticeboard/update/byId/${id}`,data),

  deleteNotice: (id) =>
  api.delete(`/noticeboard/delete/${id}`),

  getNoticeById: (id) =>
  api.get(`/noticeboard/byId/${id}`),


  //AAIGNMENT

  createAssignment: (data) =>
    api.post(`assignments/create`, data),

  getAllAssignments: ()=>
    api.get("assignments/all"),

  getAssignmentById: (id) => 
 api.get(`/assignments/byId/${id}`),

  updateAssignment: (id, data) =>
  api.put(`/assignments/update/${id}`, data),
  
  deleteAssignment: (id) =>
  api.delete(`/assignments/delete/${id}`),

  //SUBMISSION

  createSubmission: (formData) =>
  api.post(`/submission/create`, formData),

  getAllSubmissions: () =>
  api.get("/submission/all"),

  getSubmissionById: (id)=>
    api.get(`/submission/byId/${id}`, id),

 // View submission file
  viewSubmissionFile: (id) =>
    api.get(`/submission/file/${id}`, {
      responseType: "blob",
    }),


  // Download submission file
  downloadSubmissionFile: (id) =>
    api.get(`/submission/download/${id}`, {
      responseType: "blob",
    }),

    updateSubmission: (id, data) =>
  api.put(`/submission/update/${id}`, data),

    deleteSubmission: (id)=>
      api.delete(`/submission/delete/${id}`),

    //GRADE
  createGrade: (data) =>
  api.post("/grade/create", data),

  getAllGrades: ()=>
    api.get(`/grade/all-grade`),

  getGradeById: (id) =>
  api.get(`/grade/${id}`),
  updateGrade: (id, data) =>
  api.put(`/grade/updateById/${id}`, data),


  //TEACHER COURSE AND ASSIGN TO TEACHER
// Assign course to teacher
createTeacherCourse: (data) =>
  api.post(
    "/tecaherCourse/createTeacherCourse",
    data
  ),
  getAllTeacherCourses: () =>
  api.get("/tecaherCourse/all"),

  createQuestion: (data) =>
  api.post("/question/create-question", data),

  getAllQuestions: () =>
  api.get("/question/get-all-questions"),


  //CRATE STDUENT ANSWER
  createStudentAnswer: (data) =>
    api.post("/student-answer/submit", data),
  getAllStudentAnswers: () =>
    api.get("/student-answer/all"),

  getStudentAnswerById: (id) =>
    api.get(`/student-answer/get-answer-by-id/${id}`),

  updateStudentAnswer: (id, data) => 
    api.put(`/student-answer/update-answer/${id}`,data),

  deleteStudentAnswer: (id) =>
     api.delete(`/student-answer/delete-answer/${id}`),


  //leave request 

  createLeaveRequest: (payload) => 
  api.post("/leave/request/apply", payload ),

  getAllLeaveRequests: () =>
  api.get("/leave/request/get-all"),

  getLeaveRequestById: (id) =>
  api.get(`/leave/request/get-by-id/${id}`),

  updateLeaveRequest: (id, payload) =>
  api.put(`/leave/request/update/${id}`, payload),
  deleteLeaveRequest: (id) =>
  api.delete(`/leave/request/delete-by-id/${id}`),

  approveLeaveRequest: (id, payload) =>
  api.put(`/leave/request/approve/${id}`, payload),

rejectLeaveRequest: (id, payload) =>
  api.put(`/leave/request/reject/${id}`, payload),


// HOLIDAY

createHoliday: (payload) =>
  api.post("/holidays/create", payload),

getAllHolidays: () =>
  api.get("/holidays/get-all"),

getHolidayById: (id) =>
  api.get(`/holidays/get-by-id/${id}`),

updateHoliday: (id, payload) =>
  api.put(`/holidays/update/${id}`, payload),
deleteHoliday: (id) =>
  api.delete(`/holidays/delete/${id}`),

 getAdminDashboard: () =>
    api.get("/auth/admin-dashboard"),

}
export default apiService;