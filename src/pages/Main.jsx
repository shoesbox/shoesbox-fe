import styled from 'styled-components';
import DiaryItem from '../components/DiaryItem';
import { useEffect, useState } from 'react';

const Main = () => {
  const [posts, setPosts] = useState([]);
  // const [post, setPost] = useState({});
  const [postId, setPostId] = useState('');

  // const cookie = getCookie('accessToken');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   if (cookie !== undefined) {
  //     return setIsLoggedIn(true);
  //   }
  // }, []);

  // const showAll = () => {
  //   apis.post_all().then((res) => {
  //     console.log('All Posts',res?.data.data)
  //     setPosts(res?.data.data);
  //   });
  // };

  useEffect(() => {
    // showAll();
  }, []);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleModal = (postId) => {
    // console.log('Viewmodal핸들', postId);
    handleShow();
    setPostId(postId);
  };
  return (
    <Layout>
      <StImgCal className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-5 g-1">
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
      </StImgCal>
      <StFriendsSection>
        <StFriendButton>친구1</StFriendButton>
        <StFriendButton>친구2</StFriendButton>
        <StFriendButton>친구3</StFriendButton>
        <StFriendButton>친구4</StFriendButton>
        <StFriendButton>+</StFriendButton>
      </StFriendsSection>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  margin: 3%;
  border: 1px solid red;
`;

const StImgCal = styled.div`
  border: 3px solid pink;
  width: 80%;
  height: 80vh;
  margin: 0 auto;
`;

const StFriendsSection = styled.div`
  border: 1px solid green;
  width: 100px;
  height: 80vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StFriendButton = styled.button`
  border: none;
  border-radius: 100%;
  width: 80px;
  height: 80px;
`;

export default Main;
