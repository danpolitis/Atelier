import axios from 'axios';

function postInteractions(postData) {
  axios.post('/api/interactions', postData)
    .catch((err) => {
      console.error(err);
    });
}

export default postInteractions;
