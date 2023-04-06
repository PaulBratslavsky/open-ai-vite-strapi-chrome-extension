import React, { useState } from "react";

const INITIAL_STATE = { email: "", password: "" };

function LoginForm({ setCredentials }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [responseForm, setResponseForm] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;
    if (email || password) {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.error.message);
      } else {
        const data = await response.json();
        setResponseForm(data);
        setFormData(INITIAL_STATE);
        setCredentials({
            token: data.jwt,
            user: {
              id: data.user.id,
              username: data.user.username,
              email: data.user.email,
            },
        })
        setErrorMessage("");
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(responseForm);

  return (
    <div className="container px-4 mx-auto">
      <div className="max-w-sm mx-auto">
        <div className="mb-6 text-center">
          <h3 className="mb-4 text-2xl md:text-3xl font-bold">
            Sign in to your account
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              name="email"
              className="appearance-none block w-full p-3 leading-5 text-gray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(event) => handleInputChange(event)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              name="password"
              className="appearance-none block w-full p-3 leading-5 text-gray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(event) => handleInputChange(event)}
              required
            />
          </div>

          {errorMessage && (
            <div className="mb-4 text-red-500">{errorMessage}</div>
          )}

          <button
            className="inline-block py-3 px-7 mb-6 w-full text-base text-violet-50 font-medium text-center leading-6 bg-violet-500 hover:bg-violet-600 focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 rounded-md shadow-sm"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
