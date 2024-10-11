import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const Signup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        setMessage(result.message);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        setError("Something error while signing up");
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-800 text-white w-[500px] mx-auto m-2 p-2 text-center text-2xl rounded-xl">
          {error}
        </div>
      )}
      {message && (
        <div className="bg-red-800 text-white w-[500px] mx-auto m-2 p-2 text-center text-2xl rounded-xl">
          {message}
        </div>
      )}
      <div className="bg-gray-600 w-[500px]  mx-auto m-5 rounded-2xl p-8 py-10">
        <div className=" flex flex-col space-y-5">
          <h1 className="text-3xl text-white text-center mb-2">Signup</h1>
          <form className="flex flex-col space-y-5" onSubmit={Signup}>
            <input
              className="p-3 text-2xl text-center rounded-xl"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="p-3 text-2xl text-center rounded-xl"
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="p-3 text-2xl text-center rounded-xl"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-600 p-1.5 rounded-2xl hover:bg-green-500"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
