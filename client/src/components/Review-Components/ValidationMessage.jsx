import React, { useState } from 'react';

const ValidationMessage = (props) => {
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
      )
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
      <ul className="validate-message-list">
        {messageCheck(props.state.selectedRating)}
        {characteristicsCheck(props.state.fit, props.state.size,
          props.state.length, props.state.width, props.state.quality, props.state.comfort)}
        {reviewBodyCheck(props.state.bodyText)}
        {userCheck(props.state.addUsername)}
        {emailCheck(props.state.addEmail)}
      </ul>
    </>
  );
};

export default ValidationMessage;
