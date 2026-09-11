import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);

  const [student, setStudent] = useState({
    fullName: "",
    studentId: "",
    email: "",
    mobileNumber: "",
    gender: "",
    address: "",
    dateOfBirth: "",
    fatherName: "",
    motherName: "",
    guardianContact: "",
    courseName: "",
    branchName: "",
  });

  // ---------------- FETCH STUDENT ----------------
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await apiService.getStudentById(id);

        if (res.data.status === 0) {
          const data = res.data.data;

          console.log("COURSE DB:", data.academicInfo.courseName);
          console.log("COURSES LIST:", courses);

          setStudent({
            fullName: data.studentInfo.fullName || "",
            studentId: data.studentInfo.studentId || "",
            email: data.contactInfo.email || "",
            mobileNumber: data.contactInfo.mobileNumber || "",
            gender: data.studentInfo.gender || "",
            address: data.contactInfo.address || "",
            dateOfBirth: data.studentInfo.dateOfBirth || "",
            fatherName: data.guardianInfo.fatherName || "",
            motherName: data.guardianInfo.motherName || "",
            guardianContact: data.guardianInfo.guardianContact || "",
            courseName: data.academicInfo.courseName || "",
            branchName: data.academicInfo.branchName || "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const courseList =
    courses.length > 0
      ? courses
      : student.courseName
        ? [{ id: 1, courseName: student.courseName }]
        : [];

  const branchList =
    branches.length > 0
      ? branches
      : student.branchName
        ? [{ id: 1, branchName: student.branchName }]
        : [];
  // ---------------- DROPDOWNS ----------------
  useEffect(() => {
    const loadDropdowns = async () => {
      const c = await apiService.getCourses();
      const b = await apiService.getBranches();

      setCourses(c.data.data || []);
      setBranches(b.data.data || []);
    };

    loadDropdowns();
  }, []);

  // ---------------- CHANGE ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        firstName: student.fullName, // adjust if split name needed
        middleName: "",
        lastName: "",

        address: student.address,
        mobileNumber: student.mobileNumber,
        gender: student.gender,
        dateOfBirth: student.dateOfBirth,

        courseId: student.courseId || 1, // IMPORTANT
        batchId: student.branchId || 1, // IMPORTANT (your branch = batch)

        semester: "5",

        fatherName: student.fatherName,
        motherName: student.motherName,
        guardianContact: student.guardianContact,
      };

      console.log("UPDATE PAYLOAD:", payload);

      const res = await apiService.editStudent(id, payload);

      console.log("UPDATE RESPONSE:", res);

      if (res?.data?.status === 0) {
        alert("Student updated successfully");
        //navigate("/students");
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* BACK BUTTON (FIXED) */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl font-semibold"
        >
          ← Back
        </button>
      </div>

      {/* TITLE */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Edit Student</h1>
      </div>

      {/* CARD */}
      <div className="bg-white p-8 rounded-3xl shadow-md">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* FULL NAME (TOP LIKE PROFILE) */}
          <div>
            <label className="font-semibold">Full Name</label>
            <input
              name="fullName"
              value={student.fullName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Student Id</label>
            <input
              name="studentId"
              value={student.studentId}
              onChange={handleChange}
              placeholder="Student ID"
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Email</label>
            <input
              name="email"
              value={student.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Phone</label>
            <input
              name="mobileNumber"
              value={student.mobileNumber}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={student.dateOfBirth}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Gender</label>
            <select
              name="gender"
              value={student.gender}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Course</label>
            <select
              name="courseName"
              value={student.courseName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">Select Course</option>

              {courseList.map((c) => (
                <option key={c.id} value={c.courseName}>
                  {c.courseName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold">Branch</label>
            <select
              name="branchName"
              value={student.branchName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">Select Branch</option>

              {branchList.map((b) => (
                <option key={b.id} value={b.branchName}>
                  {b.branchName}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold">Address</label>
            <textarea
              name="address"
              value={student.address}
              onChange={handleChange}
              rows="3"
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Father Name</label>
            <input
              name="fatherName"
              value={student.fatherName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Mother Name</label>
            <input
              name="motherName"
              value={student.motherName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Guardian Contact</label>
            <input
              name="guardianContact"
              value={student.guardianContact}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-500 text-white px-6 py-3 rounded-xl md:col-span-2"
          >
            Update Student
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default EditStudent;
