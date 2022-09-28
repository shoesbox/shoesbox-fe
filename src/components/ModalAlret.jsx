import './css/modalalert.css';
import { Button, Form, Modal } from 'react-bootstrap';
import { useState, useEffect, useRef, memo } from 'react';
import { apis } from '../api';
import { useSelector } from 'react-redux';

const ModalAlert = (props) => {
// const ModalAlert = ({alarmList,...props}) => {
//  const [alarmList, setAlarmList] = useState();
 const isLoggedIn = useSelector((state) => state.login.value);
 const alarmList = useSelector((state) => state.login.alarmList);
//  const getAlarmList = async ()=>{
//   try{
//   const {data} = await apis.getAlarmList();
//     setAlarmList(data.data);
//   }catch(err){
//     console.log(err);
//    } 
//   }

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

const AlarmList =  ({alarmList}) =>{
  // setAlarmList([{id: 2, text:'hello'},{id: 3, text:'hello3'}])

  return (
      alarmList?.map((alarm,idx)=>
      <span key={idx}
      // onClick={()=>{
  // console.log(alarmList);
  // alert('hey')}}
        >
        {alarm.text}
        {/* {alarm.alarmId}/
        {alarm.alarmId} */}
      </span>
      )
  )
}

  return (
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
  );
};

export default memo(ModalAlert);
