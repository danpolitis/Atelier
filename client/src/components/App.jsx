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
      <Overview productId={productId} />
      <RelatedItems productId={productId} setProductId={setProductId} />
      <QuestionsAndAnswers productId={productId} />
      <Reviews productId={productId} />
    </div>
  );
}

export default App;
