import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import {
  ratingDesc, fitDesc, comfortDesc, qualityDesc, lenDesc, widthDesc, sizeDesc,
} from './helper.js';
import {
  reviewFormReducer, SELECT_RATING,
  ADD_SUMMARY, ADD_BODY, SELECT_REC, ADD_USER,
  ADD_EMAIL, ADD_COMFORT, ADD_QUALITY, ADD_FIT, ADD_SIZE, ADD_WIDTH,
  ADD_LENGTH, initialState, CLEAR_ENTRIES, ADD_PHOTOS,
} from './Review-Reducers/formsReducer.jsx';
import ValidationMessage from './ValidationMessage.jsx';
import ImagePreview from './ImagePreview.jsx';

const AddReview = (props) => {
  const [state, dispatch] = useReducer(reviewFormReducer, initialState);
  const [submitClick, setSubmitClick] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const mapArray = new Array(5).fill(1);
  const {
    characteristics, sizefit, widthlength, productName,
  } = props;
  const handleChange = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };
  const handlePhotoChange = (e) => {
    dispatch({ type: ADD_PHOTOS, payload: e.target.files[0] });
  };

  const submitMessage = () => {
    if (submitClick === true && errorMessage === false) {
      return (
        <>
          <p>
            Review Submitted!
            {' '}
            <i className="bi bi-check-circle" style={{ fontSize: '24px' }} />
          </p>
        </>
      );
    }
    if (submitClick === false && errorMessage === true) {
      return (
        <>
          <p className="error-message"><em><small>Please Fill out Required:</small></em></p>
          <ValidationMessage state={state} />
        </>
      );
    }
  };

  const postNewReview = (e) => {
    e.preventDefault();
    axios.post('/api/reviews', {
      product_id: props.productId,
      rating: state.selectedRating,
      summary: state.summaryText,
      body: state.bodyText,
      recommend: state.selectRec === 'true',
      name: state.addUsername,
      email: state.addEmail,
      photos: state.addPhotos,
      characteristics: {
        [sizefit.id]: state.size || state.fit,
        [widthlength.id]: state.width || state.length,
        [characteristics.Comfort.id]: state.comfort,
        [characteristics.Quality.id]: state.quality,
      },
    })
      .then(() => {
        console.log('Review Posted');
        setErrorMessage(false);
        setSubmitClick(true);
        dispatch({ type: CLEAR_ENTRIES });
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({ type: CLEAR_ENTRIES });
        setErrorMessage(true);
        setSubmitClick(false);
        console.log(err.response);
      });
  };

  return (
    <div className="modal" id="reviewModal" tabIndex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="reviewModalLabel">
              Write Your Review
              {' '}
              <br />
              <small className="text-muted">{`About the ${productName}`}</small>
            </h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <form>
              <p><strong>Overall Rating</strong></p>
              <div className="star-rating-form">
                <StarRatings
                  changeRating={(rating) => {
                    dispatch({ type: SELECT_RATING, payload: rating });
                  }}
                  starSpacing="4px"
                  rating={Number(state.selectedRating)}
                  starRatedColor="rgb(255,215,0)"
                  starHoverColor="rgb(255,215,0)"
                  numberOfStars={5}
                  starDimension="30px"
                />
                <span className="select-rating-span">{ratingDesc(state.selectedRating)}</span>
              </div>
              <div className="mb-3">
                <p><strong>Do you recommend this product?</strong></p>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Yes
                    <input
                      onChange={handleChange}
                      className="form-check-input"
                      type="radio"
                      checked={state.selectRec === 'true'}
                      name={SELECT_REC}
                      id="inlineRadio1"
                      value="true"
                    />
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    No
                    <input
                      onChange={handleChange}
                      className="form-check-input"
                      type="radio"
                      checked={state.selectRec === 'false'}
                      name={SELECT_REC}
                      id="inlineRadio2"
                      value="false"
                    />
                  </label>
                </div>
              </div>
              <div className="characteristics-radio">
                <p><strong>Characteristics</strong></p>
                <h6 className="radio-characteristic-labels">
                  {characteristics.Fit ? 'Fit' : 'Size'}
                </h6>
                {mapArray.map((radio, i) => (
                  <div className="radio-label-vertical-wrapper" key={i + 1}>
                    <label className="radio-label-vertical" htmlFor={`inlineRadio${i + 1}`}>
                      {characteristics.Fit ? fitDesc(i + 1) : sizeDesc(i + 1)}
                      <input
                        onChange={handleChange}
                        checked={(i + 1) === (state.fit || state.size)}
                        className="form-check-input"
                        type="radio"
                        name={characteristics.Fit ? ADD_FIT : ADD_SIZE}
                        value={i + 1}
                      />
                    </label>
                  </div>
                ))}
                <h6 className="radio-characteristic-labels">
                  {characteristics.Length ? 'Length' : 'Width'}
                </h6>
                {mapArray.map((radio, i) => (
                  <div className="radio-label-vertical-wrapper" key={i + 1}>
                    <label className="radio-label-vertical" htmlFor={`inlineRadio${i + 1}`}>
                      {props.characteristics.Length ? lenDesc(i + 1) : widthDesc(i + 1)}
                      <input
                        onChange={handleChange}
                        className="form-check-input"
                        checked={(i + 1) === (state.length || state.width)}
                        type="radio"
                        name={characteristics.Length ? ADD_LENGTH : ADD_WIDTH}
                        value={i + 1}
                      />
                    </label>
                  </div>
                ))}
                <h6 className="radio-characteristic-labels">Comfort</h6>
                {mapArray.map((radio, i) => (
                  <div className="radio-label-vertical-wrapper" key={i + 1}>
                    <label className="radio-label-vertical" htmlFor={`inlineRadio${i + 1}`}>
                      {comfortDesc(i + 1)}
                      <input onChange={handleChange} className="form-check-input" checked={(i + 1) === state.comfort} type="radio" name={ADD_COMFORT} value={i + 1} />
                    </label>
                  </div>
                ))}
                <h6 className="radio-characteristic-labels">Quality</h6>
                {mapArray.map((radio, i) => (
                  <div className="radio-label-vertical-wrapper" key={i + 1}>
                    <label className="radio-label-vertical" htmlFor={`inlineRadio${i + 1}`}>
                      {qualityDesc(i + 1)}
                      <input onChange={handleChange} className="form-check-input" type="radio" checked={(i + 1) === state.quality} name={ADD_QUALITY} value={i + 1} />
                    </label>
                  </div>
                ))}
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                  <strong>Review summary</strong>
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  maxLength="60"
                  id="message-text"
                  required
                  name={ADD_SUMMARY}
                  placeholder="Example: Best purchase ever!"
                  value={state.summaryText}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                  <strong>Review body</strong>
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  maxLength="1000"
                  minLength="50"
                  id="message-text"
                  placeholder="Why did you like the product or not?"
                  name={ADD_BODY}
                  value={state.bodyText}
                  onChange={handleChange}
                />

                {state.bodyText.length < 50
                  ? (
                    <p className="text-muted">
                      <small>
                        Minimum required characters left: [
                        {50 - state.bodyText.length}
                        ]
                      </small>
                    </p>
                  )
                  : <p className="text-muted"><small>Minimum reached</small></p>}
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                  <strong>What is your nickname</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  maxLength="60"
                  id="message-text"
                  required
                  placeholder="Example: jackson11!"
                  value={state.addUsername}
                  name={ADD_USER}
                  onChange={handleChange}
                />
                <p className="text-muted">
                  <small>
                    For privacy reasons, do not use your full name or email address
                  </small>
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                  <strong>Your email</strong>
                </label>
                <input
                  type="email"
                  className="form-control"
                  maxLength="60"
                  id="message-text"
                  required
                  placeholder="Example: jackson11@email.com"
                  value={state.addEmail}
                  name={ADD_EMAIL}
                  onChange={handleChange}
                />
                <p className="text-muted">
                  <small>
                    For authentication reasons, you will not be emailed
                  </small>
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">
                  <strong>Photo Upload</strong>
                  <br />
                  <input onChange={handlePhotoChange} type="file" value={state.addPhotos} accept=".jpg,.png," className="form-control-file" id="exampleFormControlFile1" />
                  <br />
                </label>
                <ImagePreview />
              </div>
              <div>
                {submitMessage()}
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => { dispatch({ type: CLEAR_ENTRIES }); }} className="btn btn-outline-secondary w-30 p-3" data-bs-dismiss="modal">Close</button>
                <button type="submit" onClick={(e) => postNewReview(e)} className="btn btn-outline-dark w-30 p-3">Submit Review</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
