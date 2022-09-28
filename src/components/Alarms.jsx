import React, { useEffect, useState, useRef } from "react";
import { ALARM_URL } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../shared/cookie";

const Alarms = () => {
const memberId = getCookie('memberId');
  const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);
  const [meventSource, msetEventSource] = useState(undefined);
//   let eventSource = undefined;
  const eventSource = useRef();

  const toastConst = (msg) => {
    toast("🦄"+msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

  useEffect(() => {
    // console.log("listening", listening);
    // if (!listening && memberId!==undefined) {
    if (!!window.EventSource&& memberId!==undefined) {
      eventSource.current = new EventSource(ALARM_URL+`/api/sub/?id=${memberId}`,{ withCredentials: true }); //구독
    //   msetEventSource(eventSource);
      //   console.log("eventSource", eventSource);

      eventSource.current.onopen = event => {
        console.log("connection is opened");
      };

      eventSource.current.onmessage = event => {
        // console.log("event", event);
        console.log("result", event.data);
        toastConst(event.data);
        setData(old => [...old, event.data]);
        setValue(event.data);
      };
    //   eventSource.addEventListener("test", function (event) { //
    //     console.log(JSON.parse(event.data).sender);
    //     console.log(JSON.parse(event.data));
    //     })

      eventSource.current.onerror = event => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("eventsource closed (" + event.target.readyState + ")");
        }
        eventSource.current.close();
      };

    //   setListening(true);
    }

    return () => {
      eventSource?.current.close();
      console.log("eventsource closed");
    };
  }, []);

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

//   const checkData = () => {
//     console.log(data);
//   };

  return (
    <div>
      {/* <button onClick={checkData}>확인</button>
      <header className="App-header">
        <div style={{ backgroundColor: "white" }}>
          Received Data
          {data.map((d, index) => (
            <span key={index}>{d}</span>
          ))}
        </div>
      </header>
      <div>value: {value}</div> */}
      <ToastContainer limit={5}/>
    </div>
  );
}

export default Alarms;