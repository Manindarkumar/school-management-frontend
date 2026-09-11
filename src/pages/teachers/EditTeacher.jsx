import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import apiService from "../../api/apiService";

function EditTeacher() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacher();
  }, []);

  const fetchTeacher = async () => {
    try {
      const response = await apiService.getTeacherById(id);

      if (response.data.status === 0) {
        setTeacher(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch teacher", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teacher.firstName.trim()) {
      alert("Enter First Name");
      return;
    }

    if (!teacher.lastName.trim()) {
      alert("Enter Last Name");
      return;
    }

    if (!teacher.email.trim()) {
      alert("Enter Email");
      return;
    }

    try {
      const response = await apiService.updateTeacher(id, teacher);

      console.log(response);

      if (response.data.status === 0) {
        alert("Teacher Updated Successfully");
        //navigate("/teachers");
      }
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update teacher");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-10">Loading...</div>
      </AdminLayout>
    );
  }

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
        <h1 className="text-4xl font-bold">Edit Teacher</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-md p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
    <label className="font-semibold">Experience</label>
    <input
      type="text"
      name="experience"
      value={teacher.experience}
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
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl"
    >
      Update Teacher
    </button>
  </div>
</form>
      </div>
    </AdminLayout>
  );
}

export default EditTeacher;