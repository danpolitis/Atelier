import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SearchQuestion from './Q&A-Components/SearchQuestion.jsx';
import QuestionsList from './Q&A-Components/QuestionsList.jsx';
import QuestionForm from './Q&A-Components/QuestionsForm.jsx';

// eslint-disable-next-line react/prop-types
function QuestionsAndAnswers({ productId }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState(questions);
  const [showQuestionsForm, setQuestionForm] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [moreQuestions, showMoreQuestions] = useState(false);

  const fetchQuestions = () => {
    axios.get(`/api/qa/questions?product_id=${productId}`)
      .then((res) => {
        // console.log(res.data.results);
        setQuestions(res.data.results);
        setCurrentQuestions(res.data.results);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, [productId]);

  const handleMoreQuestions = () => {
    showMoreQuestions((more) => !more);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm.length > 1) {
      setSearch(true);
      // showMoreQuestions(true);
    } else {
      setSearch(false);
      // showMoreQuestions(false);
    }
  };

  return (
    <div className="container mb-5">
      <h5>QUESTIONS & ANSWERS</h5>
      <SearchQuestion
        handleSearch={handleSearch}
      />
      <QuestionForm
        productId={productId}
        showQuestionsForm={showQuestionsForm}
        handleQuestionForm={() => { setQuestionForm(false); }}
      />
      <QuestionsList
        search={search}
        searchTerm={searchTerm}
        questions={currentQuestions}
        moreQuestions={moreQuestions}
      />
      <button
        type="button"
        className="btn btn-outline-dark more-questions-button"
        onClick={handleMoreQuestions}
      >
        {moreQuestions ? 'HIDE QUESTIONS' : 'MORE ANSWERED QUESTIONS'}
      </button>

      <button
        type="button"
        className="btn btn-outline-dark add-a-question-button"
        data-bs-toggle="modal"
        data-bs-target="#questionModal"
        onClick={() => { setQuestionForm(true); }}
      >
        ADD A QUESTION +
      </button>
    </div>
  );
}

export default QuestionsAndAnswers;
