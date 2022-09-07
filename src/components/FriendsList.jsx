import './css/friendslist.css';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsPlusLg } from 'react-icons/bs';
import ModalAddFriend from '../components/ModalAddFriend';

const FriendsList = () => {
  const [show, setShow] = useState(false);
  const handleClose2 = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="friends">
      <Button>선하</Button>
      <Button>찬호</Button>
      <Button>동규</Button>
      <Button>인영</Button>
      <Button>명백</Button>
      <Button onClick={handleShow}>
        <BsPlusLg />
      </Button>
      <ModalAddFriend
        show={show}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      />
    </div>
  );
};

export default FriendsList;
