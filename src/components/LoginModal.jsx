import { useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './css/loginmodal.css';
import { apis } from '../api/api';
import { setCookie } from '../shared/cookie';

const LoginModal = ({ login, handleCloseLogin }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    password1: '',
  });

  const handleChangeState = (event) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const [signup, setSignup] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    // const res = await apis.loginUser(state, { withCredentials: true });
    // console.log('res', res);
    // console.log('res.data', res.data);
    // try {
    //   const token = res.data.data;
    //   setCookie('accessToken', token.accessToken, token.accessTokenExpiresIn);
    //   setCookie('refreshToken', token.refreshToken, token.accessTokenExpiresIn);
    //   setCookie('username', token.username);
    //   alert('로그인 성공');
    //   window.location.reload(true);
    // } catch (err) {
    //   console.log(err);
    // }

    apis
      .loginUser(state, { withCredentials: true })
      .then((res) => {
        // console.log('res', res);
        // console.log('res.data', res.data);
        const token = res.data.data;
        setCookie('accessToken', token.accessToken, token.accessTokenExpiresIn);
        setCookie(
          'refreshToken',
          token.refreshToken,
          token.accessTokenExpiresIn
        );
        setCookie('username', token.username);
        alert('로그인 성공');
        window.location.reload(true);
      })
      .catch((err) => {
        // console.log(err.response.data.errorDetails.apierror.message);
        const errMessage = err.response.data.errorDetails.apierror.message;
        alert(errMessage);
      });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (state.password === state.password1) {
      apis
        .joinUser(state, { withCredentials: true })
        .then((res) => {
          alert('회원가입이 완료되었습니다.');
          window.location.reload(true);
        })
        .catch((err) => {
          // console.log(err.response.data.errorDetails.apierror.message);
          const errMessage = err.response.data.errorDetails.apierror.message;
          alert(errMessage);
          setState({ email: '', password: '', password1: '' });
        });
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <Modal show={login} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>{!signup ? '로그인' : '회원가입'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>아이디</Form.Label>
              <Form.Control
                type="text"
                placeholder="example@google.com"
                autoFocus
                required
                name="email"
                value={state.email}
                onChange={handleChangeState}
              />
              <div className="description">
                영어 소문자로 시작하며 숫자 혼용으로 8자 이상
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요"
                autoFocus
                required
                name="password"
                // aria-describedby="비밀번호는 8자 이상의 영어 소문자와 대문자, 숫자가 조합된 것이어야 합니다"
                // title="비밀번호는 8자 이상의 영어 소문자와 대문자, 숫자가 조합된 것이어야 합니다"
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                value={state.password}
                onChange={handleChangeState}
              />
              <div className="description">
                영어 대소문자 및 숫자 어쩌구 조건식
              </div>
            </Form.Group>
            {!signup ? null : (
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>비밀번호 확인</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="비밀번호를 한번 더 입력하세요"
                  autoFocus
                  name="password1"
                  // aria-describedby="비밀번호는 8자 이상의 영어 소문자와 대문자, 숫자가 조합된 것이어야 합니다"
                  // title="비밀번호는 8자 이상의 영어 소문자와 대문자, 숫자가 조합된 것이어야 합니다"
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                  value={state.password1}
                  onChange={handleChangeState}
                />
              </Form.Group>
            )}
            <br />
            <div className="social">
              <button className="social__button social__button--naver"></button>
              <button className="social__button social__button--kakao"></button>
              <button className="social__button social__button--google"></button>
            </div>
            <br />
            <span>
              {!signup ? '아직 회원이 아니신가요?' : '계정이 이미 있으신가요?'}
            </span>
            <span className="change-login" onClick={() => setSignup(!signup)}>
              {!signup ? ' 회원가입' : ' 로그인'}
            </span>
            <br />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Close
          </Button>
          {!signup ? (
            <Button type="submit" variant="primary" onClick={handleLogin}>
              Log In
            </Button>
          ) : (
            <Button type="submit" variant="primary" onClick={handleSignup}>
              Sign Up
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default LoginModal;
