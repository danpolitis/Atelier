import axios from 'axios';

export const getReviewInfo = {
  getMetaData: (id, callback) => {
    axios.get(`/api/reviews/meta?product_id=${id}`)
      .then(({ data }) => {
        callback(data);
      })
      .catch((err) => {
        callback(err);
      });
  },

  helpfulRequest: (reviewId, callback) => {
    axios.put(`/api/reviews/${reviewId}/helpful`)
      .then(() => {
        console.log('Helpful Review added!');
      })
      .catch(err => {
        console.log(err);
        callback(err);
      });
  },

  reportRequest: (reviewId, callback) => {
    axios.put(`/api/reviews/${reviewId}/report`)
      .then(() => {
        console.log('Review Reported');
      })
      .catch((err) => {
        console.log(err);
        callback(err);
      });
  },
};

export const getAverageRating = (id, callback) => {
  axios.get(`/api/reviews/meta?product_id=${id}`)
    .then(({ data }) => {
      const average = Object.values(data.ratings)
        .reduce((r, a, i) => (Number(r) + Number(a)
        * Number(Object.keys(data.ratings)[i])))
        / Object.values(data.ratings)
          .reduce((prev, curr) => Number(prev) + Number(curr)) || 0;
      callback(average);
    })
    .catch((err) => {
      callback(err);
    });
};

export const getAllReviews = (id, selected, callback) => {
  axios.get(`/api/reviews?product_id=${id}&count=100&sort=${selected}`)
    .then(({ data }) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err);
    });
};
