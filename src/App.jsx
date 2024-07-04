import React, { useEffect, useState, createContext } from "react";
import Home from "./Pages/Home/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Question from ".././src/Pages/Question/Question";
import Layout from "../src/Pages/Layout/Layout";
import Answer from "../src/Pages/Answer/Answer";
import LoginSignup from "./Pages/LoginSignUp/LoginSignup";
import axios from "./axiosConfig";
export const Appstate = createContext();
function App() {
  const [user, setuser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function chekuser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: { authorization: "Bearer " + token },
      });
      setuser(data);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (error) {
      navigate("/");
      setIsLoggedIn(false);
    }
  }
  useEffect(() => {
    chekuser();
  }, [token]);
  async function handleLogout() {
    try {
      setuser({});
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <Appstate.Provider value={{ user, isLoggedIn, handleLogout }}>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LoginSignup />} />
          <Route path="/askquestion" element={<Question />} />
          <Route path="/answer/:questionId" element={<Answer />} />
        </Routes>
      </Layout>
    </Appstate.Provider>
  );
}

export default App;
