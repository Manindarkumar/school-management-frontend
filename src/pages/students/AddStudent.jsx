import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AddStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    password: "",
    courseId: "",
    batchId: "",
    semester: "",
    fatherName: "",
    motherName: "",
    guardianContact: "",
  });

  const labelStyle = "font-semibold text-lg";
  const inputStyle = "w-full border p-3 rounded-xl mt-2 text-lg";

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiService.createStudent(student);
      console.log(response.data);
      alert("Student Added Successfully");

      setStudent({ firstName: "", middleName: "", lastName: "", mobileNumber: "", address: "", gender: "", dateOfBirth: "", email: "", password: "", courseId: "", batchId: "", semester: "", fatherName: "", motherName: "", guardianContact: "", });
      //navigate("/admin/students");
    } catch (error) {
      console.error(error);
      alert("Failed to add student");
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl font-semibold"
        >
          ← Back
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Add Student</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-md p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className={labelStyle}>First Name</label>
            <input
              name="firstName"
              placeholder="Enter First Name"
              value={student.firstName}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Middle Name</label>
            <input
              name="middleName"
              placeholder="Enter Middle Name"
              value={student.middleName}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Last Name</label>
            <input
              name="lastName"
              placeholder="Enter Last Name"
              value={student.lastName}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Mobile Number</label>
            <input
              name="mobileNumber"
              placeholder="Enter Mobile Number"
              value={student.mobileNumber}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Gender</label>
            <select
              name="gender"
              value={student.gender}
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className={labelStyle}>Date Of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={student.dateOfBirth}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={student.email}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={student.password}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Course ID</label>
            <input
              type="number"
              name="courseId"
              placeholder="Enter Course ID"
              value={student.courseId}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Batch ID</label>
            <input
              type="number"
              name="batchId"
              placeholder="Enter Batch ID"
              value={student.batchId}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Semester</label>
            <input
              type="number"
              name="semester"
              placeholder="Enter Semester"
              value={student.semester}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Father Name</label>
            <input
              name="fatherName"
              placeholder="Enter Father Name"
              value={student.fatherName}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Mother Name</label>
            <input
              name="motherName"
              placeholder="Enter Mother Name"
              value={student.motherName}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Guardian Contact</label>
            <input
              name="guardianContact"
              placeholder="Enter Guardian Contact"
              value={student.guardianContact}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelStyle}>Address</label>
            <textarea
              name="address"
              rows="4"
              placeholder="Enter Address"
              value={student.address}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg"
            >
              Save Student
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddStudent;
