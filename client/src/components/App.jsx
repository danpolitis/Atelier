import React, { useContext } from 'react';
import { ProductContext } from './ProductContext.jsx';

import Navbar from './Navbar.jsx';
import Overview from './Overview.jsx';
import RelatedItems from './RelatedItems.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers.jsx';
import Reviews from './Reviews.jsx';

function App() {
  const { productId, setProductId } = useContext(ProductContext);

  return (
    <>
      <Navbar />
      <Overview productId={productId} />
      <RelatedItems productId={productId} setProductId={setProductId} />
      <QuestionsAndAnswers productId={productId} />
      <Reviews productId={productId} />
    </>
  );
}

export default App;
