import './css/MainPage.css';
import { Card, Col, Row } from 'react-bootstrap';
import DiaryItem from '../components/DiaryItem';
import WriteFixedBtn from '../components/WriteFixedBtn';
import FriendsList from '../components/FriendsList';
import { Navigate, useNavigate } from 'react-router-dom';

const MainPage = () => {
  // const cookie = getCookie('accessToken');

  // useEffect(() => {
  //   showAll();
  //   if (cookie !== undefined) {
  //     return setIsLoggedIn(true);
  //   }
  // }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="wrap">
        <Row xs={2} sm={3} md={6} className="g-2 calendar">
          {Array.from({ length: 28 }).map((_, idx) => (
            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  className="img-card"
                  // src="https://i.pinimg.com/474x/51/1b/1c/511b1cbbc78f45680ff80f34bd162b93.jpg"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5LHQDLTKqbrymeP5odTzF3X1yLbj0WQI9mg&usqp=CAU"
                  onClick={() => {
                    navigate('/detail');
                  }}
                />
              </Card>
            </Col>
          ))}
        </Row>
        <FriendsList />
      </div>
      <WriteFixedBtn />
    </>
  );
};

export default MainPage;
