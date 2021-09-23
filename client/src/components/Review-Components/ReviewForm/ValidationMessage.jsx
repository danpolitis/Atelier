import React from 'react';

const ValidationMessage = ({ state }) => {
  const {
    selectedRating, fit, size, length, width, quality, comfort, bodyText, addUsername, addEmail,
  } = state;
  const messageCheck = (overallState) => {
    if (overallState === 0) {
      return (
        <li><small><em>* Overall Rating</em></small></li>
      );
    }
  };
  const characteristicsCheck = (fitState, sizeState, lengthState,
    widthState, qualityState, comfortState) => {
    if (fitState === 0 && sizeState === 0) {
      return (
        <li><small><em>* Please fill out all characteristics</em></small></li>
      );
    }
    if (lengthState === 0 && widthState === 0) {
      return (
        <li><small><em>* Please fill out all characteristics</em></small></li>
      );
    }
    if (qualityState === 0 || comfortState === 0) {
      return (
        <li><small><em>* Please fill out all characteristics</em></small></li>
      );
    }
  };
  const reviewBodyCheck = (bodyState) => {
    if (bodyState.length < 50) {
      return (
        <li><small><em>* Review Body must be over 50 characters</em></small></li>
      );
    }
    if (bodyState === '') {
      return (
        <li><small><em>* Review Body</em></small></li>
      );
    }
  };

  const userCheck = (userState) => {
    if (userState === '') {
      return (
        <li><small><em>* Nickname</em></small></li>
      );
    }
  };

  const emailCheck = (emailState) => {
    if (emailState === '') {
      return (
        <li><small><em>* E-mail</em></small></li>
      );
    }
  };

  return (
    <>
      <ul className="validate-message-list" style={{ listStyle: 'none', color: 'red' }}>
        {messageCheck(selectedRating)}
        {characteristicsCheck(fit, size,
          length, width, quality, comfort)}
        {reviewBodyCheck(bodyText)}
        {userCheck(addUsername)}
        {emailCheck(addEmail)}
      </ul>
    </>
  );
};

export default ValidationMessage;
