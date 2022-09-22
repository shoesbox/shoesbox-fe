import './css/modalalert.css';
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
      <Modal.Body className="alert-list">
        <div>
          <span>어쩌구</span>님이 새로운 일기를 등록했어요!
        </div>
        <div>
          <span>어쩌구</span>님이 일기에 댓글을 등록했어요!
        </div>
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
