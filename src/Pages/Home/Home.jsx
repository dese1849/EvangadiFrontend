import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import classes from "./Home.module.css";
import { Appstate } from "../../App";
import React, { useEffect, useState, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

function Home() {
  // const [selectdata, setselectdata] = useState({});

  // const { user } = useContext(Appstate);
  // const token = localStorage.getItem("token");
  // // useEffect(() => {
  // async function selectuser() {
  //   try {
  //     const { data } = await axios.get("question/selectquestion");
  //     setselectdata(data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // }

  // selectuser();
  // // }, [token]);

  // return (
  //   <section className={classes.home}>
  //     <div className={classes.home__container}>
  //       <div className={classes.home__wellcome}>
  //         <div className={classes.home__question}>
  //           <p>
  //             <Link to={"/askquestion"}>Ask Question</Link>
  //           </p>
  //         </div>
  //         <div>
  //           <h2 style={{ fontWeight: "400" }}>
  //             Wellcome:
  //             <span style={{ color: "rgb(254, 128, 130", fontWeight: "500" }}>
  //               {user.username}
  //             </span>
  //           </h2>
  //         </div>
  //       </div>
  //       <div className={classes.home__input}>
  //         <input type="text" placeholder="Search Question" />
  //       </div>
  //       <hr />

  //       {selectdata?.AllQuestions && selectdata.AllQuestions.length > 0 ? (
  //         <>
  //           {selectdata?.AllQuestions?.map((question, index) => (
  //             <Link to={`/answer/${question.questionid}`}>
  //               <div key={index} className={classes.Iconuser}>
  //                 <div className={classes.LeftDivision}>
  //                   <FaUserCircle
  //                     size={100}
  //                     style={{ padding: "0 20px 0 10px", margin: "0" }}
  //                   />
  //                   <div className={classes.user}>{question.username}</div>
  //                 </div>
  //                 <div className={classes.MiddleDivision}>{question.title}</div>
  //                 <div className={classes.RightDivision}>
  //                   <FaAngleRight
  //                     className={classes.angle}
  //                     size={40}
  //                     style={{ paddingTop: "50" }}
  //                   />
  //                 </div>
  //               </div>
  //             </Link>
  //           ))}
  //         </>
  //       ) : (
  //         <p>No question is posted</p>
  //       )}
  //     </div>
  //   </section>
  // );

  const [selectData, setSelectData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { user } = useContext(Appstate);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function selectUser() {
      try {
        const { data } = await axios.get("question/selectquestion", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSelectData(data.AllQuestions);
        setFilteredData(data.AllQuestions); // Initialize filtered data with the complete data set
      } catch (error) {
        console.log(error.response);
        navigate("/");
      }
    }

    if (token) {
      selectUser();
    } else {
      navigate("/"); // Redirect if no token is present
    }
  }, [token, navigate]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = selectData.filter((question) =>
      question.title.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  return (
    <section className={classes.home}>
      <div className={classes.home__container}>
        <div className={classes.home__wellcome}>
          <div className={classes.home__question}>
            <p>
              <Link to={"/askquestion"}>Ask Question</Link>
            </p>
          </div>
          <div>
            <h2 style={{ fontWeight: "400" }}>
              Welcome:
              <span style={{ color: "rgb(254, 128, 130)", fontWeight: "500" }}>
                {user.username}
              </span>
            </h2>
          </div>
        </div>
        <div className={classes.home__input}>
          <input
            type="text"
            placeholder="Search Question"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <hr />
        {filteredData && filteredData.length > 0 ? (
          <>
            {filteredData.map((question, index) => (
              <Link to={`/answer/${question.questionid}`} key={index}>
                <div className={classes.Iconuser}>
                  <div className={classes.LeftDivision}>
                    <FaUserCircle
                      size={100}
                      style={{ padding: "0 20px 0 10px", margin: "0" }}
                    />
                    <div className={classes.user}>{question.username}</div>
                  </div>
                  <div className={classes.MiddleDivision}>{question.title}</div>
                  <div className={classes.RightDivision}>
                    <FaAngleRight
                      className={classes.angle}
                      size={40}
                      style={{ paddingTop: "50" }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <p>No questions posted</p>
        )}
      </div>
    </section>
  );
}

export default Home;
