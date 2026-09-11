import { useState } from "react";

import { useNavigate } from "react-router-dom";

import apiService from "../../api/apiService";

import { FaSchool, FaUser, FaLock, FaUserTag, FaInfoCircle } from "react-icons/fa";

import AboutProjectModal from "../../components/about/AboutProjectModal";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showAbout, setShowAbout] = useState(false);

  const handleLogin = async () => {
    if (!role || !username || !password) {
      alert("Please fill all fields");

      return;
    }

    try {
      setLoading(true);

      const payload = {
        email: username,

        password: password,

        role: role,
      };

      const response = await apiService.login(payload);

      const result = response.data;

      console.log(result);

      // SUCCESS
      if (result.status === 0) {
        // Save user object
        localStorage.setItem("user", JSON.stringify(result.data));

        // Save token
        localStorage.setItem("token", result.data.token);

        // Save common user data
        localStorage.setItem("userId", result.data.id);

        localStorage.setItem("role", result.data.role);

        alert(result.message);

        // if (result.data.role === "ADMIN") {
        //   navigate("/admin-dashboard");
        // } else if (result.data.role === "TEACHER") {
        //   navigate("/teacher-dashboard");
        // } else if (result.data.role === "STUDENT") {
        //   navigate("/student-dashboard");
        // }
        if (result.data.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else if (result.data.role === "TEACHER") {
          navigate("/teacher/dashboard");
        } else if (result.data.role === "STUDENT") {
          navigate("/student/dashboard");
        }
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-slate-100
      flex
      justify-center
      items-center
      p-5
    "
    >
      <div
        className="
        bg-white
        w-full
        max-w-md
        rounded-3xl
        shadow-xl
        p-8
      "
      >
        {/* Logo */}
        <div
          className="
          flex
          flex-col
          items-center
          mb-8
        "
        >
          <div
            className="
            bg-blue-600
            p-4
            rounded-2xl
            mb-4
          "
          >
            <FaSchool
              className="
              text-white
              text-3xl
            "
            />
          </div>

          <h1
            className="
            text-3xl
            font-bold
            text-slate-800
          "
          >
            SMS Login
          </h1>
        </div>

        {/* Role */}
        <div className="mb-5">
          <label
            className="
            font-semibold
            text-slate-700
          "
          >
            Select Role
          </label>

          <div
            className="
            flex
            items-center
            border
            rounded-xl
            mt-2
            px-4
          "
          >
            <FaUserTag
              className="
              text-gray-400
            "
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="
                w-full
                p-3
                outline-none
                bg-transparent
              "
            >
              <option value="">Select Role</option>

              <option value="ADMIN">ADMIN</option>

              <option value="TEACHER">TEACHER</option>

              <option value="STUDENT">STUDENT</option>
            </select>
          </div>
        </div>

        {/* Username */}
        <div className="mb-5">
          <label
            className="
            font-semibold
            text-slate-700
          "
          >
            Username
          </label>

          <div
            className="
            flex
            items-center
            border
            rounded-xl
            mt-2
            px-4
          "
          >
            <FaUser
              className="
              text-gray-400
            "
            />

            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full
                p-3
                outline-none
              "
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            className="
            font-semibold
            text-slate-700
          "
          >
            Password
          </label>

          <div
            className="
            flex
            items-center
            border
            rounded-xl
            mt-2
            px-4
          "
          >
            <FaLock
              className="
              text-gray-400
            "
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                p-3
                outline-none
              "
            />
          </div>
        </div>

        {/* Button */}
        {/* <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-xl
            font-semibold
          "
        >
          {loading ? "Logging..." : "Login"}
        </button>

        About this project
        <button
          onClick={() => setShowAbout(true)}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            mt-4
            text-sm
            font-medium
            text-slate-500
            hover:text-blue-600
            transition
          "
        >
          <FaInfoCircle />
          About this project
        </button> */}
      </div>

      {/* About modal */}
      <AboutProjectModal
        open={showAbout}
        onClose={() => setShowAbout(false)}
      />
    </div>
  );
}

export default Login;
