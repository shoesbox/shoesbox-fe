import * as React from 'react';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ModalDetail from '../components/ModalDetail';

const DetailPage = () => {
 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        해당날짜를 클릭할 것 입니당
      </Button>
      <Button>
        친구추가 버튼을 클릭할 것 입니당
      </Button>
      <ModalDetail
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      />
    </>
  );
};

export default DetailPage;
