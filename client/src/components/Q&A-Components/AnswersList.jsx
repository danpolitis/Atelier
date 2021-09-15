import React, { useState } from 'react';
import Answer from './Answer.jsx';

const AnswersList = ({ answers }) => {
  answers.sort((a, b) => b.helpfulness - a.helpfulness);

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
    </div>
  );
};

export default AnswersList;
