export const SELECT_RATING = 'SELECT_RATING';
export const ADD_SUMMARY = 'ADD_SUMMARY';
export const ADD_BODY = 'ADD_BODY';
export const SELECT_REC = 'SELECT_REC';
export const ADD_USER = 'ADD_USER';
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_PHOTOS = 'ADD_PHOTOS';
export const DELETE_PHOTOS = 'DELETE_PHOTOS';
export const ADD_LENGTH = 'ADD_LENGTH';
export const ADD_COMFORT = 'ADD_COMFORT';
export const ADD_QUALITY = 'ADD_QUALITY';
export const ADD_FIT = 'ADD_FIT';
export const ADD_SIZE = 'ADD_SIZE';
export const ADD_WIDTH = 'ADD_WIDTH';
export const CLEAR_ENTRIES = 'CLEAR_ENTRIES';

export const reviewFormReducer = (state, action) => {
  switch (action.type) {
    case SELECT_RATING:
      return {
        ...state,
        selectedRating: Number(action.payload),
      };
    case ADD_SUMMARY:
      return {
        ...state,
        summaryText: action.payload,
      };
    case ADD_BODY:
      return {
        ...state,
        bodyText: action.payload,
      };
    case SELECT_REC:
      return {
        ...state,
        selectRec: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        addUsername: action.payload,
      };
    case ADD_EMAIL:
      return {
        ...state,
        addEmail: action.payload,
      };
    case ADD_PHOTOS:
      return {
        ...state,
        addPhotos: [...state.addPhotos, action.payload],
      };
    case DELETE_PHOTOS:
      return {
        ...state,
        addPhotos: [...state.addPhotos.filter((photo) => photo !== action.payload)],
      };
    case ADD_LENGTH:
      return {
        ...state,
        length: Number(action.payload),
      };
    case ADD_COMFORT:
      return {
        ...state,
        comfort: Number(action.payload),
      };
    case ADD_QUALITY:
      return {
        ...state,
        quality: Number(action.payload),
      };
    case ADD_FIT:
      return {
        ...state,
        fit: Number(action.payload),
      };
    case ADD_SIZE:
      return {
        ...state,
        size: Number(action.payload),
      };
    case ADD_WIDTH:
      return {
        ...state,
        width: Number(action.payload),
      };
    case CLEAR_ENTRIES:
      return {
        addPhotos: [],
        summaryText: '',
        bodyText: '',
        selectRec: null,
        addUsername: '',
        addEmail: '',
        fit: 0,
        size: 0,
        length: 0,
        width: 0,
        quality: 0,
        comfort: 0,
        selectedRating: 0,
      };
    default:
      return state;
  }
};

export const initialState = {
  selectedRating: 0,
  summaryText: '',
  bodyText: '',
  selectRec: false,
  addUsername: '',
  addEmail: '',
  addPhotos: [],
  fit: 0,
  size: 0,
  length: 0,
  width: 0,
  quality: 0,
  comfort: 0,
};
