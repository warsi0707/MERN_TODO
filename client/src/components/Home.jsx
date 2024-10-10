import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const getData = async () => {
    const response = await fetch("http://localhost:3000/todos", {
      method: "GET",
    });
    const result = await response.json();
    console.log(result);
    setData(result.todos);
  };
  useEffect(() => {
    getData();
  }, []);
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();
      console.log(result);
      setMessage(result.message);
      if (response.ok) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error(error);
      setMessage(error.message);
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
      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-10">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-green-500 w-60 rounded-2xl p-5 text-white  space-y-10 mx-auto"
          >
            <div className="flex flex-col text-center   gap-5 text-2xl">
              <h1>Title</h1>
              <h1>Contnet</h1>
            </div>
            <div className="flex justify-center bg-black text-white p-2 rounded-lg text-center cursor-pointer hover:bg-gray-800">
              <button className="text-xl" onClick={() => deleteTodo(item._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
