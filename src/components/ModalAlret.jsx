import './css/modalalert.css';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useState, useEffect, memo } from 'react';
import { apis } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { BsCheckAll } from 'react-icons/bs';
import ModalDetail from './ModalDetail';
import {
  deleteAlarm,
  deleteAllAlarms,
  switchLoadingAlarm,
} from '../features/loginSlice';
import ModalAddFriend from './ModalAddFriend';

const ModalAlert = (props) => {
  // const ModalAlert = ({alarmList,...props}) => {
  //  const [alarmList, setAlarmList] = useState();
  const dispatch = useDispatch();
  const alarmList = useSelector((state) => state.login.alarmList);
  const loading = useSelector((state) => state.login.loading);

  // 게시글 상세보기 모달 관련
  const [isopen, setIsOpen] = useState(false);
  const [postId, setPostId] = useState();

  // 친구추가 모달
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const deleteOneAlarm = async (alarmId) => {
    try {
      const { data } = await apis.deleteAlarm(alarmId);
      // console.log(data.data);
      if (data.data) {
        dispatch(deleteAlarm(alarmId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAll = async () => {
    try {
      const { data } = await apis.deleteAlarmAll();
      // console.log(data);
      if (data.data) {
        dispatch(deleteAllAlarms());
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // console.log(alarmList);
    dispatch(switchLoadingAlarm(false));
  }, [alarmList]);

  const AlarmList = ({ alarmList }) => {
    return alarmList?.map((alarm, idx) => (
      <div className="alert-list" key={idx}>
        <span
          onClick={() => {
            if (alarm.postId !== 0) {
              setIsOpen(true);
              setPostId(alarm.postId);
            } else {
              handleShow()
            }
            deleteOneAlarm(alarm.alarmId);
          }}
        >
          {alarm.text}
        </span>
      </div>
    ));
  };

  return (
    <>
      <Modal {...props} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="alert-top">
              <span>알림 🧁</span>
              {alarmList.length > 0 && (
                <Button className="alert-all-del" onClick={() => deleteAll()}>
                  <span>전체 삭제</span>
                  <BsCheckAll />
                </Button>
              )}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="alert-list">
          {loading ? (
            <div className="alert-list-spinner">
              <Spinner animation="grow" variant="info" />
            </div>
          ) : alarmList.length > 0 ? (
            <AlarmList alarmList={alarmList} />
          ) : (
            <div>새로운 알림이 없습니다.</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ModalDetail
        show={isopen}
        onHide={() => {
          setIsOpen(false);
        }}
        postId={postId}
        backdrop="static"
      />
      <ModalAddFriend show={show} onHide={handleClose} />
    </>
  );
};

export default memo(ModalAlert);
