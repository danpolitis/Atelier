import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswersList from './AnswersList.jsx';
import AnswerForm from './AnswerForm.jsx';

const Question = ({ question }) => {
  const [answers, setAnswers] = useState([]);
  const [currentAnswers, setCurrentAnswers] = useState(answers);
  const [helpful, setHelpful] = useState(question.question_helpfulness);
  const [voted, setVoted] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const fetchAnswers = () => {
    axios.get(`/api/qa/questions/${question.question_id}/answers`)
      .then((res) => {
        if (res.data.results.length) {
          // console.log(res.data.results);
          setAnswers(res.data.results);
          setCurrentAnswers(res.data.results);
        }
      });
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  const handleHelpClick = () => {
    if (!voted) {
      setVoted((vote) => !vote);
      setHelpful((helped) => helped + 1);
      axios.put(
        `/api/qa/questions/${question.question_id}/helpful`,
        {
          question_helpfulness: helpful,
        },
      )
        .then(() => {

        })
        .catch((err) => {
          Promise.reject(err);
        });
    }
  };

  return (
    <>
      <div className="q-entry">
        <span className="q-body">{`Q: ${question.question_body}`}</span>
        <div>
          <span
            className="helpful"
            className="btn btn-outline-success"
            onClick={handleHelpClick}
          >
            {voted ? `You and ${helpful} others thought this was helpful` : ` Helpful? Yes: ${helpful}`}
          </span>
          <span className="helpful-grid">{'  |  '}</span>
          <span
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#answerModal"
            onClick={() => { setShowAnswerForm(true); }}
            className="btn btn-outline-success"
          >
            Add Answer
          </span>
        </div>
      </div>
      <AnswersList answers={currentAnswers} />
      <AnswerForm
        questionId={question.question_id}
        questionBody={question.question_body}
        showAnswerForm={showAnswerForm}
        handleAnswerForm={() => { setShowAnswerForm(false); }}
      />
    </>
  );
};

export default Question;
