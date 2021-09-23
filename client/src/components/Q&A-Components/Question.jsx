/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AnswersList from './AnswersList.jsx';
import AnswerForm from './AnswerForm.jsx';
import { ProductContext } from '../ProductContext.jsx';

const Question = ({ question }) => {
  const [answers, setAnswers] = useState([]);
  const [helpful, setHelpful] = useState(question.question_helpfulness);
  const [voted, setVoted] = useState(false);
  const [reported, setReported] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const { setRecordInteraction } = useContext(ProductContext);

  const fetchAnswers = () => {
    axios.get(`/api/qa/questions/${question.question_id}/answers?count=100`)
      .then((res) => {
        if (res.data.results.length) {
          // console.log(res.data.results);
          setAnswers(res.data.results);
        }
      });
  };

  useEffect(() => {
    fetchAnswers();
  }, [question.question_id]);

  const handleHelpClick = (e) => {
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'QuestionsAndAnswers',
      time: new Date(),
    });
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

  const handleReport = (e) => {
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'QuestionsAndAnswers',
      time: new Date(),
    });
    setReported(true);
    axios.put(
      `api/qa/questions/${question.question_id}/report`,
      {
        reported: true,
      },
    )
      .then(() => {

      })
      .catch((err) => {
        Promise.reject(err);
      });
  };

  const handleAddAnswer = (e) => {
    setShowAnswerForm(true);
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'QuestionsAndAnswers',
      time: new Date(),
    });
  };

  return (
    <>
      <div className="q-entry">
        <span className="q-body">
          {`Q: ${question.question_body}`}
        </span>
        <div>
          <span
            className="helpful-review"
            onClick={handleHelpClick}
          >
            Helpful? Yes:
            {voted ? `(${helpful})` : `(${helpful})`}
          </span>
          <small>{'  |  '}</small>
          <span
            className="helpful-review"
            onClick={handleReport}
          >
            {reported ? 'Question was Reported ' : ' Report'}
          </span>
          <small>{'  |  '}</small>
          <span
            type="button"
            data-bs-toggle="modal"
            data-bs-target={`#answerModal${question.question_id}`}
            onClick={handleAddAnswer}
            className="helpful-review"
          >
            Add Answer
          </span>
        </div>
      </div>
      <AnswersList answers={answers} />
      <AnswerForm
        setAnswers={setAnswers}
        questionId={question.question_id}
        questionBody={question.question_body}
        showAnswerForm={showAnswerForm}
        handleAnswerForm={() => { setShowAnswerForm(false); }}
        fetchAnswers={fetchAnswers}
      />
    </>
  );
};

export default Question;
