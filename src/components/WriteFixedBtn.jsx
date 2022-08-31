import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './css/WriteFixedBtn.css';
import { BsBrush } from 'react-icons/bs';
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
        className="writeBtn"
        onClick={() => {
          isLoggedIn
            ? navigate('/postwrite')
            : alert('로그인 사용자만 접근이 가능합니다');
        }}
      >
        <h4>
          <BsBrush />
        </h4>
      </Button>
    </div>
  );
};

export default WriteFixedBtn;
