import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const Addtodo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://mern-todo-dkan.onrender.com/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
        credentials: "include",
      });
      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        navigate("/signin");
        setMessage("You are not authorised to add todo, please login first");
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="bg-gray-600 w-[500px]  mx-auto m-5 rounded-2xl p-8 py-10">
        <div className=" flex flex-col space-y-5">
          <h1 className="text-3xl text-white text-center mb-2">
            Add your Todod
          </h1>
          <form className="flex flex-col space-y-5" onSubmit={Addtodo}>
            <input
              className="p-3 text-2xl text-center rounded-xl"
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="p-3 text-2xl text-center rounded-xl"
              type="text"
              placeholder="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-600 p-1.5 rounded-2xl hover:bg-green-500"
            >
              Add todo
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
