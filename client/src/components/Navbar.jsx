import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  try {
    const user = async () => {
      const response = await fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      const user = result.username;
      console.log(user);
      if (user.username === "undiefined") {
        setAuth(false);
      }
      setAuth(true);
      setUsername(user);
    };
    useEffect(() => {
      user();
    }, []);
  } catch (error) {
    console.log(error, error.message);
  }

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      console.log(result);
      setMessage(result.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <div className="w-full bg-slate-900 text-white p-8 text-xl flex justify-evenly">
        <div>
          <Link to={"/"}>Todo</Link>
        </div>
        <div className="flex gap-4">
          {auth ? (
            <div className="flex gap-4">
              <Link onClick={logout}>Logout</Link>
              <Link to={"/add"}>Add todo</Link>
              <h1>{username}</h1>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to={"/signup"}>Signup</Link>
              <Link to={"/signin"}>Login</Link>
            </div>
          )}
        </div>
      </div>
      <div>
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
      </div>
    </>
  );
}
