import React, { useState } from "react";

const SignUpForm = ({ onSwitchMode }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign Up Form data submitted:", formData);

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDANUEX5In6ifIjHF35ABuVqcjhdEdCwSE",
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
if(response.ok){
      console.log("successfully signed up");
}
    } catch (error) {
      console.error("Error:", error);
    }
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <form className="bg-light p-4 rounded" onSubmit={handleSubmit}>
      <div className="text-center mb-4">
        <h3 className="mb-4">Sign Up</h3>
      </div>
      <div className="form-group mt-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
          id="email"
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
      <div className="form-group mt-3">
        <label>Confirm Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Confirm password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-4">
        Sign Up
      </button>
      <div className="text-center mt-3">
        Already registered?
        <button type="button" className="btn btn-link" onClick={onSwitchMode}>
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;