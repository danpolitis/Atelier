import axios from 'axios';

function getProductInfo(productId, callback) {
  axios.get(`/api/products/${productId}`)
    .then((results) => {
      callback(results.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

export default getProductInfo;
