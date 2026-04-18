import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateField = (field, value) => {
    let newErrors = { ...errors };

    switch (field) {
      case "username":
        newErrors.username =
          value.length < 4 ? "Username must be at least 4 characters" : "";
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        newErrors.email = !emailRegex.test(value)
          ? "Invalid email address"
          : "";
        break;

      case "regNumber":
        const regRegex = /^\d{6}$/;
        newErrors.regNumber = !regRegex.test(value)
          ? "Registration number must be exactly 6 digits"
          : "";
        break;

      case "phone":
        const phoneRegex = /^(07|01)\d{8}$/;
        newErrors.phone = !phoneRegex.test(value)
          ? "Phone must be 10 digits and start with 07 or 01"
          : "";
        break;

      case "password":
        newErrors.password =
          value.length < 6 ? "Password must be at least 6 characters" : "";

        if (confirmPassword && value !== confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          newErrors.confirmPassword = "";
        }
        break;

      case "confirmPassword":
        newErrors.confirmPassword =
          value !== password ? "Passwords do not match" : "";
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !username ||
      !email ||
      !userType ||
      !regNumber ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setMessage("All fields are required");
      return;
    }

    if (Object.values(errors).some((err) => err)) {
      setMessage("Please fix errors first");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          userType,
          regNumber,
          phone,
          password,
        }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Error connecting to server");
    }
  }

  return (
    <div className="signup-wrapper">

      {/* LEFT SIDE FORM */}
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              validateField("username", e.target.value);
            }}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}

          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <select
            className="input-field"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="">Select User Type</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>

          <input
            type="text"
            placeholder="Registration Number"
            className="input-field"
            value={regNumber}
            maxLength={6}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setRegNumber(value);
              validateField("regNumber", value);
            }}
          />
          {errors.regNumber && <p className="error-text">{errors.regNumber}</p>}

          <input
            type="text"
            placeholder="Phone Number"
            className="input-field"
            value={phone}
            maxLength={10}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setPhone(value);
              validateField("phone", value);
            }}
          />
          {errors.phone && <p className="error-text">{errors.phone}</p>}

          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateField("password", e.target.value);
            }}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            className="input-field"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateField("confirmPassword", e.target.value);
            }}
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="login-redirect">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>

        {message && <p className="signup-message">{message}</p>}
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="signup-image">
        <img src="/hero.png" alt="Helping reconnect lost items" />
      </div>

    </div>
  );
}