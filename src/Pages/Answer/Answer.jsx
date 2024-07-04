import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import { useContext } from "react";
import { Appstate } from "../../App";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Answer.module.css";
import QuestionCard from "../QuestionCard/QuestionCard";
import { defineConfig } from "vite";
import { FaArrowAltCircleRight } from "react-icons/fa";

function Answer() {
  const answerDOM = useRef();
  const navigate = useNavigate();
  const { user } = useContext(Appstate);
  const [singledata, setsingledata] = useState({});
  let { questionId } = useParams();
  const [answering, setanswer] = useState({});
  const [message, setMessage] = useState("");
  const [ansmessage, setansmessage] = useState("");

  async function selectSingleQuestion() {
    try {
      const { data } = await axios.get(
        `/question/selectsinglequestion?questionId=${questionId}`
      );
      setsingledata(data.question);
      const qanswer = await axios.get(
        `/question/selectansawer?questionId=${questionId}`
      );

      setanswer(qanswer.data);
    } catch (error) {
      console.log(error);
    }
  }
  selectSingleQuestion();

  async function handleSubmit(e) {
    e.preventDefault();
    const answervalue = answerDOM.current.value;

    if (!answervalue) {
      setMessage("The fields are required");
      return;
    }
    // Validate answer length
    if (answervalue.length > 200) {
      setMessage("Answer must be 200 characters or less");
      return;
    }
    try {
      await axios.post("answer/answerQuestion", {
        userid: user.userid,
        questionid: questionId,
        answer: answervalue,
      });
      setansmessage("The Answer Posted Successfully");
      // Clear the text area after successful submission
      answerDOM.current.value = "";
    } catch (error) {
      alert(error);
    }
  }

  return (
    <section className={classes.answer}>
      <section className={classes.answer__container}>
        <div className={classes.answer__title}>
          <h1>QUESTION</h1>
          <div>
            <div>
              <FaArrowAltCircleRight
                size={30}
                style={{ padding: "10px 5px 0px", color: "#516CF0" }}
              />
              <span className={classes.title}>{singledata.title}</span>
            </div>

            <p>{singledata.description}</p>
          </div>
        </div>
        <hr />
        <div>
          <h1 style={{ fontSize: "40px", fontWeight: "500" }}>
            Answer From The Community
          </h1>
          <hr />
          <div className={classes.answer__display}>
            <QuestionCard
              flex={false}
              flexsmall={true}
              angle={false}
              avsize={50}
              data={answering}
            />
          </div>
        </div>
        <div>
          <div
            style={{
              color: "red",
              textAlign: "center",
              paddingBottom: "5px",
            }}
          >
            {message}
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div
              style={{
                color: "green",
                textAlign: "center",
                paddingBottom: "7px",
              }}
            >
              {ansmessage}
            </div>
            <textarea
              name="answer"
              ref={answerDOM}
              id="answerid"
              placeholder="Your answer"
              rows="6"
              cols={"50"}
            ></textarea>
            <button type="submit">Post Answer</button>
          </form>
        </div>
      </section>
    </section>
  );
}

export default Answer;
