import React from 'react';
import axios from 'axios';

export const getReviewRequests = {
  getMetaData: (id, callback) => {
    axios.get(`/api/reviews/meta?product_id=${id}`)
      .then(({ data }) => {
        callback(data);
      })
      .catch((err) => {
        callback(err);
      });
  },

  getAllReviews: (id, count, selected, callback) => {
    axios.get(`/api/reviews?product_id=${id}&count=${count}&sort=${selected}`)
      .then(({ data }) => {
        callback(null, data);
      })
      .catch((err) => {
        callback(err);
      });
  },

  helpfulRequest: (productId, reviewId, count, selected, callback) => {
    axios.put(`/api/reviews/${reviewId}/helpful`)
      .then(() => {
        axios.get(`/api/reviews?product_id=${productId}&count=${count}&sort=${selected}`)
          .then(({ data }) => {
            callback(null, data);
          })
          .catch((err) => {
            callback(err);
          });
      });
  },

  reportRequest: (productId, reviewId, count, selected, callback) => {
    axios.put(`/api/reviews/${reviewId}/report`)
      .then(() => {
        axios.put(`/api/reviews/${reviewId}/helpful`)
          .then(() => {
            axios.get(`/api/reviews?product_id=${productId}&count=${count}&sort=${selected}`)
              .then(({ data }) => {
                callback(null, data);
              })
              .catch((err) => {
                callback(err);
              });
          });
      });
  },
};

const ReviewContext = React.createContext();

export default ReviewContext;
