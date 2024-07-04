import React, { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import { useContext } from "react";
import { Appstate } from "../../App";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Queastion() {
  const navigate = useNavigate();
  const answerDOM = useRef();
  const { user } = useContext(Appstate);
  const [singledata, setsingledata] = useState({});
  const [answering, setanswer] = useState({});
  const token = localStorage.getItem("token");
  let { questionId } = useParams();

  useEffect(() => {
    async function selectSingleQuestion() {
      try {
        const { data } = await axios.get(
          `/question/selectsinglequestion?questionId=${questionId}`,
          {
            headers: { authorization: "Bearer " + token },
          }
        );
        setsingledata(data.question);
        const qanswer = await axios.get(
          `/question/selectansawer?questionId=${questionId}`,
          {
            headers: { authorization: "Bearer " + token },
          }
        );

        setanswer(qanswer.data);
      } catch (error) {
        console.log(error);
      }
    }
    selectSingleQuestion();
  }, []);

  //
  //
  async function handleSubmit(e) {
    e.preventDefault();
    const answervalue = answerDOM.current.value;

    if (!answervalue) {
      alert("The fields are required");
    }
    try {
      await axios.post(
        "answer/answerQuestion",
        {
          userid: user.userid,
          questionid: questionId,
          answer: answervalue,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      alert("answer Posted succesfull");
      navigate("/");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <div>
        {singledata ? (
          <div>
            <h1>{singledata.title}</h1>
            <p>{singledata.description}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <h2>Answer From The Community</h2>
        <div>
          {answering?.Allanswers && answering.Allanswers.length > 0 ? (
            <ul>
              {answering.Allanswers.map((ans, index) => (
                <div key={index}>
                  <li>
                    <strong>{ans.answer}:</strong> {ans.username}
                  </li>
                  <hr />
                  <hr />
                </div>
              ))}
            </ul>
          ) : (
            <p>There is no Answer</p>
          )}
        </div>
      </div>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <textarea ref={answerDOM} placeholder="Your Answer..."></textarea>{" "}
          <br />
          <button type="submit"> Post Answer</button>
        </form>
      </div>
    </>
  );
}

export default Queastion;
