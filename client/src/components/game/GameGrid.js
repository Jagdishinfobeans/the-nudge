import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GridCell from "./GridCell";
import CustomConfetti from "../../common/Confetti";
import PraiseMessage from "../../common/PraiseMessage";
import axios from "../../config/axiosConfig";

import "bootstrap/dist/css/bootstrap.min.css";
import "./game.css";

const GameGrid = () => {
  const navigate = useNavigate();
  const [gridData, setGridData] = useState([]);
  const [userAttemptData, setUserAttemptData] = useState({});
  const [winGame, setWinGame] = useState(false);
  const [loseGame, setLoseGame] = useState(false);
  const { verb, email, sessionId } = JSON.parse(
    localStorage.getItem("userInfo")
  );

  useEffect(() => {
    fetchUserAttemptData(email, sessionId);
    fetchTenses();
  }, []);

  useEffect(() => {
    const handleUnload = async (event) => {
      event.preventDefault();
      axios.post("/games/exit", { email, sessionId });
      const confirmationMessage = 'Are you sure you want to leave the page?';
      event.returnValue = confirmationMessage;
    };
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, [email, sessionId]);

  

  const handleCellClick = (tenseId, rowColindex) => {
    const splitIndex = rowColindex.split(",");
    navigate("/view", {
      state: {
        tenseId,
        rowIndex: splitIndex[0],
        colIndex: splitIndex[1],
        attemptData: userAttemptData.attempts[splitIndex[0]][splitIndex[1]],
      },
    });
  };

  const handleRetry = async () => {
    try {
      const response = await axios.post("/games/start", { email, verb });
      const { data } = response;
      localStorage.setItem("userInfo", JSON.stringify(data));
      fetchUserAttemptData(data.email, data.sessionId);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleStartNew = async () => {
    try {
      const response = await axios.post("/games/start", { email });
      const { data } = response;
      localStorage.setItem("userInfo", JSON.stringify(data));
      fetchUserAttemptData(data.email, data.sessionId);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserAttemptData = async (email, sessionId) => {
    try {
      const response = await axios.get("/games/user-attempt", {
        params: {
          email,
          sessionId,
        },
      });
      const { data } = response;
      setUserAttemptData(data.userAttempt);
      setWinGame(data.win);
      setLoseGame(data.lose);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchTenses = async () => {
    try {
      const response = await axios.get("/question-bank/tenses");
      setGridData(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const renderGrid = () => {
    let rowIndex = 0;
    let colIndex = -1;
    const gridSize = 2;
    return gridData.map((cellData, index) => {
      if (colIndex >= gridSize) {
        rowIndex = Math.ceil(index / 3);
        colIndex = 0;
      } else {
        colIndex++;
      }

      const rowColindex = `${rowIndex},${colIndex}`;
      return (
        <GridCell
          key={index}
          cellData={cellData.tenseName}
          onClick={() => handleCellClick(cellData._id, rowColindex)}
          isCorrectAnswer={
            userAttemptData.attempts[rowIndex][colIndex].isCorrectAnswer
          }
        />
      );
    });
  };

  return (
    <div className="container">
      {winGame && (
        <CustomConfetti message={"Great job! You Won."} onComplete={() => {}} />
      )}
      {loseGame && (
        <PraiseMessage
          message="You lose. Well tried! Try again!"
          onClose={() => {}}
        />
      )}
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Tic Tac Tense</h1>
        </div>
        <div className="col-12 mt-3 mb-3 text-center border border-dark">
          Verb : {verb.verb.toLocaleUpperCase()}
        </div>
        {renderGrid()}
        <div className="col-12 mt-3">
          {loseGame && (
            <button
              className="btn btn-primary me-3"
              type="button"
              onClick={handleRetry}
            >
              Retry
            </button>
          )}
          {(winGame || loseGame) && (
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleStartNew}
            >
              Start New
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameGrid;
