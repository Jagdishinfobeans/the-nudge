// src/components/QuestionList.js

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

const QuestionList = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("/question-bank/questions");
      setQuestions(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditQuestion = (selectedQuestion) => {
    navigate("/add-question", { state: { selectedQuestion } });
  };

  return (
    <div className="container mt-4">
      <h2>Question List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Question Text</th>
            <th>Expected Answer</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question._id}>
              <td>{question.sentence}</td>
              <td>{question.expectedAnswer}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditQuestion(question)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;
