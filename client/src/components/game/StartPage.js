import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../config/axiosConfig";
import { isValidEmailFormat } from "../../utils/helper";

const StartPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(true);
  };

  const handleStartGame = async () => {
    try {
      if (isValidEmailFormat(email)) {
        const response = await axios.post("/games/start", { email });
        const { data } = response;
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/game");
      } else {
        setIsValidEmail(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  

  return (
    <div className="container">
      <h1>Tic-tac-Tense Game</h1>
      <div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Enter your email:
          </label>
          <input
            type="email"
            className={`form-control ${isValidEmail ? "" : "is-invalid"}`}
            id="emailInput"
            value={email}
            onChange={handleEmailChange}
          />
          {!isValidEmail && (
            <div className="invalid-feedback">Please enter a valid email.</div>
          )}
        </div>
        <button className="btn btn-primary" onClick={handleStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default StartPage;
