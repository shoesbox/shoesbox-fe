import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
// import { getCookie, deleteCookie } from '../shared/Cookie';

function Header() {
  const [login, setLogin] = useState(false);
  const handleCloseLogin = () => setLogin(false);
  const handleShowLogin = () => setLogin(true);

  const navigate = useNavigate();

  // const cookie = getCookie('accessToken');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   console.log(cookie);
  //   if (cookie !== undefined) {
  //     return setIsLoggedIn(true);
  //   } else {
  //     return setIsLoggedIn(false);
  //   }
  // }, []);

  const handleLogout = () => {};

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: '#efd3d7', fontWeight: '600' }}
        // variant='dark'
      >
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate('/');
            }}
          >
            SHOES 🍭 BOX
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  navigate('/');
                }}
              >
                My Memory
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate('/hiphop');
                }}
              >
                Friends
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
                  >
                    My Page
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                </>
              ) : (
                <>
                  {/* 비로그인시 */}
                  <Nav.Link onClick={handleShowLogin}>Log In</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Login login={login} handleCloseLogin={handleCloseLogin} />
    </>
  );
}

export default Header;
