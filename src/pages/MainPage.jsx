import './css/pages.css';
import { Card, Col, Row } from 'react-bootstrap';
import DiaryItem from '../components/DiaryItem';
import WriteFixedBtn from '../components/WriteFixedBtn';
import FriendsList from '../components/FriendsList';

const MainPage = () => {
  // const cookie = getCookie('accessToken');

  // useEffect(() => {
  //   showAll();
  //   if (cookie !== undefined) {
  //     return setIsLoggedIn(true);
  //   }
  // }, []);

  return (
    <>
      <div className="wrap">
        {/* <div className="calendar row row-cols-6 g-1">
          <DiaryItem />
          <DiaryItem />
          <DiaryItem />
          <DiaryItem />
          <DiaryItem />
          <DiaryItem />
          <DiaryItem />
          <DiaryItem />
        </div> */}
        <Row xs={2} sm={3} md={6} className="g-2 calendar">
          {Array.from({ length: 28 }).map((_, idx) => (
            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://i.pinimg.com/474x/51/1b/1c/511b1cbbc78f45680ff80f34bd162b93.jpg"
                  style={{ borderRadius: '5px' }}
                />
              </Card>
            </Col>
          ))}
        </Row>
        {/* <div className="friends">
          <button>친구1</button>
          <button>친구2</button>
          <button>친구3</button>
          <button>친구4</button>
          <button>+</button>
        </div> */}
        <FriendsList />
      </div>

      <WriteFixedBtn />
    </>
  );
};

export default MainPage;
