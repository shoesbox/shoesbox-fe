import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalAddFriend = (props) => {

  return (
    <Modal className="detail-modal" {...props} centered size="sm">
          <Modal.Header closeButton>
            <Modal.Title>
              <span>
                <strong>친구추가</strong>
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
  )
}

export default ModalAddFriend