import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ModalAddFriend from '../components/ModalAddFriend';
import ModalDetail from '../components/ModalDetail';

const DetailPage = () => {
  const [tmpPostId, setPostId] = useState();
  const [show, setShow] = useState(false);
  const handleShow = () => 
  {
    var res = prompt("조회할 게시물 번호 입력"+"")
    setPostId(res);
    setShow(true)
  };
  const handleClose = () => setShow(false);


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        해당날짜를 클릭할 것 입니당
      </Button>
      <ModalDetail
        show={show}
        onHide={handleClose}
        postId={tmpPostId}
        backdrop="static"
        keyboard={false}
      />
    </>
  );
};

export default DetailPage;
