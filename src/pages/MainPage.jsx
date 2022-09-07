import './css/mainpage.css';
import { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Calendar from '../components/Calendar';
import WriteFixedBtn from '../components/WriteFixedBtn';
import FriendsList from '../components/FriendsList';
import { Calender2 } from '../components/Calendar2';
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
          {/* <div className="wrap">
            <Row xs={2} sm={3} md={6} className="g-2 calendar">
              {Array.from({ length: 28 }).map((_, idx) => (
                <Col>
                  <Card>
                    <Card.Img
                      key={idx}
                      variant="top"
                      className="img-card"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5LHQDLTKqbrymeP5odTzF3X1yLbj0WQI9mg&usqp=CAU"
                      onClick={() => {
                        navigate('/detail');
                      }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div> */}

          <div className="wrap">
            <Calendar />
          </div>

          {/* <div className="wrap">
            <Calender2 />
          </div> */}
          <FriendsList />
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
