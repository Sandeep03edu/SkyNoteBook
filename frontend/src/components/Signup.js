import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let name = userInput.name;
    let email = userInput.email;
    let password = userInput.password;

    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log("Login response", json);

    if (json.success) {
      // Redirect to notes page
      navigate("/");
      localStorage.setItem({"token" : json.authtoken}) 
      props.showAlert("Account created successfully", "success")
    } else {
      // Invalid cred!!
      props.showAlert("User already exist", "danger")
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            onChange={onChange}
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="InputEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            minLength={5}
            required
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            minLength={5}
            required
            type="password"
            className="form-control"
            onChange={onChange}
            id="confirmPassword"
            name="confirmPassword"
          />
        </div>

        <button type="submit" disabled={userInput.password.length===0 || userInput.password !==userInput.confirmPassword} className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Signup;
