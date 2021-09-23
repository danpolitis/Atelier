import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ProductContext } from '../ProductContext.jsx';

// eslint-disable-next-line react/prop-types
const QuestionForm = ({ productId, fetchQuestions }) => {
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { productInfo } = useContext(ProductContext);

  const data = ({
    body,
    name,
    email,
    product_id: productId,
  });

  const headers = {
    'Content-Type': 'application/json',
  };
  const postNewQuestion = () => {
    axios.post('/api/qa/questions', data, {
      headers,
    })
      .then(() => {
        setBody('');
        setName('');
        setEmail('');
      })
      .then(() => {
        fetchQuestions();
      })
      .catch(() => {
        // console.log(err.response.data);
        // console.log(err.response);
      });
  };

  const handerSubmitQuestion = (e) => {
    e.preventDefault();
    postNewQuestion();
  };

  return (
    <div className="modal" id="questionModal" tabIndex="-1" aria-labelledby="questionModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title" id="questionModalLabel">{`Ask Your Question about the ${productInfo.name}`}</h5>

            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>

          <div className="modal-body">
            <form onSubmit={handerSubmitQuestion}>
              <div className="mb-3">
                <label className="col-form-label">*What is your nickname?</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Example: jackson11!"
                  value={name}
                  onChange={(e) => { setName(e.target.value); }}
                  required
                />
              </div>

              <div className="mb-3">

                <label className="col-form-label">*Your email:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Example: jack@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); }}
                  required
                />
                <span className="email-notice">For authentication reasons, you will not be emailed</span>
              </div>
              <div className="mb-3">
                <label  className="col-form-label">*Your question:</label>
                <textarea
                  type="text"
                  className="form-control"
                  value={body}
                  onChange={(e) => { setBody(e.target.value); }}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-outline-dark" data-bs-dismiss="modal">Submit Question</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
