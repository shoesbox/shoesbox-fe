import './css/aboutuspage.css';

const AboutUsPage = () => {
  return (
    <div className='about-wrap'>
      <div>
        <h4>BackEnd</h4>
        <div className="personal-profile-box">
          <img src="images/chanho.png" alt="프로필 사진" />
          <div>
            <div>정찬호</div>
            <div>깃헙 주소</div>
          </div>
        </div>
        <div className="personal-profile-box">
          <img src="images/myeongbaek.jpg" alt="프로필 사진" />
          <div>
            <div>최명백</div>
            <div>깃헙 주소</div>
          </div>
        </div>
        <div className="personal-profile-box">
          <img src="images/inyoung.jpg" alt="프로필 사진" />
          <div>
            <div>최인영</div>
            <div>깃헙 주소</div>
          </div>
        </div>
      </div>
      <div>
        <h4>FrontEnd</h4>
        <div className="personal-profile-box">
          <img src="images/dongkyu.jpg" alt="프로필 사진" />
          <div>
            <div>김동규</div>
            <div>깃헙 주소</div>
          </div>
        </div>
        <div className="personal-profile-box">
          <img src="images/hyejung2.jpg" alt="프로필 사진" />
          <div>
            <div>박혜정</div>
            <div>깃헙 주소</div>
          </div>
        </div>
        <div className="personal-profile-box">
          <img src="images/sunha.jpg" alt="프로필 사진" />
          <div>
            <div>황선하</div>
            <div>깃헙 주소</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
