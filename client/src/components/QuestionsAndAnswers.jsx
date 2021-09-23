import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ProductContext } from './ProductContext.jsx';
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

  const { setRecordInteraction } = useContext(ProductContext);

  useEffect(() => {
    const { CancelToken } = axios;
    let cancel;
    axios({
      method: 'GET',
      url: '/api/qa/questions',
      params: {
        product_id: productId,
        count: 100,
      },
      cancelToken: new CancelToken((c) => { cancel = c; }),
    })
      .then((res) => {
        // console.log(res.data.results);
        setQuestions(res.data.results);
        setCurrentQuestions(res.data.results);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
  }, [productId]);

  const handleMoreQuestions = (e) => {
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'QuestionsAndAnswers',
      time: new Date(),
    });
    showMoreQuestions((more) => !more);
  };

  const handleSearch = (e) => {
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'QuestionsAndAnswers',
      time: new Date(),
    });
    setSearchTerm(e.target.value);
    if (searchTerm.length + 1 > 2) {
      setSearch(true);
    } else {
      setSearch(false);
    }
  };

  const handleAddQuestion = (e) => {
    setQuestionForm(true);
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'QuestionsAndAnswers',
      time: new Date(),
    });
  };

  return (
    <div className="container mb-5">
      <h5>Questions & Answers</h5>
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
        onClick={handleAddQuestion}
      >
        ADD A QUESTION +
      </button>
    </div>
  );
}

export default QuestionsAndAnswers;
