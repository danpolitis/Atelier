export const FETCH_SUCCESS = 'FETCH_SUCESS';
export const GET_RECOMMEND = 'GET_RECOMMEND';
export const ERROR = 'ERROR';
export const GET_CHARACTERISTICS = 'GET_CHARACTERISTICS';

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
          / Object.values(action.payload.ratings)
            .reduce((prev, curr) => Number(prev) + Number(curr)),
        ratings: action.payload.ratings,
      };
    case GET_RECOMMEND:
      return {
        ...state,
        recommend: ((Number(action.payload.true)
        / ((Number(action.payload.true) || 0)
        + (Number(action.payload.false) || 0))) * 100) || 0,
      };
    case ERROR:
      return {
        ...state,
        isError: true,
      };
    case GET_CHARACTERISTICS:
      return {
        ...state,
        characteristics: action.payload.characteristics,
      };
    default:
      return state;
  }
};

export const initialState = {
  ratings: {},
  average: 5,
  recommend: 0,
  totalRatings: 0,
  base: 0,
  isError: false,
  characteristics: {},
};
