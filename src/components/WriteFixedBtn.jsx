import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import classes from './WriteFixedBtn.module.css';
// import { getCookie } from '../shared/Cookie';

const WriteFixedBtn = () => {
  // const cookie = getCookie('accessToken');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   if (cookie !== undefined) {
  //     return setIsLoggedIn(true);
  //   }
  // }, []);

  const navigate = useNavigate();
  return (
    <div>
      <Button
        className={classes.writeBtn}
        onClick={() => {
          isLoggedIn
            ? navigate('/postwrite')
            : alert('로그인 사용자만 접근이 가능합니다');
        }}
      >
        <span className="material-icons">일기쓰기</span>
      </Button>
    </div>
  );
};

export default WriteFixedBtn;
