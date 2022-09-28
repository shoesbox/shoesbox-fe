import "./css/modalalert.css";
import { Button, Form, Modal } from "react-bootstrap";
import { useState, useEffect, useRef, memo, Fragment } from "react";
import { apis } from "../api";
import { useSelector } from "react-redux";
import { BsCheckLg, BsCheckCircle, BsX } from "react-icons/bs";
import ModalDetail from "./ModalDetail";

const ModalAlert = (props) => {
  // const ModalAlert = ({alarmList,...props}) => {
  //  const [alarmList, setAlarmList] = useState();
  const isLoggedIn = useSelector((state) => state.login.value);
  const alarmList = useSelector((state) => state.login.alarmList);
  const [isopen, setIsOpen] = useState(false);
  const [postId, setPostId] = useState();
  const [alarmId, setAlarmId] = useState();

   const deleteOneAlarm = async (alarmId)=>{
    try{
    const {data} = await apis.deletAlarm(alarmId);
      console.log(data);
    }catch(err){
      console.log(err);
     }
    }

  //  useEffect(() => {
  //   getAlertList();
  //   console.log(alertList);
  //   console.log('isLoggedIn', isLoggedIn);
  // }, [props]);

  useEffect(() => {
    //  if(isLoggedIn){
    //   getAlarmList();
    //  }
    // setAlarmList('texteeee');
    console.log(alarmList);
  }, [alarmList]);

  useEffect(() => {
    if(alarmId!==undefined){
    alert(`${alarmId} 삭제할꺼임`)
    }
  }, [alarmId]);


  const AlarmList = ({ alarmList }) => {
    return alarmList?.map((alarm, idx) => (
      <Fragment key={idx}>
        <span
        onClick={()=>{
          setIsOpen(true)
          setPostId(alarm.postId)
      }
      }
        >
          {alarm.text}
          {"  "}
        </span>
        <Button onClick={()=>{
            setAlarmId(alarm.alarmId)
          
            }}  >
          <BsX/>
          </Button>
        </Fragment>
    ));
  };

  return (
    <>
    <Modal {...props} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>
          <div>알림 🍧</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="alert-list">
        {/* {
          alarmList?.map((alert,idx)=>
          <span key={idx}>
            {alert.messageType==="POST"?
            "post입니다"
             :
             "comment입니다"
            }
            {alert.messageType}
          </span>
          )
        } */}
        <AlarmList alarmList={alarmList} />
        {/* <div>
          <span>어쩌구</span>님이 새로운 일기를 등록했어요!
        </div>
        <div>
          <span>어쩌구</span>님이 일기에 댓글을 등록했어요!
        </div> */}
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
            keyboard={false}
          />
      </>
  );
};

export default memo(ModalAlert);
