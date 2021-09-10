import React from 'react';
// import bootstrap from 'bootstrap';

import Overview from './Overview.jsx';
import RelatedItems from './RelatedItems.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers.jsx';
import Reviews from './Reviews.jsx';

function App() {
  return (
    <div className="container">
      <div className="row">
        <Overview />
      </div>
      <div className="row">
        <RelatedItems />
      </div>
      <div className="row">
        <QuestionsAndAnswers />
      </div>
      <div className="row">
        <Reviews />
      </div>
    </div>
  );
}

export default App;
