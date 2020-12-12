/* @flow */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


type Props = {
  show: boolean,
  cancel: () => void,
  rating: number,
  ratingContent: string,
  confirm: () => void,
}

export const useRatingModal = (id: any, chosenRating: number, userRating: number, setChosenRating: any, postFunction: (id, chosenRating) => void) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const showConfirmationModal = (newRating: number) => {
    toggle();
    setChosenRating(newRating);
  }

  const postRating = () => {
    if (chosenRating !== userRating) postFunction(id, chosenRating)
    toggle();
  };

  const cancelRating = () => {
    if (chosenRating !== userRating) setChosenRating(userRating);
    toggle();
  }
  return [isOpen, showConfirmationModal, postRating, cancelRating];
}
  
const RatingModal = ({show, cancel, rating, ratingContent, confirm}: Props) => (
    <div>
      <Modal isOpen={show} toggle={cancel}>
        <ModalHeader toggle={cancel}>Wait!</ModalHeader>
        <ModalBody>
          Are you sure you want to rate {rating} to {ratingContent}?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={confirm}>Yes, I am</Button>{' '}
          <Button color="secondary" onClick={cancel}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
);

export default RatingModal;