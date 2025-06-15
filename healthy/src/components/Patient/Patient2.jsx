import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lab from "../DHIlab/DHIlab.jsx";

function Patient2(props) {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({
    question_1: "",
    question_2: "",
    question_3: "",
    question_4: "",
    question_5: "",
    question_6: "",
  });

  const checkAllAnswered = () => {
    return Object.values(answers).every((val) => val !== "");
  };

  const setObject = () => [
    { question: "Patient is overweight or obese", answer: answers.question_1 },
    { question: "Patient smokes cigarettes", answer: answers.question_2 },
    { question: "Patient has been recently injured", answer: answers.question_3 },
    { question: "Patient has high cholesterol", answer: answers.question_4 },
    { question: "Patient has hypertension", answer: answers.question_5 },
    { question: "Patient has diabetes", answer: answers.question_6 },
  ];

  const handleOnChange = (questionKey, value) => {
    const updatedAnswers = { ...answers, [questionKey]: value };
    setAnswers(updatedAnswers);

    const allAnswered = Object.values(updatedAnswers).every((val) => val !== "");
    const all_answer = [
      { question: "Patient is overweight or obese", answer: updatedAnswers.question_1 },
      { question: "Patient smokes cigarettes", answer: updatedAnswers.question_2 },
      { question: "Patient has been recently injured", answer: updatedAnswers.question_3 },
      { question: "Patient has high cholesterol", answer: updatedAnswers.question_4 },
      { question: "Patient has hypertension", answer: updatedAnswers.question_5 },
      { question: "Patient has diabetes", answer: updatedAnswers.question_6 },
    ];

    if (props.callback) {
      props.callback(all_answer, allAnswered ? "Available" : "Not available");
    }
  };

  const handleBackClick = () => {
    navigate('/Patient1');
  };

  const handleNextClick = () => {
    navigate('/Symptom');
  };

  const questions = [
    { key: 'question_1', text: 'I am overweight or obese' },
    { key: 'question_2', text: 'I smoke cigarettes' },
    { key: 'question_3', text: 'I have been recently injured' },
    { key: 'question_4', text: 'I have high cholesterol' },
    { key: 'question_5', text: 'I have hypertension' },
    { key: 'question_6', text: 'I have diabetes' }
  ];

  return (
    <div>
        <div className="mega"><Lab/></div>
    <div style={{
      padding: '20px',
      border: '2px solid black',
      borderRadius: '8px',
      margin: '20px',
      backgroundColor:'white',
    }}>
       
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2>Please check all the statements below that apply to you</h2>
        <p>Select one answer in each row</p>
      </div>

      <div style={{ display: 'table', width: '100%', maxWidth: '800px', margin: '20px auto' }}>
        <div style={{ display: 'table-row', fontWeight: 'bold', marginBottom: '15px' }}>
          <div style={{ display: 'table-cell', padding: '10px', width: '50%' }}>Question</div>
          <div style={{ display: 'table-cell', padding: '10px', textAlign: 'center', width: '16.67%' }}>Yes</div>
          <div style={{ display: 'table-cell', padding: '10px', textAlign: 'center', width: '16.67%' }}>No</div>
          <div style={{ display: 'table-cell', padding: '10px', textAlign: 'center', width: '16.67%' }}>I don't know</div>
        </div>
        {questions.map((question) => (
          <div key={question.key} style={{ display: 'table-row', marginBottom: '10px' }}>
            <div style={{ display: 'table-cell', padding: '15px 10px', verticalAlign: 'middle' }}>{question.text}</div>
            <div style={{ display: 'table-cell', padding: '15px 10px', textAlign: 'center', verticalAlign: 'middle' }}>
              <input
                type="radio"
                name={question.key}
                value="Yes"
                checked={answers[question.key] === "Yes"}
                onChange={() => handleOnChange(question.key, "Yes")}
              />
            </div>
            <div style={{ display: 'table-cell', padding: '15px 10px', textAlign: 'center', verticalAlign: 'middle' }}>
              <input
                type="radio"
                name={question.key}
                value="No"
                checked={answers[question.key] === "No"}
                onChange={() => handleOnChange(question.key, "No")}
              />
            </div>
            <div style={{ display: 'table-cell', padding: '15px 10px', textAlign: 'center', verticalAlign: 'middle' }}>
              <input
                type="radio"
                name={question.key}
                value="Patient doesn't know"
                checked={answers[question.key] === "Patient doesn't know"}
                onChange={() => handleOnChange(question.key, "Patient doesn't know")}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <button onClick={handleBackClick}>Back</button>
        <button onClick={handleNextClick} disabled={!checkAllAnswered()}>Next</button>
      </div>
    </div>
    </div>
  );
}

export default Patient2;
