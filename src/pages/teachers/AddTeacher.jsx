import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function AddTeacher() {
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    subject: "",
    qualification: "",
    experience: "",
  });

  const handleChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teacher.firstName.trim()) {
      alert("Please enter First Name");
      return;
    }

    if (!teacher.lastName.trim()) {
      alert("Please enter Last Name");
      return;
    }

    if (!teacher.email.trim()) {
      alert("Please enter Email");
      return;
    }

    if (!teacher.password.trim()) {
      alert("Please enter Password");
      return;
    }

    if (!teacher.mobileNumber.trim()) {
      alert("Please enter Mobile Number");
      return;
    }

    if (!/^[0-9]{10}$/.test(teacher.mobileNumber)) {
      alert("Mobile Number must be 10 digits");
      return;
    }

    if (!teacher.gender) {
      alert("Please select Gender");
      return;
    }

    if (!teacher.dateOfBirth) {
      alert("Please select Date of Birth");
      return;
    }

    if (!teacher.subject.trim()) {
      alert("Please enter Subject");
      return;
    }

    if (!teacher.qualification.trim()) {
      alert("Please enter Qualification");
      return;
    }

    if (!teacher.experience) {
      alert("Please enter Experience");
      return;
    }

    if (!teacher.address.trim()) {
      alert("Please enter Address");
      return;
    }

    try {
      console.log("Sending teacher data:", teacher);

      const response = await apiService.createTeacher(teacher);

      console.log("Teacher created:", response);

      alert("Teacher Added Successfully");

      setTeacher({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
        mobileNumber: "",
        address: "",
        gender: "",
        dateOfBirth: "",
        subject: "",
        qualification: "",
        experience: "",
      })
      // navigate("/teachers");
    } catch (error) {
      console.error("Create teacher failed:", error);
      alert("Failed to add teacher");
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
        <h1 className="text-4xl font-bold">Add Teacher</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-md p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              value={teacher.firstName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={teacher.middleName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={teacher.lastName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={teacher.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={teacher.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={teacher.mobileNumber}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Gender</label>
            <select
              name="gender"
              value={teacher.gender}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={teacher.dateOfBirth}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Subject</label>
            <input
              type="text"
              name="subject"
              value={teacher.subject}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Qualification</label>
            <input
              type="text"
              name="qualification"
              value={teacher.qualification}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Experience (Years)</label>
            <input
              type="number"
              name="experience"
              value={teacher.experience}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold">Address</label>
            <textarea
              name="address"
              rows="4"
              value={teacher.address}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Save Teacher
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddTeacher;
