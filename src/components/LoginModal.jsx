import { useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './css/loginmodal.css';
import { apis } from '../api/api';
import { setCookie } from '../shared/cookie';

const LoginModal = ({ login, handleCloseLogin }) => {
  const [state, setState] = useState({
    username: '',
    password1: '',
    password2: '',
  });

  const handleChangeState = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const [signup, setSignup] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await apis.loginUser(state, { withCredentials: true });
      const accessToken = response?.data.data.accesstoken;
      const refreshToken = response?.data.data.refreshToken;
      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);

    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if(state.password1 === state.password2) {
        const response = await apis.signup(state);
        console.log("회원가입 결과", response.data);
      }
    else{
      alert('비밀번호가 서로 일치하지 않습니다!');
    }
  }


  return (
    <>
      <Modal show={login} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>{!signup ? "로그인" : "회원가입"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>아이디</Form.Label>
              <Form.Control
                type="email"
                placeholder="아이디를 입력하세요"
                autoFocus
                required
                name="username"
                value={state.username}
                onChange={handleChangeState}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요"
                autoFocus
                required
                name="password1"
                aria-describedby="비밀번호는 8자 이상의 영어 소문자와 대문자, 숫자가 조합된 것이어야 합니다"
                title="비밀번호는 8자 이상의 영어 소문자와 대문자, 숫자가 조합된 것이어야 합니다"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                value={state.password1}
                onChange={handleChangeState}
              />
            </Form.Group>
            {!signup ? null : (
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>비밀번호 확인</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="비밀번호를 한번 더 입력하세요"
                  autoFocus
                  name="password2"
                  aria-describedby="비밀번호는 8자 이상의 영어 소문자와 대문자, 숫자가 조합된 것이어야 합니다"
                  title="비밀번호는 8자 이상의 영어 소문자와 대문자, 숫자가 조합된 것이어야 합니다"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                  value={state.password2}
                  onChange={handleChangeState}
                />
              </Form.Group>
            )}
            <br />
            <span>
              {!signup ? "아직 회원이 아니신가요?" : "계정이 이미 있으신가요?"}
            </span>
            <span className="change-login" onClick={() => setSignup(!signup)}>
              {!signup ? " 회원가입" : " 로그인"}
            </span>
            <br />
            <Button variant="secondary" onClick={handleCloseLogin}>
              Close
            </Button>
            {!signup ? (
              <Button type='submit' variant="primary" onClick={handleLogin}>
                Log In
              </Button>
            ) : (
              <Button type='submit' variant="primary" onClick={handleSignUp}>
                Sign Up
              </Button>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <br />
          <div className="social">
            <button className="social__button social__button--naver"></button>
            <button className="social__button social__button--kakao"></button>
            <button className="social__button social__button--google"></button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
