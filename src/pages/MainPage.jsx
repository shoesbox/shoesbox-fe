import './css/mainpage.css';
import { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Calendar from '../components/Calendar';
import { Calender2 } from '../components/Calendar2';
import WriteFixedBtn from '../components/WriteFixedBtn';
import FriendsList from '../components/FriendsList';
// import { getCookie } from '../shared/cookie';
import Cookies from 'universal-cookie';

const MainPage = () => {
  // const cookie = getCookie('accessToken');
  const cookies = new Cookies();
  const cookie = cookies.get('accessToken');

  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    if (cookie !== undefined) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, [cookie]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="wrap">
            <Calendar />
          </div>

          {/* <div className="wrap2">
            <Calender2 />
          </div> */}

          <FriendsList />
          {/* {오늘일기있으면 ? null : <WriteFixedBtn />} */}
          <WriteFixedBtn />
        </>
      ) : (
        <div className="welcome">
          <p>You can use it after Log in ✨</p>
        </div>
      )}
    </>
  );
};

export default MainPage;
