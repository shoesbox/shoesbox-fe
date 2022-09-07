import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ModalAddFriend from '../components/ModalAddFriend';
import ModalDetail from '../components/ModalDetail';

const DetailPage = () => {
  // const [postId, setPostId] = useState('');
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const tempPostId = 5;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        해당날짜를 클릭할 것 입니당
      </Button>
      <ModalDetail
        show={show}
        onHide={handleClose}
        postId={tempPostId}
        backdrop="static"
        keyboard={false}
      />
    </>
  );
};

export default DetailPage;
