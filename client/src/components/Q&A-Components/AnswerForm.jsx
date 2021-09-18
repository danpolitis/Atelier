import React, { useState } from 'react';
import axios from 'axios';

const AnswerForm = ({ questionId, questionBody }) => {
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const data = ({
    body,
    name,
    email,
    photo: [],
  });
  const headers = {
    'Content-Type': 'application/json',
  };
  const postNewAnswer = () => {
    axios.post(`/api/qa/questions/${questionId}/answers`, data, {
      headers,
    })
      .then(() => {
        setBody('');
        setName('');
        setEmail('');
      })
      .catch((err) => {
        // console.log(err.response.data);
        // console.log(err.response);
      });
  };

  const handerSubmitAnswer = (e) => {
    e.preventDefault();
    // console.log(data);
    postNewAnswer();
  };

  return (
    <div className="modal" id="answerModal" tabIndex="-1" aria-labelledby="answerModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title" id="answerModalLabel">Submit Your Answer</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>

          <div className="modal-body">
            <form onSubmit={handerSubmitAnswer}>
              <div className="mb-3">
                <label className="col-form-label">What is your nickname?</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Example: jack543!"
                  value={name}
                  onChange={(e) => { setName(e.target.value); }}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Your email:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Example: jack@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); }}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Your answer:</label>
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
                <button type="submit" className="btn btn-outline-dark" data-bs-dismiss="modal">Submit Answer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerForm;
