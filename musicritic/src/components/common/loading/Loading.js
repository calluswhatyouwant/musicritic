/* @flow */

import React from 'react';

import './Loading.css';

const Loading = () => (
    <div className="p-5">
        <div className="d-flex justify-content-center">
            <div className="rotate" role="status">
                <i className="fas fa-compact-disc" />
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </div>
);

export default Loading;
