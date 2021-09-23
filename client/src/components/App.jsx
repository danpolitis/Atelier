import React, { useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './globalStyles.js';
import { lightTheme, darkTheme } from './Theme.js';
import { ProductContext } from './ProductContext.jsx';

import Navbar from './Navbar.jsx';
import Announcement from './Announcement.jsx';
import Overview from './Overview.jsx';
import RelatedItems from './RelatedItems.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers.jsx';
import Reviews from './Reviews.jsx';

function App() {
  const { productId, setProductId } = useContext(ProductContext);
  const [theme, setTheme] = useState(true);

  return (
    <ThemeProvider theme={theme ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Navbar setTheme={setTheme} theme={theme} />
      <Announcement />
      <Overview productId={productId} />
      <RelatedItems productId={productId} setProductId={setProductId} />
      <QuestionsAndAnswers productId={productId} />
      <Reviews productId={productId} />
    </ThemeProvider>
  );
}

export default App;
