import React, { useState } from 'react';
import styled from 'styled-components';
import Question from './Question.jsx';

const MoreQuestions = styled.div`
  height: 350px;
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  margin: auto;
`;

const QuestionsList = ({
  questions, moreQuestions, search, searchTerm,
}) => {
  questions.sort((a, b) => b.helpfulness - a.helpfulness);

  let sortedQuestions = [];
  if (search) {
    sortedQuestions = questions.filter((question) => (
      question.question_body.toLowerCase().includes(searchTerm.toLowerCase()) ? question : null
    ));
  }

  if (moreQuestions) {
    return (
      <div>
        <MoreQuestions>
          {questions.map((question) => (
            <div key={question.question_id}>
              <Question
                key={question.question_id}
                question={question}
              />
            </div>
          ))}
        </MoreQuestions>
      </div>
    );
  }
  if (search) {
    return (
      <div>
        <ul className="questions-list">
          {sortedQuestions.length === 0
            ? (
              // eslint-disable-next-line max-len
              <span>Hmm, no matches. To get an answer, try different keywords or post your question to the community.</span>
            )
            : sortedQuestions.map((question) => (

              <Question
                key={question.question_id}
                question={question}
                searchTerm={searchTerm}
              />

            ))}
        </ul>
      </div>
    );
  }
  return (
    <div>
      <ul className="questions-list">
        {questions.filter((question, index) => (
          index < 2
        )).map((question) => (
          <div key={question.question_id}>
            <Question
              key={question.question_id}
              question={question}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
