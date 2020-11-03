/* @flow */

import React from 'react';

import './Loading.css';

const Loading = () => (
  <div className="album-page container p-5">
    <div className="d-flex justify-content-center">
      <div className="spinner spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </div>
);

export default Loading;
