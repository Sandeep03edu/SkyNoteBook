import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let email = emailRef.current.value;
    let password = passwordRef.current.value;


    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log("Login response", json);

    if(json.success){
        // Redirect to notes page
        navigate("/");
        props.showAlert("Login successfully", "success")
        localStorage.setItem({"token" : json.authtoken})
    }
    else{
        // Invalid cred!!
        props.showAlert("Invalid credentials", "danger")
    }
  };

  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            ref={emailRef}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            id="password"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
