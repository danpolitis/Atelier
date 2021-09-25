const allInOrder = (arr) => {
  arr.forEach((question) => {
    const sellersArr = [];
    const restArr = [];
    const obj = question.answers;
    Object.keys(obj).forEach((key) => {
      if (obj[key].answerer_name === 'Seller') {
        sellersArr.push(obj[key]);
      } else {
        restArr.push(obj[key]);
      }
    });
    const sortRest = restArr.sort(
      (a, b) => b.helpfulness - a.helpfulness,
    );
    question.answers = sellersArr.concat(sortRest);
  });
  return arr;
};
export default allInOrder;
