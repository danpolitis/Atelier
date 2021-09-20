import React, { useReducer, useState, useContext } from 'react';
import axios from 'axios';
import uniqid from 'uniqid';
import StarRatings from 'react-star-ratings';
import { GiCheckMark } from 'react-icons/gi';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {
  ratingDesc, fitDesc, comfortDesc, qualityDesc, lenDesc, widthDesc, sizeDesc,
} from './helper.js';
import {
  reviewFormReducer, SELECT_RATING,
  ADD_SUMMARY, ADD_BODY, SELECT_REC, ADD_USER,
  ADD_EMAIL, ADD_COMFORT, ADD_QUALITY, ADD_FIT, ADD_SIZE, ADD_WIDTH,
  ADD_LENGTH, initialState, CLEAR_ENTRIES, ADD_PHOTOS, DELETE_PHOTOS,
} from '../Review-Reducers/formsReducer.jsx';
import ValidationMessage from './ValidationMessage.jsx';
import ImagePreview from './ImagePreview.jsx';
import { ProductContext } from '../../ProductContext.jsx';

const AddReview = (props) => {
  const [state, dispatch] = useReducer(reviewFormReducer, initialState);
  const [submitClick, setSubmitClick] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const product = useContext(ProductContext);

  const {
    characteristics, sizefit, widthlength, getReviews, productId, selected, count,
  } = props;

  const mapArray = new Array(5).fill(1);

  const handleChange = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };
  const handlePhotoChange = (e) => {
    dispatch({ type: ADD_PHOTOS, payload: URL.createObjectURL(e.target.files[0]) });
  };

  const handlePhotoDelete = (name) => {
    dispatch({ type: DELETE_PHOTOS, payload: name });
  };

  const postNewReview = (e) => {
    e.preventDefault();
    axios.post('/api/reviews', {
      product_id: productId,
      rating: state.selectedRating,
      summary: state.summaryText,
      body: state.bodyText,
      recommend: state.selectRec === 'true',
      name: state.addUsername,
      email: state.addEmail,
      photos: [],
      characteristics: {
        [sizefit.id]: state.size || state.fit,
        [widthlength.id]: state.width || state.length,
        [characteristics.Comfort.id]: state.comfort,
        [characteristics.Quality.id]: state.quality,
      },
    })
      .then(() => {
        setErrorMessage(false);
        setSubmitClick(true);
        dispatch({ type: CLEAR_ENTRIES });
        getReviews(productId, count, selected);
        console.log('Review Posted');
      })
      .catch((err) => {
        dispatch({ type: CLEAR_ENTRIES });
        setErrorMessage(true);
        setSubmitClick(false);
        console.log(err.response.data);
      });
  };

  const characteristicsRadio = (characteristic, descOne,
    descTwo, stateOne, stateTwo, dispatchOne, dispatchTwo) => {
    const radioDescription = mapArray.map((radio, i) => (
      <div className="radio-label-vertical-wrapper" key={uniqid()}>
        <label className="radio-label-vertical" htmlFor={`inlineRadio${i + 1}`}>
          {characteristic ? descOne(i + 1) : descTwo(i + 1)}
          <input
            onChange={handleChange}
            checked={(i + 1) === (stateOne || stateTwo)}
            className="form-check-input"
            type="radio"
            name={characteristic ? dispatchOne : dispatchTwo}
            value={i + 1}
          />
        </label>
      </div>
    ));
    return radioDescription;
  };

  const qualityComfortRadio = (descOne, key, dispatchName) => {
    const qualityComfort = mapArray.map((radio, i) => (
      <div className="radio-label-vertical-wrapper" key={uniqid()}>
        <label className="radio-label-vertical" htmlFor={`inlineRadio${i + 1}`}>
          {descOne(i + 1)}
          <input onChange={handleChange} className="form-check-input" type="radio" checked={(i + 1) === key} name={dispatchName} value={i + 1} />
        </label>
      </div>
    ));
    return qualityComfort;
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
              <small className="text-muted">{`About the ${product.productInfo.name}`}</small>
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
                {characteristicsRadio(characteristics.Fit, fitDesc,
                  sizeDesc, state.fit, state.size, ADD_FIT, ADD_SIZE)}
                <h6 className="radio-characteristic-labels">
                  {characteristics.Length ? 'Length' : 'Width'}
                </h6>
                {characteristicsRadio(characteristics.Length, lenDesc,
                  widthDesc, state.length, state.width, ADD_LENGTH, ADD_WIDTH)}
                <h6 className="radio-characteristic-labels">Comfort</h6>
                {qualityComfortRadio(comfortDesc, state.comfort, ADD_COMFORT)}
                <h6 className="radio-characteristic-labels">Quality</h6>
                {qualityComfortRadio(qualityDesc, state.quality, ADD_QUALITY)}
              </div>
              <div className="mb-3">
                <label className="col-form-label">
                  <strong>Review summary</strong>
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  maxLength="60"
                  required
                  name={ADD_SUMMARY}
                  placeholder="Example: Best purchase ever!"
                  value={state.summaryText}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">
                  <strong>Review body</strong>
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  maxLength="1000"
                  minLength="50"
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
                <label className="col-form-label">
                  <strong>What is your nickname</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  maxLength="60"
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
                <label className="col-form-label">
                  <strong>Your email</strong>
                </label>
                <input
                  type="email"
                  className="form-control"
                  maxLength="60"
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
                  <input onChange={handlePhotoChange} type="file" accept=".jpg,.png," className="form-control-file" />
                  <br />
                </label>
                <ImagePreview handlePhotoDelete={handlePhotoDelete} images={state.addPhotos} />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => { dispatch({ type: CLEAR_ENTRIES }); }} className="btn btn-outline-secondary w-30 p-3" data-bs-dismiss="modal">Close</button>
                <OverlayTrigger
                  placement="auto"
                  trigger="focus"
                  overlay={(
                    <Popover>
                      <Popover.Title as="h3">
                        {submitClick && !errorMessage ? 'Thank you!' : 'Required:'}
                      </Popover.Title>
                      <Popover.Content>
                        {submitClick && !errorMessage
                          ? (
                            <>
                              <span>Review Submitted! </span>
                              <GiCheckMark />
                            </>
                          )
                          : <ValidationMessage state={state} />}
                      </Popover.Content>
                    </Popover>
                  )}
                >
                  <button type="submit" onClick={(e) => postNewReview(e)} className="btn btn-outline-dark w-30 p-3">Submit Review</button>
                </OverlayTrigger>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
