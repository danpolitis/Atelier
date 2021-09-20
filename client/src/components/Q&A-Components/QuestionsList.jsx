import React, { useState } from 'react';
import Question from './Question.jsx';

// eslint-disable-next-line react/prop-types
const QuestionsList = ({ questions, moreQuestions, search, searchTerm }) => {
  questions.sort((a, b) => b.helpfulness - a.helpfulness);

  const filteredQuestions = [];
  for (let i = 0; i < questions.length; i++) {
    if (Object.keys(questions[i].answers).length !== 0) {
      filteredQuestions.push(questions[i]);
    }
  }

  let sortedQuestions = filteredQuestions;
  if (search) {
    sortedQuestions = filteredQuestions.filter((question) => (
      question.question_body.toLowerCase().includes(searchTerm.toLowerCase()) ? question : null
    ));
    // console.log(searchTerm);
    // console.log(sortedQuestions);
  }

  if (moreQuestions) {
    return (
      <div>
        <ul className="more-questions-list">
          {filteredQuestions.map((question) => (
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
              />
            ))}
        </ul>
      </div>
    );
  }
  return (
    <div>
      <ul className="questions-list">
        {filteredQuestions.filter((question, index) => (
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
