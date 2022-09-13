import './css/modallogin.css';
import './css/header.css';
import { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModalLogin from './ModalLogin';
import { getCookie, deleteCookie } from '../shared/cookie';
import { apis } from '../api';

function Header() {
  const [login, setLogin] = useState(false);
  const handleShowLogin = () => setLogin(true);
  const handleCloseLogin = () => setLogin(false);

  const navigate = useNavigate();

  const nickname = getCookie('nickname');
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    if (nickname !== undefined) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, [nickname]);

  const handleLogout = () => {
    apis
      .logoutUser()
      .then((res) => {
        console.log(res);
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        deleteCookie('memberId');
        deleteCookie('nickname');
        deleteCookie('email');
        // alert('로그아웃 성공');
        window.location.replace('/');
      })
      .catch((err) => {
        console.log(err.response.data.message);
        const errMessage = err.response.data.message;
        alert(errMessage);
      });
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{
          backgroundColor: '#cce3de',
          fontWeight: '600',
        }}
        // variant='dark'
      >
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate('/');
            }}
            className="brand-logo"
          >
            SHOES 🍭 BOX
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {isLoggedIn ? (
                <Nav.Link
                  onClick={() => {
                    navigate('/');
                  }}
                  className="menu"
                >
                  My Moments
                </Nav.Link>
              ) : null}
              <Nav.Link
                onClick={() => {
                  navigate('/aboutus');
                }}
                className="menu"
              >
                About us
              </Nav.Link>
            </Nav>
            <Nav>
              {isLoggedIn ? (
                <>
                  {/* 로그인시 */}
                  <Nav.Link
                    onClick={() => {
                      navigate('/mypage');
                    }}
                    className="menu"
                  >
                    My Page
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout} className="menu">
                    Log Out
                  </Nav.Link>
                </>
              ) : (
                <>
                  {/* 비로그인시 */}
                  <Nav.Link onClick={handleShowLogin} className="menu">
                    Log In
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ModalLogin login={login} handleCloseLogin={handleCloseLogin} />
    </>
  );
}

export default Header;
