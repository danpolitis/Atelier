import React from 'react';
export const FETCH_SUCCESS = 'FETCH_SUCESS';
export const GET_RECOMMEND = 'GET_RECOMMEND';
export const ERROR = 'ERROR';

export const reviewReducers = (state, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        totalRatings: Object.values(action.payload.ratings)
          .reduce((prev, curr) => Number(prev) + Number(curr)),
        base: Object.keys(action.payload.ratings)
          .reduce((prev, curr) => Number(prev) + Number(curr)),
        average: Object.values(action.payload.ratings)
          .reduce((r, a, i) => (Number(r) + Number(a)
          * Number(Object.keys(action.payload.ratings)[i])))
          / 15,
        ratings: action.payload.ratings,
      };
    case GET_RECOMMEND:
      return {
        ...state,
        recommend: ((Number(action.payload.true)
        / (Number(action.payload.true)
        + Number(action.payload.false))) * 100),
      };
    case ERROR:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
};
