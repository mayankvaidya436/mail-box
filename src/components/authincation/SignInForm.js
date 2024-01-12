import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setToken,setLoggedInStatus } from "../Store/authSlice";
import { useDispatch } from "react-redux";

const SignInForm = ({ onSwitchMode }) => {
      const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDANUEX5In6ifIjHF35ABuVqcjhdEdCwSE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error.message}`);
        return;
      }

      // Reset form fields
      setFormData({
        email: "",
        password: "",
      });

      const data = await response.json();
      console.log(data);
      dispatch(setToken(data.idToken));
      dispatch(setLoggedInStatus(true));
      navigate("/welcome");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="bg-light p-4 rounded" onSubmit={handleSubmit}>
      <div className="text-center mb-4">
        <h3 className="mb-4">Sign In</h3>
      </div>
      <div className="form-group mt-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group mt-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-4">
        Sign In
      </button>
      <div className="text-center mt-3">
        <Link to="/forgot-password">Forgot Password</Link>
        <br />
        Not registered yet?{" "}
        <button type="button" className="btn btn-link" onClick={onSwitchMode}>
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignInForm;