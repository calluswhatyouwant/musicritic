/* @flow */

import React, { Component } from 'react';

type Props = {
    value: number,
};

type State = {
    value: number,
};

class Rating extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: this.props.value,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (newValue: number) => {
        console.log(newValue);
        this.setState({ ...this.state, value: newValue });
    };

    render() {
        const { value } = this.state;
        const stars = [];

        for (let i = 0; i < 5; i += 1) {
            if (value >= i + 1) {
                stars.push(<SolidStar
                  handleClick={() => this.handleClick(i + 1)}
                />);
            } else if (value >= i + 0.5) {
                stars.push(<StarHalf
                  handleClick={() => this.handleClick(i + 1)}
                />);
            } else {
                stars.push(<RegularStar
                  handleClick={() => this.handleClick(i + 1)}
                />);
            }
        }

        return <div>{ stars }</div>;
    }
}

type IconProps = {
    handleClick: (number) => void,
};

const clickableProps = (handleClick: any) => ({
    onClick: handleClick,
    tabIndex: 0,
    onKeyPress: () => {},
    role: 'button',
});

const SolidStar = ({ handleClick }: IconProps) => (
    <i className="fas fa-star" {...clickableProps(handleClick)} />
);

const RegularStar = ({ handleClick }: IconProps) => (
    <i className="far fa-star" {...clickableProps(handleClick)} />
);

const StarHalf = ({ handleClick }: IconProps) => (
    <i className="fas fa-star-half-alt" {...clickableProps(handleClick)} />
);

export default Rating;
