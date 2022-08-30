import { useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './Login.css';
// import apis from '../api/index';
// import { setCookie } from '../shared/Cookie';

const Login = ({ login, handleCloseLogin }) => {
  const [signup, setSignup] = useState(false);

  const handleLogin = async (event) => {
    // event.preventDefault();
    // const res = await apis.loginUser(state, { withCredentials: true });
    // try {
    //   const token = res.data.data.token;
    //   setCookie('accessToken', token.accessToken, token.accessTokenExpiresIn);
    //   setCookie('refreshToken', token.refreshToken, token.accessTokenExpiresIn);
    //   setCookie('userId', res.data.data.id, token.accessTokenExpiresIn);
    //   setCookie('username', res.data.data.username, token.accessTokenExpiresIn);
    //   alert('로그인 성공');
    //   window.location.reload(true);
    // } catch (error) {
    //   alert(res.data.errorCode.message);
    //   console.log(error);
    // }
  };

  return (
    <>
      <Modal show={login} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>{!signup ? '로그인' : '회원가입'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />
          <div className="social">
            <button>네이버</button>
            <button>카카오톡</button>
            <button>구글</button>
          </div>
          <br />
          <span>
            {!signup ? '아직 회원이 아니신가요?' : '계정이 이미 있으신가요?'}
          </span>
          <span
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#8e9aaf',
            }}
            onClick={() => setSignup(!signup)}
          >
            {!signup ? ' 회원가입' : ' 로그인'}
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Close
          </Button>
          {!signup ? (
            <Button variant="primary" onClick={handleLogin}>
              Log In
            </Button>
          ) : (
            <Button variant="primary" onClick={handleLogin}>
              Sign Up
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
