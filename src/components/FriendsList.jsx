import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './css/FriendsList.css';
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
      <Button>친구1</Button>
      <Button>친구2</Button>
      <Button>친구3</Button>
      <Button>친구4</Button>
      <Button>
        <BsPlusLg />
      </Button>
    </div>
  );
};

export default FriendsList;
