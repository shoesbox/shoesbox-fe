import './css/aboutuspage.css';

const AboutUsPage = () => {
  return (
    <div className="about-wrap">
      <div>
        <h4>🍧 BackEnd</h4>
        <div className="personal-profile-box">
          <img src="images/chanho.png" alt="프로필 사진" />
          <div>
            <div>정찬호</div>
            <a href="https://github.com/Elrendar">
              https://github.com/Elrendar
            </a>
          </div>
        </div>
        <div className="personal-profile-box">
          <img src="images/myeongbaek.jpg" alt="프로필 사진" />
          <div>
            <div>최명백</div>
            <a href="https://github.com/myeongbaek">
              https://github.com/myeongbaek
            </a>
          </div>
        </div>
        <div className="personal-profile-box">
          <img src="images/inyoung.jpg" alt="프로필 사진" />
          <div>
            <div>최인영</div>
            <a href="https://github.com/CINY4612">
              https://github.com/CINY4612
            </a>
          </div>
        </div>
      </div>
      <br />
      <div>
        <h4>🍨 FrontEnd</h4>
        <div className="personal-profile-box">
          <img src="images/dongkyu.jpg" alt="프로필 사진" />
          <div>
            <div>김동규</div>
            <a href="https://github.com/caffesale">
              https://github.com/caffesale
            </a>
          </div>
        </div>
        <div className="personal-profile-box">
          <img src="images/hyejung2.jpg" alt="프로필 사진" />
          <div>
            <div>박혜정</div>
            <a href="https://github.com/hyexjun">https://github.com/hyexjun</a>
          </div>
        </div>
        <div className="personal-profile-box">
          <img src="images/sunha.jpg" alt="프로필 사진" />
          <div>
            <div>황선하</div>
            <a href="https://github.com/lovysunny7">
              https://github.com/lovysunny7
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
