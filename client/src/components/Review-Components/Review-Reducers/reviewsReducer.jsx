import React from 'react';
export const FETCH_REVIEW_SUCCESS = 'FETCH_REVIEW_SUCCESS';
export const IS_LOADING = 'IS_LOADING';
export const SET_COUNT = 'SET_COUNT';
export const MODAL_CLICK = 'MODAL_CLICK';
export const SELECT_CHANGE = 'SELECT_CHANGE';
export const SEARCH_RESULT = 'SEARCH_RESULT';

export const reviewListReducer = (state, action) => {
  switch (action.type) {
    case FETCH_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
        isLoading: false,
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_COUNT:
      return {
        ...state,
        count: state.count + 2,
      };
    case MODAL_CLICK:
      return {
        ...state,
        modalClick: !state.modalClick,
      };
    case SELECT_CHANGE:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};

export const initState = {
  reviews: [],
  count: 2,
  isLoading: false,
  modalClick: false,
  selected: 'relevant',
};