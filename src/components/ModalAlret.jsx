import './css/modaladdfriend.css';
import { Button, Form, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { apis } from '../api';

const ModalAlert = (props) => {


  return (
    <Modal {...props} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>
          <div>알림 🍧</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAlert;
