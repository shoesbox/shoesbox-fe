import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './css/writefixedbtn.css';
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
          navigate('/posts/write');
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
