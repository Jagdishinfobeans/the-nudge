import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CheckMarkOrCross from "../game/CheckMarkOrCross";
import axios from "../../config/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "./question.css";

function QuestionView({ state }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { verb, email, sessionId } = JSON.parse(
    localStorage.getItem("userInfo")
  );
  const verbId = verb._id;
  const { tenseId, rowIndex, colIndex, attemptData } = location.state;

  const [inputValue, setInputValue] = useState(
    attemptData.userAnswer ? attemptData.userAnswer : ""
  );
  const [isValidInput, setIsValidInput] = useState(true);
  const [question, setQuestion] = useState({});
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(
    attemptData.isCorrectAnswer ? attemptData.isCorrectAnswer : false
  );
  const [isSubmited, setIsSubmited] = useState(
    attemptData.userAnswer ? true : false
  );
  const [correctAnswer, setCorrectAnswer] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    fetchQuestion();
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (inputValue === "") {
        setIsValidInput(false);
        return false;
      }
      setIsValidInput(true);
      const response = await axios.post("/games/submit", {
        expectedAnswer: inputValue,
        tenseId,
        verbId,
        email,
        sessionId,
        rowIndex,
        colIndex,
      });
      const { data } = response;
      setIsCorrectAnswer(data.isCorrectAnswer);
      setCorrectAnswer(data.correctAnswer);
      setIsSubmited(true);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCancel = () => {
    setInputValue("");
    navigate("/game");
  };

  const handleContinue = () => {
    navigate("/game");
  };

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("/games/question", {
        params: {
          verbId,
          tenseId,
        },
      });
      const { data } = response;
      setQuestion(data);
      if (attemptData.expectedAnswer) {
        setCorrectAnswer(
          data.sentence.replace("____", attemptData.expectedAnswer)
        );
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const splitedSentence = question.sentence
    ? question.sentence.split("____")
    : [];

  return (
    <div className="container mt-5">
      <div className="row text-align">
        {isSubmited && (
          <div className="col-md-12 ">
            <CheckMarkOrCross showCheckMark={isCorrectAnswer} />
          </div>
        )}
        <div className="col-md-12">
          <div>
            {splitedSentence[0]}
            <input
              ref={inputRef}
              type="text"
              className={`custom-input`}
              placeholder="Enter a word"
              value={inputValue}
              onChange={handleChange}
              disabled={isSubmited}
            />
            {splitedSentence[1]}
          </div>
          {!isValidInput && (
            <div className="error">The word should not be empty.</div>
          )}
        </div>
        {isSubmited && !isCorrectAnswer && (
          <div className="col-md-12 mt-3">
            The correct answer is : {correctAnswer}
          </div>
        )}

        <div className="col-md-12 mt-3">
          {!isSubmited ? (
            <>
              <button
                className="btn btn-primary me-3"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="btn btn-success me-3"
              type="button"
              onClick={handleContinue}
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionView;
