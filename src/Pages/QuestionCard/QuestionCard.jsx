import React from "react";
import classes from "./QuestionCard.module.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

function QuestionCard({ flex, flexsmall, angle, avsize, data }) {
  return (
    <>
      <div className={classes.home__question__display}>
        <div className={classes.home__links}>
          {data?.Allanswers && data.Allanswers.length > 0 ? (
            <>
              {data?.Allanswers?.map((ans, index) => (
                <div key={index} className={classes.Iconuser}>
                  <div className={classes.LeftDivision}>
                    <FaUserCircle
                      size={50}
                      style={{
                        padding: "0 20px 0 10px",
                        margin: "0",
                        color: "#022553",
                      }}
                    />
                    <div className={classes.user}>{ans.username}</div>
                  </div>
                  <div className={classes.MiddleDivision}>{ans.answer}</div>
                </div>
              ))}
            </>
          ) : (
            <p>No Answer is Posted</p>
          )}
        </div>
      </div>
      <hr />
    </>
  );
}

export default QuestionCard;
