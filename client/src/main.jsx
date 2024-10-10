import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import Navbar from "./components/Navbar.jsx";
import AddTodo from "./components/AddTodo.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
  {
    path: "/signin",
    element: (
      <>
        <Navbar />
        <Signin />
      </>
    ),
  },
  {
    path: "/add",
    element: (
      <>
        <Navbar />
        <AddTodo />
      </>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
);
