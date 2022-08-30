import classes from './Main.module.css';
import DiaryItem from '../components/DiaryItem';

const Main = () => {
  // const cookie = getCookie('accessToken');

  // useEffect(() => {
  //   showAll();
  //   if (cookie !== undefined) {
  //     return setIsLoggedIn(true);
  //   }
  // }, []);

  return (
    <div className={classes.wrap}>
      <div
        className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-5 g-1"
      >
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
      </div>
      <div className={classes.friends}>
        <button>친구1</button>
        <button>친구2</button>
        <button>친구3</button>
        <button>친구4</button>
        <button>+</button>
      </div>
    </div>
  );
};

export default Main;
