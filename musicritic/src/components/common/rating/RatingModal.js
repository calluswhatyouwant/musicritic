import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const RatingModal = ({show, toggle, rating, ratingContent, confirm}) => {

  return (
    <div>
      <Modal isOpen={show} toggle={toggle}>
        <ModalHeader toggle={toggle}>Wait!</ModalHeader>
        <ModalBody>
         Are you sure you want to rate {rating} to {ratingContent}?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={confirm}>Yes, I am</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default RatingModal;