import React from "react";
import classes from "./LoginSignup.module.css";
import axios from "../../axiosConfig";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { defineConfig } from "vite";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
function LoginSignup(props) {
  const navigate = useNavigate();
  const emailDOM = useRef();
  const passwordDOM = useRef();
  const userNameDOM = useRef();
  const firstNameDOM = useRef();
  const lastNameDOM = useRef();
  const emailsignDOM = useRef();
  const passwordsignDOM = useRef();

  const [isFirstDivVisible, setIsFirstDivVisible] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setmessage] = useState(true);
  const [alertt, setalertt] = useState("");
  const [alertone, setalertone] = useState("");

  const handleFirstLinkClick = (event) => {
    event.preventDefault(); // Prevents the default anchor link behavior
    setIsFirstDivVisible(false);
  };

  const handleSecondLinkClick = (event) => {
    event.preventDefault(); // Prevents the default anchor link behavior
    setIsFirstDivVisible(true);
  };
  //

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const emailvalue = emailDOM.current.value;
    const passwordvalue = passwordDOM.current.value;
    if (!emailvalue || !passwordvalue) {
      setalertone("Please Enter Email and Password");
      return;
    }
    try {
      const { data } = await axios.post("/users/login", {
        email: emailvalue,
        password: passwordvalue,
      });
      alert("Successfully logged in.");
      navigate("/home");
      localStorage.setItem("token", data.token);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    }
  }

  async function handleSubmitSignup(e) {
    e.preventDefault();

    const usernamevalue = userNameDOM.current.value;
    const firstvalue = firstNameDOM.current.value;
    const lastvalue = lastNameDOM.current.value;
    const emailsignvalue = emailsignDOM.current.value;
    const passwordsignvalue = passwordsignDOM.current.value;
    if (
      !usernamevalue ||
      !firstvalue ||
      !lastvalue ||
      !emailsignvalue ||
      !passwordsignvalue
    ) {
      setmessage(false);
      setalertt("ALL fields are required");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernamevalue,
        firstname: firstvalue,
        lastname: lastvalue,
        email: emailsignvalue,
        password: passwordsignvalue,
      });
      alert("The user has successfully registered");
      navigate("/");
      userNameDOM.current.value = "";
      firstNameDOM.current.value = "";
      lastNameDOM.current.value = "";
      emailsignDOM.current.value = "";
      passwordsignDOM.current.value = "";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } finally {
      if (message) {
        setIsFirstDivVisible(true);
      } // Call this function regardless of the outcome
    }
  }

  // useEffect(() => {
  //   // Assuming the form has a ref or an id to select it
  //   const form = document.getElementById("signupForm");
  //   if (form) {
  //     form.addEventListener("submit", handleSubmitSignup);
  //   }

  //   return () => {
  //     if (form) {
  //       form.removeEventListener("submit", handleSubmitSignup);
  //     }
  //   };
  // }, [isFirstDivVisible]);

  return (
    <div className={classes.main_container}>
      <div className={classes.Middle_part}>
        {isFirstDivVisible ? (
          <div className={`${classes.loginForm} `}>
            <h3>Login to your account</h3>
            <span>
              <p>
                Don’t have an account?{" "}
                <Link onClick={handleFirstLinkClick} to="">
                  Create a new account
                </Link>
              </p>
            </span>
            <div className={classes.LoginformOnly}>
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                }}
              >
                {alertone}
              </div>
              <form action="" onSubmit={handleSubmit}>
                <div className={classes.password}>
                  <input
                    ref={emailDOM}
                    type="email"
                    placeholder="Email adress"
                  />
                </div>

                <div className={classes.password}>
                  <input
                    type={showPassword ? "text" : "password"}
                    ref={passwordDOM}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <span
                    className="password-toggle-icon"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                <div>
                  <Link>Forgot password?</Link>
                </div>
                <div>
                  <button type="submit" className={classes.loginbutton}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className={`${classes.SignForm} `}>
            <h3>Join the network</h3>
            <span>
              <p>
                Already have an account?
                <Link onClick={handleSecondLinkClick} to="">
                  Sign in
                </Link>
              </p>
            </span>
            <div>
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                  paddingBottom: "5px",
                }}
              >
                {alertt}
              </div>
              <form action="" onSubmit={handleSubmitSignup}>
                <div className={classes.same}>
                  <input ref={userNameDOM} type="text" placeholder="Username" />
                </div>
                <div className={classes.field} style={{ border: "none" }}>
                  <input
                    ref={firstNameDOM}
                    type="text"
                    placeholder="First name"
                  />
                  <input
                    ref={lastNameDOM}
                    type="text"
                    placeholder="Last name"
                  />
                </div>
                <div className={classes.same}>
                  <input
                    ref={emailsignDOM}
                    type="email"
                    placeholder="Email adress"
                  />
                </div>

                <div className={classes.same}>
                  <input
                    type={showPassword ? "text" : "password"}
                    ref={passwordsignDOM}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <span
                    className="password-toggle-icon"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <h4 className={classes.agree}>
                  I agree to the <Link>privacy policy</Link> and
                  <Link>terms of service.</Link>.
                </h4>
                <button type="submit" className={classes.Join}>
                  Agree and Join
                </button>
                <h4>
                  <Link
                    onClick={handleSecondLinkClick}
                    className={classes.account}
                  >
                    Already have an account?
                  </Link>
                </h4>
              </form>
            </div>
          </div>
        )}
        <div className={classes.about}>
          <h3>About</h3>
          <h1>Evangadi Networks</h1>
          <p>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>
          <p>
            Wheather you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>

          <button className={classes.howbtn}>HOW IT WORKS</button>
        </div>
      </div>
      {/*  */}
      {/*  */}
      {/*  */}

      {/*  */}
      {/*  */}
      {/*  */}
    </div>
  );
}

export default LoginSignup;
