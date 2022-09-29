import './css/modaldetail.css';
import { useEffect } from 'react';
import { Button, Carousel, Modal, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDetailThunk,
  deleteDetailThunk,
  switchLoading,
  switchLoadPost,
} from '../features/detailSlice';
import { getCookie } from '../shared/cookie';
import CommentsList from './CommentsList';

const ModalDetail = ({ postId, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memberId = getCookie('memberId');
  const post = useSelector((state) => state.detail.post);
  const loading = useSelector((state) => state.detail.loading);
  const postStatus = useSelector((state) => state.detail.postStatus);

  const nickname = post?.nickname;
  const title = post?.title;
  const images = post?.images;
  const content = post?.content;
  const writeMemberId = post?.memberId;

  const editPost = (post) => {
    // console.log(post);
    navigate('/edit');
  };

  const delPost = () => {
    const result = window.confirm('정말로 일기를 삭제하시겠어요?');
    if (result === true) {
      dispatch(deleteDetailThunk(postId));

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (postId !== (null || undefined)) {
      dispatch(getDetailThunk(postId));
      dispatch(switchLoading(true));
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

  return (
    <>
      {postStatus && (
        <Modal
          {...props}
          className="detail-modal"
          centered
          size="md"
          fullscreen="sm-down"
          keyboard
        >
          {loading ? (
            <div className="detail-img-spinner">
              <Spinner animation="grow" variant="info" />
            </div>
          ) : (
            <>
              <Modal.Header closeButton>
                <Modal.Title>
                  <div>{title}</div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="detail-titlebox">{nickname}</div>
                <hr />

                {images?.length >= 2 ? <ImageCarousel /> : null}
                {images?.length === 1 ? <img src={images} alt="" /> : null}
                {images?.length >= 1 && <hr />}

                <div className="detail-content">{content}</div>

                {parseInt(memberId) === parseInt(writeMemberId) && (
                  <>
                    <br />
                    <div className="detail-fix-del-btns">
                      <Button onClick={() => editPost(post)}>수정</Button>
                      <Button onClick={() => delPost()}>삭제</Button>
                    </div>
                  </>
                )}
                <hr />
                <CommentsList postId={postId} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                  Close
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default ModalDetail;
