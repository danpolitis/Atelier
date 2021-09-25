/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ProductContext } from '../ProductContext.jsx';

const Answer = ({ answer }) => {
  const [helpful, setHelpful] = useState(answer.helpfulness);
  const [voted, setVoted] = useState(false);
  const [reported, setReported] = useState(false);

  const { setRecordInteraction } = useContext(ProductContext);

  const handleHelpClick = (e) => {
    if (!voted) {
      setVoted((vote) => !vote);
      setHelpful((helped) => helped + 1);
      axios.put(
        `/api/qa/answers/${answer.answer_id}/helpful`,
        {
          helpfulness: helpful,
        },
      )
        .then(() => {

        })
        .catch((res, err) => {
          Promise.reject(err);
        });
    }
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'QuestionsAndAnswers',
      time: new Date(),
    });
  };

  const handleReport = (e) => {
    setReported(true);
    axios.put(
      `/api/qa/answers/${answer.answer_id}/report`,
      {
        reported: true,
      },
    )
      .then(() => {

      })
      .catch((err) => {
        Promise.reject(err);
      });
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'QuestionsAndAnswers',
      time: new Date(),
    });
  };

  return (
    <div className="a-entry">
      <div className="a-bullet">
        {`A: ${answer.body}`}
      </div>
      <div className="Ahelp-report">
        <span>By:</span>
        <span className="seller">
          {answer.answerer_name === 'Seller' ? `${answer.answerer_name}, ` : null}
        </span>
        <span>
          {answer.answerer_name !== 'Seller' ? `${answer.answerer_name}, ` : null}
        </span>
        {` ${new Date(answer.date).toLocaleDateString(
          undefined, { year: 'numeric', month: 'long', day: 'numeric' },
        )}`}
        <span> </span>
        <span
          className="answer-helpful"
          onClick={handleHelpClick}
        >
          Helpful? Yes:
          {voted ? `(${helpful})` : `(${helpful})`}
        </span>
        <small>{'  |  '}</small>
        <span
          className="answer-helpful"
          onClick={handleReport}
        >
          {reported ? 'Answer was Reported' : 'Report'}
        </span>
      </div>
    </div>
  );
};

export default Answer;
