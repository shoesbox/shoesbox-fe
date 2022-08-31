import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './css/friendslist.css';
import { BsPlusLg } from 'react-icons/bs';
// import { getCookie } from '../shared/Cookie';

const FriendsList = () => {
  // const cookie = getCookie('accessToken');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   if (cookie !== undefined) {
  //     return setIsLoggedIn(true);
  //   }
  // }, []);

  return (
    <div className="friends">
      <Button>선하</Button>
      <Button>찬호</Button>
      <Button>동규</Button>
      <Button>인영</Button>
      <Button>명백</Button>
      <Button>
        <BsPlusLg />
      </Button>
    </div>
  );
};

export default FriendsList;
