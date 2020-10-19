/* @flow */

import React from 'react';

import './SectionHeader.css';

type SectionHeaderProps = {
    title: string,
    subtitle?: string | null,
    children?: Object | null,
};

const SectionHeader = ({ title, subtitle, children }: SectionHeaderProps) => (
    <div
        className={`section-header ${
            subtitle && children ? 'complete-header' : ''
        }`}>
        <div className="text-wrapper">
            <span className="section-title">{title}</span>
            {subtitle && <span className="section-subtitle">{subtitle}</span>}
        </div>
        {children && <div className="children-wrapper">{children}</div>}
    </div>
);

SectionHeader.defaultProps = {
    subtitle: null,
    children: null,
};

export default SectionHeader;
