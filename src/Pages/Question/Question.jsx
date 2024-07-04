import React, { useState } from "react";
import classes from "./Question.module.css";
import axios from "../../axiosConfig";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { Appstate } from "../../App";

function Question() {
  const { user } = useContext(Appstate);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const titleDOM = useRef();
  const userDescDOM = useRef();

  const [message, setmessage] = useState();
  const [messagee, setMessagee] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const titlevalue = titleDOM.current.value;
    const Descvalue = userDescDOM.current.value;

    if (!titlevalue || !Descvalue) {
      setMessagee("The fields are required");
      return;
    }

    // Validate title length
    if (titlevalue.length > 50) {
      setMessagee("Title must be 50 characters or less");
      return;
    }

    // Validate description length
    if (Descvalue.length > 200) {
      setMessagee("Description must be 200 characters or less");
      return;
    }
    try {
      await axios.post("/question/askquestion", {
        userid: user.userid,
        title: titlevalue,
        description: Descvalue,
      });
      setmessage("The Question Posted Successfully ");
      // Clear the text area after successful submission
      titleDOM.current.value = "";
      userDescDOM.current.value = "";
      setTimeout(() => {
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });

        navigate("/home", { state: { time: formattedTime } });
      }, 1500);
    } catch (error) {
      alert("Something went wrong. Please try again later.");
      console.log(error);
    }
  }
  return (
    <div className={classes.askquestion}>
      <div>
        <div className={classes.askquestion__title}>
          <h3>Steps to write a good question</h3>
          <ul>
            <li>Summerize your problem in one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and you expect to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
        <div className={classes.form__container}>
          <h3>Ask a public question</h3>

          <Link to={"/"}>Go to Question page</Link>
          <div>
            <p
              style={{
                color: "red",
                textAlign: "center",
                paddingBottom: "5px",
              }}
            >
              {" "}
              {messagee}
            </p>
          </div>
          <div
            style={{
              color: "green",
              textAlign: "center",
              paddingBottom: "5px",
            }}
          >
            {message}
          </div>
          <form action="" onSubmit={handleSubmit}>
            <input ref={titleDOM} type="text" placeholder="Title" />

            <textarea
              name="description"
              ref={userDescDOM}
              id="desc"
              rows="6"
              cols="50"
              maxLength="200"
              placeholder="Question Description"
            ></textarea>
            <button type="submit">Post Question</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Question;
