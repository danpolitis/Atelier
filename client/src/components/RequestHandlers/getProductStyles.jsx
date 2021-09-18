import axios from 'axios';

function getProductStyles(productId, callback) {
  axios.get(`/api/products/${productId}/styles`)
    .then((results) => {
      callback(results.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

export default getProductStyles;
