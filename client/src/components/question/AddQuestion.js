import React, { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AddQuestion = () => {
  const location = useLocation();
  const { selectedQuestion } = location.state ?? {};
  const [formData, setFormData] = useState({
    verbId: selectedQuestion ? selectedQuestion.verbId : "",
    tenseId: selectedQuestion ? selectedQuestion.tenseId : "",
    sentence: selectedQuestion ? selectedQuestion.sentence : "",
    expectedAnswer: selectedQuestion ? selectedQuestion.expectedAnswer : "",
    id: selectedQuestion ? selectedQuestion._id : "",
  });

  const [verbs, setVerbs] = useState([]);
  const [tenses, setTenses] = useState([]);

  useEffect(() => {
    fetchVerbs();
    fetchTenses();
  }, []);

  const fetchVerbs = async () => {
    try {
      const response = await axios.get("/question-bank/verbs");
      setVerbs(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchTenses = async () => {
    try {
      const response = await axios.get("/question-bank/tenses");
      setTenses(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/question-bank/questions", formData);
      if (response.status === 201) {
        const { data } = response;

        toast.success(data.message, {
          autoClose: 3000,
        });

        setFormData({
          verbId: "",
          tenseId: "",
          sentence: "",
          expectedAnswer: "",
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{formData.id ? "Edit" : "Add"} question</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="verbId" className="form-label">
            Verb:
          </label>
          <select
            id="verbId"
            name="verbId"
            value={formData.verbId}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Verb</option>
            {verbs.map((verb) => (
              <option key={verb._id} value={verb._id}>
                {verb.verb}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="tenseId" className="form-label">
            Tense:
          </label>
          <select
            id="tenseId"
            name="tenseId"
            value={formData.tenseId}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Tense</option>
            {tenses.map((tense) => (
              <option key={tense._id} value={tense._id}>
                {tense.tenseName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="sentence" className="form-label">
            Sentence:
          </label>
          <input
            type="text"
            id="sentence"
            name="sentence"
            value={formData.sentence}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expectedAnswer" className="form-label">
            Expected Answer:
          </label>
          <input
            type="text"
            id="expectedAnswer"
            name="expectedAnswer"
            value={formData.expectedAnswer}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
