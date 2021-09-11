import React, { useState } from 'react';
// import bootstrap from 'bootstrap';

import Overview from './Overview.jsx';
import RelatedItems from './RelatedItems.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers.jsx';
import Reviews from './Reviews.jsx';
import axios from 'axios';

function App() {
  const [productId, setProductId] = useState(42366);
  return (
    <div className="container">
      <div className="row">
        <Overview productId={productId} />
      </div>
      <div className="row">
        <RelatedItems productId={productId} setProductId={setProductId} />
      </div>
      <div className="row">
        <QuestionsAndAnswers productId={productId} />
      </div>
      <div className="row">
        <Reviews productId={productId} />
      </div>
    </div>
  );
}

export default App;
