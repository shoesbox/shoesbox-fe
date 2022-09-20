import '../pages/css/detailpage.css';
import { useRef, useState, useEffect } from 'react';
import { Button, Carousel, Container, Modal } from 'react-bootstrap';
import { BsFillTelephoneForwardFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDetailThunk,
  getJsonCommentThunk,
  getJsonDetailThunk,
  getCommentThunk,
  deleteDetailThunk,
} from '../features/detailSlice';
import { getCookie } from '../shared/cookie';
import CommentsList from './CommentsList';
// potal test
import ReactDOM from 'react-dom';

const ModalDetail = ({ postId, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memberId = getCookie('memberId');
  const post = useSelector((state) => state.detail.post);

  const nickname = post?.nickname;
  const title = post?.title;
  const date = post?.date;
  const images = post?.images;
  const content = post?.content;
  const writeMemberId = post?.memberId;

  const reWritePost = (post) => {
    //  console.log(post);
    navigate('/edit');
  };

  const delPost = () => {
    alert('정말로 일기를 삭제하시겠습니까?');
    dispatch(deleteDetailThunk(postId));
    window.location.reload();
  };

  useEffect(() => {
    if (postId !== (null || undefined)) {
      // dispatch(getJsonDetailThunk(postId));
      dispatch(getDetailThunk(postId));
      // console.log('result', result);
    }
  }, [postId]);

  const ImageCarousel = () => {
    return (
      <Carousel>
        {images?.map((image, idx) => (
          <Carousel.Item key={idx}>
            <img className="d-block w-100" src={image} alt={idx} />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };

  return ReactDOM.createPortal(
    <>
      <Modal
        {...props}
        className="detail-modal"
        centered
        size="md"
        fullscreen="sm-down"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div>{title}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="detail-titlebox">
            <span>
              <strong>{nickname}</strong>
              <Button>
                <BsFillTelephoneForwardFill />
              </Button>
            </span>
            <span>{date}</span>
          </div>
          <hr />
          <ImageCarousel />
          <hr />
          <div className="detail-content">{content}</div>
          {/* <hr /> */}
          <br />
          {parseInt(memberId) === parseInt(writeMemberId) && (
            <div className="detail-fix-del-btns">
              <Button onClick={() => reWritePost(post)}>수정</Button>
              <Button onClick={() => delPost()}>삭제</Button>
            </div>
          )}
          <hr />
          <CommentsList postId={postId} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>,
    document.getElementById('potal')
  );
  // return <div>모달</div>
};

export default ModalDetail;
