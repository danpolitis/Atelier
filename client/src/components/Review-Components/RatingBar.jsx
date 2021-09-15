import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const RatingBar = ({ total, ratings }) => (
  <div id="progress-bar" className="row">
    <div>
      <p className="progress-label"><u>5 Stars</u></p>
      <ProgressBar style={{ width: '57%', height: '7px' }} now={(Number(ratings[5]) / total) * 100} />
    </div>
    <div>
      <p className="progress-label"><u>4 Stars</u></p>
      <ProgressBar style={{ width: '57%', height: '7px' }} now={(Number(ratings[4]) / total) * 100} />
    </div>
    <div>
      <p className="progress-label"><u>3 Stars</u></p>
      <ProgressBar style={{ width: '57%', height: '7px' }} now={(Number(ratings[3]) / total) * 100} />
    </div>
    <div>
      <p className="progress-label"><u>2 Stars</u></p>
      <ProgressBar style={{ width: '57%', height: '7px' }} now={(Number(ratings[2]) / total) * 100} />
    </div>
    <div>
      <p className="progress-label"><u>1 Stars</u></p>
      <ProgressBar style={{ width: '57%', height: '7px' }} now={(Number(ratings[1]) / total) * 100} />
    </div>
  </div>
);

export default RatingBar;
