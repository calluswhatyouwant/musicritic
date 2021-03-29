/* @flow */

import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

type Props = {
    show: boolean,
    cancel: () => void,
    rating: number,
    ratingContent: string,
    confirm: () => void,
};

export const useRatingModal = (
    id: any,
    chosenRating: number,
    userRating: number,
    setChosenRating: (userRating: number) => void,
    postFunction: (id: any, chosenRating: number) => void
) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const showConfirmationModal = (newRating: number) => {
        toggle();
        setChosenRating(newRating);
    };

    const postRating = () => {
        if (chosenRating !== userRating) postFunction(id, chosenRating);
        toggle();
    };

    const cancelRating = () => {
        if (chosenRating !== userRating) setChosenRating(userRating);
        toggle();
    };
    return [isOpen, showConfirmationModal, postRating, cancelRating];
};

const RatingModal = ({
    show,
    cancel,
    rating,
    ratingContent,
    confirm,
}: Props) => (
    <div>
        <Modal isOpen={show} toggle={cancel}>
            <ModalHeader toggle={cancel}>
                <FormattedMessage id="rating-modal-title" />
            </ModalHeader>
            <ModalBody>
                <FormattedMessage
                    id="rating-modal-prompt"
                    values={{
                        rating: <b>{rating}</b>,
                        ratingContent: <b>{ratingContent}</b>,
                    }}
                />
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={cancel}>
                    <FormattedMessage id="cancel" />
                </Button>
                <Button color="primary" onClick={confirm}>
                    <FormattedMessage id="confirm" />
                </Button>
            </ModalFooter>
        </Modal>
    </div>
);

export default RatingModal;
