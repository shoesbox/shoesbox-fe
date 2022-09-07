import './css/calender.css';
import { Button, Dropdown } from 'react-bootstrap';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apis } from '../api';
import axios from 'axios';

const Calendar = () => {
  const memberId = 12;
  // 날짜 계산용 state
  const [date, setDate] = useState(new Date());
  // 달력에 그려주는 state
  const [dates, setDates] = useState([]);
  // 달력 데이터 담아두기용
  const [prevTray, setPrevTray] = useState();
  const [thisTray, setThisTray] = useState({});
  const [nextTray, setNextTray] = useState({});

  // 계산할 때 사용되지 않음, 연, 월 표시용
  const viewDate = useMemo(() => {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  }, [date]);

  // 임시 테스트용 
  const prevMonthData = async () => {
    const response = await axios.get('http://localhost:5001/data');
    console.log(response?.data.content)
    setPrevTray(response?.data.content)
  }

  // 달력에 쓸 월, 일 계산용
  const calcDate = (setPrevTray) => {
    // 지난 달 마지막 Date, 이번 달 마지막 Date
    const prevLast = new Date(date.getFullYear(), date.getMonth(), 0);
    const thisLast = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const prevLastDate = prevLast.getDate();
    const prevLastDay = prevLast.getDay();

    const thisLastDate = thisLast.getDate();
    const thisLastDay = thisLast.getDay();

    // Dates 기본 배열들
    const prevDates = [];
    // Array(n)로는 0부터 n-1까지의 배열이 생성되므로 1부터 n까지로 밀어주기
    const thisDates = [...Array(thisLastDate + 1).keys()].slice(1);
    const nextDates = [];

    // 백엔드에서 imageurl 받아오기
    // const prevMonthData = async (memberId) => {
    //   const response = await apis.getTargetPosts(memberId, viewDate.year, viewDate.month);
    //   const tray = response?.data.data.content;
    //   setPrevTray({prev: response?.data.data.content})
    //   console.log('here12', prevTray);
    // };

    // const thisMonthData = async () => {
    //   const response = await apis.getTargetPosts(memberId, viewDate.year, (viewDate.month+1));
    //   const tray = response?.data.data.content;
    //   setThisTray({this: response?.data.data.content})
    //   console.log('here12', thisTray);
    // };

    // const nextMonthData = async () => {
    //   const response = await apis.getTargetPosts(memberId, viewDate.year, (viewDate.month+2));
    //   const tray = response?.data.data.content;
    //   setNextTray({next: response?.data.data.content})
    //   console.log('here12', nextTray);
    // };
    

    // prevDates 계산
    if (prevLastDay !== 6) {
      for (let i = 0; i < prevLastDay + 1; i++) {
        prevDates.unshift(prevLastDate-i)
      }
    }
    
    // nextDates 계산
    for (let i = 1; i < 7 - thisLastDay; i++) {
      nextDates.push(i);
    }

    // prevDates에 tray image데이터 돌려주기

    for (let i = 0; i < prevDates.length; i++) {
      
    }
    let newPrev = prevDates.reduce((arr, v) => {
      v == prevTray?.createdDay 
      ? arr.push({day:v, image: prevTray?.prev.thumbnailUrl})
      : arr.push({day:v})
      return arr;
    }, [])
    

    // thisDates에 tray image데이터 돌려주기
    // thisDates.reduce((arr, v) => {
    //   if(v == thisTray?.this.createdDay){
    //     arr.push({day:v, image: thisTray?.this.thumbnailUrl})
    //   }
    //   else{
    //     // arr.push({day:v})
    //   }
    // },[])
    // // nextDates에 tray image데이터 돌려주기
    // nextDates.reduce((arr, v) => {
    //   if(v == nextDataTray?.createdDay){
    //     arr.push({day:v, image: nextDataTray?.thumbnailUrl})
    //   }
    //   else{
    //     // arr.push({day:v})
    //   }
    //   return arr;
    // }, [])

    // Dates 배열 합치기
    return prevDates.concat(thisDates, nextDates);
  };

  const changeMonth = (addMonth) => {
    if (addMonth !== 0) {
      date.setDate(1);
      date.setMonth(date.getMonth() + addMonth);
      setDate(new Date(date));
      setDates(calcDate());
    } else {
      setDate(new Date());
      setDates(calcDate());
    }
  };

  useEffect(() => {
    setDates(calcDate());
    prevMonthData();
    console.log("동기성 테스트1", prevTray)
  }, [date]);

  const navigate = useNavigate();
  // const [posts, setPosts] = useState([]);

  // const getAllPosts = async () => {
  //   let postTray = [];
  //   const copyDate = dates.slice();
  //   // const res = await axios.get('http://localhost:3030/totalPosts');
  //   // console.log('All Posts', res.data);
  //   const response = await axios.get('http://localhost:3030/totalPosts');
  //   const tray = response?.data.content;
    
  //   copyDate.reduce((each, idx) => {
  //     if(idx == tray.createdDay){
        
  //     }
  //     else{
        
  //     }
  //   }, [])
  //   setPosts(data);
  // };

  // const img =
  //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5LHQDLTKqbrymeP5odTzF3X1yLbj0WQI9mg&usqp=CAU';
  // `${posts.content[0].thumbnailUrl}`;

  // useEffect(() => {
  //   getAllPosts();
  // }, []);
  // console.log(posts);

  return (
    <div className="calender-container">
      <div className="calendar">
        <div className="header">
          <div className="year">{viewDate.year}</div>
          <span className="month">{viewDate.month + 1}</span>
          <div className="nav">
            <button className="nav-btn" onClick={() => changeMonth(-1)}>
              &lt;
            </button>
            <button className="nav-btn go-today" onClick={() => changeMonth(0)}>
              Today
            </button>
            <button className="nav-btn" onClick={() => changeMonth(+1)}>
              &gt;
            </button>
            {/* <Button className="nav-btn go-next">&gt;</Button> */}
          </div>
        </div>
        <div className="main">
          <div className="days">
            <div className="day">일</div>
            <div className="day">월</div>
            <div className="day">화</div>
            <div className="day">수</div>
            <div className="day">목</div>
            <div className="day">금</div>
            <div className="day">토</div>
          </div>
          <div className="dates">
            {dates.map((date, idx) => (
              <div
                className="date"
                key={idx}
                style={{ background: `url(${date.image})`, backgroundSize: 'cover' }}
                onClick={() => navigate('/detail')}
              >
                <span>{date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
