/* @flow */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


//TODO hook

type Props = {
  show: boolean,
  cancel: () => void,
  rating: number,
  ratingContent: string,
  confirm: () => void,
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