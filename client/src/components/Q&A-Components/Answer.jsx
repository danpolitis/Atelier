import React, { useState } from 'react';
import axios from 'axios';

const Answer = ({ answer }) => (
  <div className="a-entry">
    <span>
      {`A: ${answer.body}`}
    </span>
  </div>
);

export default Answer;
