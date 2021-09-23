import React, { useState, useContext } from 'react';
import Answer from './Answer.jsx';
import { ProductContext } from '../ProductContext.jsx';

const AnswersList = ({ answers }) => {
  const [moreAnswers, showMoreAnswers] = useState(false);
  const { setRecordInteraction } = useContext(ProductContext);
  answers.sort((a, b) => b.helpfulness - a.helpfulness);

  const handleMoreAnswers = (e) => {
    showMoreAnswers((more) => !more);
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'QuestionsAndAnswers',
      time: new Date(),
    });
  };

  if (moreAnswers) {
    return (
      <>
        <ul className="more-answer-list">
          {answers.map((answer) => (
            <div key={answer.answer_id}>
              <Answer answer={answer} key={answer.answer_id} />
            </div>
          ))}
        </ul>
        <button
          className="more-answers-button btn btn-outline-dark"
          onClick={handleMoreAnswers}
        >
          HIDE ANSWERS
        </button>
      </>
    );
  }
  return (
    <div>
      <ul className="answer-list">
        {answers.filter((answer, index) => (
          index < 2
        )).map((answer) => (
          <div key={answer.answer_id}>
            <Answer answer={answer} key={answer.answer_id} />
          </div>
        ))}
      </ul>
      <button
        className="more-answers-button btn btn-outline-dark"
        onClick={handleMoreAnswers}
      >
        LOAD MORE ANSWERS
      </button>
    </div>
  );
};

export default AnswersList;
