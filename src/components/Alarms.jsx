import React, { useEffect, useState, useRef } from 'react';
import { BASE_URL } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from '../shared/cookie';

const Alarms = () => {
  const memberId = getCookie('memberId');
  const jwt = getCookie('accessToken');
  const [data, setData] = useState([]);
  //   let eventSource = undefined;
  const eventSource = useRef();

  const toastConst = (msg) => {
    toast('🧁 ' + msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      // progressStyle: { color: '#000' },
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    if (!!window.EventSource && memberId !== undefined) {
      setTimeout(() => {
        eventSource.current = new EventSource(
          BASE_URL + `/api/sub/?jwt=${jwt}`,
          { withCredentials: true }
        );
        eventSource.current.onopen = (event) => {
          console.log('connection is opened');
        };

        eventSource.current.onmessage = (event) => {
          // console.log("event", event);
          // console.log('result', event.data);
          toastConst(event.data);
          setData((old) => [...old, event.data]);
        };

        // test 용
        eventSource.current.addEventListener('test', function (event) {
          console.log(JSON.parse(event.data).sender);
          console.log(JSON.parse(event.data));
        });

        eventSource.current.addEventListener('addComment', function (event) {
          let tmp = JSON.parse(event.data);
          let msg = `${tmp.senderNickName}님이 ${tmp.month}/${tmp.day}일 일기에 댓글을 작성하였습니다.`;
          // console.log(msg);
          // console.log(JSON.parse(event.data));
          toastConst(msg);
        });

        eventSource.current.addEventListener('addPost', function (event) {
          //
          let tmp = JSON.parse(event.data);
          let msg = `${tmp.senderNickName}님이 ${tmp.month}/${tmp.day}일 일기를 작성하였습니다. 구경 하러가세여`;
          // console.log(msg);
          // console.log(JSON.parse(event.data));
          toastConst(msg);
        });

        eventSource.current.onerror = (event) => {
          // console.log(event.target.readyState);
          if (event.target.readyState === EventSource.CLOSED) {
            console.log(
              'eventsource err closed (' + event.target.readyState + ')'
            );
          }
          eventSource.current.close();
        };
      }, 2000);
      // eventSource.current = new EventSource(ALARM_URL+`/api/sub/?id=${memberId}`,{ withCredentials: true }); //구독
    }

    return () => {
      eventSource?.current.close();
      console.log('eventsource closed');
    };
  }, []);

  // useEffect(() => {
  //   console.log('data: ', data);
  // }, [data]);

  return (
    <div>
      <ToastContainer limit={3} />
    </div>
  );
};

export default Alarms;
