import './css/calender.css';
import { Button, Dropdown } from 'react-bootstrap';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apis } from '../api';
import axios from 'axios';
import { getCookie, setCookie } from '../shared/cookie';

const Calendar = () => {

  const memberId = 12;

  // 날짜 계산용 state
  const [date, setDate] = useState(new Date());
  // 달력에 그려주는 state
  const [dates, setDates] = useState([]);
  // axios 통신용 state
  const [ax, setAx] = useState([]);

  // 계산할 때 사용되지 않음, 연, 월 표시용
  const viewDate = useMemo(() => {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  }, [date]);

  // 달력에 쓸 월, 일 계산용
  const calcDate = () => {
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

    // Tray 작성
    let prevT = prevDates.reduce((arr, v) => {
      arr.push({day: v, url:''})
      return arr
    }, [])

    let thisT = [];

    for (let i = 0; i < thisDates.length; i++) {
      if(thisDates[i] == ax[i]?.postId){
        thisT.push({day:thisDates[i], url:ax[i]?.thumbnailUrl})
      }
      else{
        thisT.push({day:thisDates[i], url: ''})
      }
    }

    // let thisT = thisDates.reduce((arr, v) => {
    //     for (let i = 0; i < thisDates.length; i++) {  

    //       v == ax[i]?.postId 
    //       ? arr.push({day:v, url:ax[i]?.thumbnailUrl})
    //       : arr.push({day:v, url:''})

    //       // if(v == ax[i]?.postId){
    //       //   arr.push({day:v, url:ax[i]?.thumbnailUrl})
    //       // }
    //     }
    //     // arr.push({day:v, url:''})
    //     return arr
    //     }, [])

        
        let nextT = nextDates.reduce((arr, v) => {
          arr.push({day: v, url:''})
          return arr
        }, [])
    // Dates 배열 합치기
    // { prevDates, thisDates, nextDates }
    console.log("전체배열 한번 보자", prevT.concat(thisT, nextT))

    
    // return prevDates.concat(thisDates, nextDates);
    return prevT.concat(thisT, nextT)
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
    axios.get('http://localhost:5001/data')
      .then(res => res.data.content)
      .then((data) => {
          setAx(data)
      })
  }, []) 

  useEffect(() => {
    setDates(calcDate())

    let print = calcDate()
    console.log("뿌리기 위한 배열 확인", print)
    },[ax, date])

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
            <Button className="nav-btn go-next">&gt;</Button>
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
            {dates.map((day, idx) => (
              <div
                className="date"
                key={idx}
                style={{ background: `url(${day.url})`, backgroundSize: 'cover' }}
                onClick={() => navigate('/detail')}
              >
                <span>{day.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

// let data = [10, 20, 30];
// let tray = [
//     {
//         postId:10,
//         url:"url",
//     },
//     {
//         postId:20,
//         url:"url2"
//     }
// ]
// let image = [];


// image = data.reduce((arr, v)=>{
//     for (let i = 0; i < tray.length; i++) {
//         if(v == tray[i].postId){
//             arr.push({day:v, url:tray[i].url})
//         }
//     }
//     return arra
// },[])

// console.log(image)