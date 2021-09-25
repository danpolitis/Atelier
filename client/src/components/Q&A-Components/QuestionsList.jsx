import React, {
  useState, useContext, useRef, useCallback,
} from 'react';
import styled from 'styled-components';
import { ProductContext } from '../ProductContext.jsx';
import Question from './Question.jsx';
import useAllQuestions from './useAllQuestions';

const MoreQuestions = styled.div`
  height: 350px;
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  margin: auto;
`;

const QuestionsList = ({ moreQuestions, search, searchTerm }) => {
  const [page, setPage] = useState(1);
  const { productId } = useContext(ProductContext);
  const {
    loading, error, questionsInfinite, hasMore,
  } = useAllQuestions(productId, page, search, searchTerm);

  const observer = useRef(null);
  const lastQuestionRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  let sortedQuestions = questionsInfinite;
  if (search) {
    sortedQuestions = questionsInfinite.filter((question) => (
      question.question_body.toLowerCase().includes(searchTerm.toLowerCase()) ? question : null
    ));
  }

  if (moreQuestions) {
    if (search) {
      return (
        <>
          <MoreQuestions>
            {sortedQuestions.length === 0
              ? (
                <span>
                  No More Questions
                </span>
              )
              : sortedQuestions.map((question, i) => {
                if (questionsInfinite.length === i + 1) {
                  return (
                    <div ref={lastQuestionRef} key={question.question_id}>
                      <Question key={question.question_id} question={question} />
                    </div>
                  );
                }
                return <Question key={question.question_id} question={question} />;
              })}
            <span>{loading ? 'loading' : null}</span>
            <span>{error ? 'error' : null}</span>
          </MoreQuestions>
        </>
      );
    }
    return (
      <>
        <MoreQuestions>
          {questionsInfinite.length === 0
            ? (
              <span ref={lastQuestionRef}>
                No More Questions
              </span>
            )
            : sortedQuestions.map((question, i) => {
              if (questionsInfinite.length === i + 1) {
                return (
                  <div ref={lastQuestionRef} key={question.question_id}>
                    <Question key={question.question_id} question={question} />
                  </div>
                );
              }
              return <Question key={question.question_id} question={question} />;
            })}
          <span>{loading ? 'loading' : null}</span>
          <span>{error ? 'error' : null}</span>
        </MoreQuestions>
      </>
    );
  }
  if (search) {
    return (
      <div>
        <ul className="questions-list">
          {sortedQuestions.length === 0
            ? (
              // eslint-disable-next-line max-len
              <span> Hmm, no matches. To get an answer, try different keywords or post your question to the community.</span>
            )
            : sortedQuestions.map((question) => (
              <div key={question.question_id}>
                <Question key={question.question_id} question={question} />
              </div>
            ))}
        </ul>
      </div>
    );
  }
  return (
    <div>
      <ul className="questions-list">
        {
          sortedQuestions.filter((question, index) => (
            index < 4
          )).map((question) => (
            <div key={question.question_id}>
              <Question key={question.question_id} question={question} />
            </div>
          ))
        }
      </ul>
    </div>
  );
};

export default QuestionsList;
