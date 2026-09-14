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

  const [documents, setDocuments] = useState({
    profileImage: null,
    aadhaarCard: null,
    panCard: null,
    addressProof: null,
    signature: null,
    resume: null,
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e, documentType) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      alert(`${file.name} is too large. Maximum file size is 10 MB.`);
      e.target.value = "";
      return;
    }

    setDocuments((prev) => ({
      ...prev,
      [documentType]: file,
    }));
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
      setSaving(true);

      console.log("Teacher data:", teacher);
      console.log("Teacher documents:", documents);

      /*
       * Create FormData because backend expects:
       *
       * @RequestPart("teacher")
       * @RequestPart("profileImage")
       * @RequestPart("aadhaarCard")
       * @RequestPart("panCard")
       * @RequestPart("addressProof")
       * @RequestPart("signature")
       * @RequestPart("resume")
       */

      const formData = new FormData();

      /*
       * IMPORTANT:
       * teacher must be sent as JSON text with the key "teacher".
       */
      formData.append(
        "teacher",
        new Blob([JSON.stringify(teacher)], {
          type: "application/json",
        })
      );

      /*
       * Add files only when selected.
       */
      if (documents.profileImage) {
        formData.append("profileImage", documents.profileImage);
      }

      if (documents.aadhaarCard) {
        formData.append("aadhaarCard", documents.aadhaarCard);
      }

      if (documents.panCard) {
        formData.append("panCard", documents.panCard);
      }

      if (documents.addressProof) {
        formData.append("addressProof", documents.addressProof);
      }

      if (documents.signature) {
        formData.append("signature", documents.signature);
      }

      if (documents.resume) {
        formData.append("resume", documents.resume);
      }

      /*
       * Debug FormData
       */
      for (const [key, value] of formData.entries()) {
        console.log("FormData:", key, value);
      }

      const response = await apiService.createTeacher(formData);

      console.log("Teacher created response:", response.data);

      if (response.data?.status === 0) {
        alert(
          response.data.message ||
            "Teacher Added Successfully"
        );

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
        });

        setDocuments({
          profileImage: null,
          aadhaarCard: null,
          panCard: null,
          addressProof: null,
          signature: null,
          resume: null,
        });

        /*
         * Uncomment if you want to go back
         * after successful creation.
         */
        // navigate("/teachers");
      } else {
        alert(
          response.data?.message ||
            "Failed to add teacher"
        );
      }
    } catch (error) {
      console.error("Create teacher failed:", error);

      console.error(
        "Backend error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Failed to add teacher"
      );
    } finally {
      setSaving(false);
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
        <h1 className="text-4xl font-bold">
          Add Teacher
        </h1>

        {/* <p className="text-gray-500 mt-2">
          Create a new teacher profile with personal,
          professional and document details.
        </p> */}
      </div>

      <div className="bg-white rounded-3xl shadow-md p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* First Name */}
          <div>
            <label className="font-semibold">
              First Name
            </label>

            <input
              type="text"
              name="firstName"
              value={teacher.firstName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Middle Name */}
          <div>
            <label className="font-semibold">
              Middle Name
            </label>

            <input
              type="text"
              name="middleName"
              value={teacher.middleName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="font-semibold">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              value={teacher.lastName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={teacher.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={teacher.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="font-semibold">
              Mobile Number
            </label>

            <input
              type="text"
              name="mobileNumber"
              value={teacher.mobileNumber}
              onChange={handleChange}
              maxLength="10"
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="font-semibold">
              Gender
            </label>

            <select
              name="gender"
              value={teacher.gender}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            >
              <option value="">
                Select Gender
              </option>

              <option value="MALE">
                Male
              </option>

              <option value="FEMALE">
                Female
              </option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="font-semibold">
              Date of Birth
            </label>

            <input
              type="date"
              name="dateOfBirth"
              value={teacher.dateOfBirth}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="font-semibold">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={teacher.subject}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Qualification */}
          <div>
            <label className="font-semibold">
              Qualification
            </label>

            <input
              type="text"
              name="qualification"
              value={teacher.qualification}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="font-semibold">
              Experience (Years)
            </label>

            <input
              type="number"
              name="experience"
              value={teacher.experience}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="font-semibold">
              Address
            </label>

            <textarea
              name="address"
              rows="4"
              value={teacher.address}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Documents Section */}
          <div className="md:col-span-2 mt-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Teacher Documents
            </h2>

            <p className="text-gray-500 mb-6">
              Upload teacher profile and required
              documents. Maximum file size is 10 MB per file.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Profile Image */}
              <div className="border rounded-2xl p-5 bg-gray-50">
                <label className="font-semibold block mb-3">
                  Profile Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      "profileImage"
                    )
                  }
                  className="w-full border p-3 rounded-xl bg-white"
                />

                {documents.profileImage && (
                  <p className="text-sm text-green-600 mt-2 break-all">
                    {documents.profileImage.name}
                  </p>
                )}
              </div>

              {/* Aadhaar Card */}
              <div className="border rounded-2xl p-5 bg-gray-50">
                <label className="font-semibold block mb-3">
                  Aadhaar Card
                </label>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      "aadhaarCard"
                    )
                  }
                  className="w-full border p-3 rounded-xl bg-white"
                />

                {documents.aadhaarCard && (
                  <p className="text-sm text-green-600 mt-2 break-all">
                    {documents.aadhaarCard.name}
                  </p>
                )}
              </div>

              {/* PAN Card */}
              <div className="border rounded-2xl p-5 bg-gray-50">
                <label className="font-semibold block mb-3">
                  PAN Card
                </label>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      "panCard"
                    )
                  }
                  className="w-full border p-3 rounded-xl bg-white"
                />

                {documents.panCard && (
                  <p className="text-sm text-green-600 mt-2 break-all">
                    {documents.panCard.name}
                  </p>
                )}
              </div>

              {/* Address Proof */}
              <div className="border rounded-2xl p-5 bg-gray-50">
                <label className="font-semibold block mb-3">
                  Address Proof
                </label>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      "addressProof"
                    )
                  }
                  className="w-full border p-3 rounded-xl bg-white"
                />

                {documents.addressProof && (
                  <p className="text-sm text-green-600 mt-2 break-all">
                    {documents.addressProof.name}
                  </p>
                )}
              </div>

              {/* Signature */}
              <div className="border rounded-2xl p-5 bg-gray-50">
                <label className="font-semibold block mb-3">
                  Signature
                </label>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      "signature"
                    )
                  }
                  className="w-full border p-3 rounded-xl bg-white"
                />

                {documents.signature && (
                  <p className="text-sm text-green-600 mt-2 break-all">
                    {documents.signature.name}
                  </p>
                )}
              </div>

              {/* Resume */}
              <div className="border rounded-2xl p-5 bg-gray-50">
                <label className="font-semibold block mb-3">
                  Resume
                </label>

                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      "resume"
                    )
                  }
                  className="w-full border p-3 rounded-xl bg-white"
                />

                {documents.resume && (
                  <p className="text-sm text-green-600 mt-2 break-all">
                    {documents.resume.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-3 rounded-xl text-white font-semibold ${
                saving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {saving
                ? "Saving Teacher..."
                : "Save Teacher"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddTeacher;