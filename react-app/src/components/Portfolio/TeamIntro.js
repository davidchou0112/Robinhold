import molly1 from "../images/molly1-nb.jpg";
import molly3 from "../images/molly3-nb.jpg";
import molly4 from "../images/molly4-nb.jpg";
import stockLine from "../images/stock-line2.png";
import gryffindor from "../images/gryffindor.png";
import hufflepuff from "../images/huffflepuff.png";
import ravenclaw from "../images/ravenclaw.png";
import slytherin from "../images/slytherin.png";
import linkedin from "../images/linkedin.png";
import github from "../images/github.png";

import "./Portfolio.css";

function TeamIntro() {
  return (
    <>
      <div className="team-container">
        <h1 className="team-header">Team Molly</h1>
        <div className="header-img-container">
          <img className="molly-pic" src={molly3} />
          <img className="stockLine" src={stockLine} />
        </div>

        <div className="team-member-container">
          <div className="member-box">
            <img className="house-crest" src={ravenclaw} />
            <div className="team-member-info">
              <h3 className="tm-name">Christy Xiu</h3>
              <div className="info-icon">
                <a href="https://github.com/christyx">
                  <img className="social-icon" src={github} />
                </a>
                <a href="https://www.linkedin.com/in/zhaoyang-xiu/">
                  <img className="social-icon-li" src={linkedin} />
                </a>
              </div>
            </div>
          </div>
          <div className="member-box">
            <img className="house-crest" src={ravenclaw} />
            <div className="team-member-info">
              <h3 className="tm-name">Yifan Xin</h3>
              <div className="info-icon">
                <a href="https://github.com/iffy713">
                  <img className="social-icon" src={github} />
                </a>
                <a href="https://www.linkedin.com/in/yifan-xin-657137153/">
                  <img className="social-icon-li" src={linkedin} />
                </a>
              </div>
            </div>
          </div>
          <div className="member-box">
            <img className="house-crest" src={slytherin} />{" "}
            <div className="team-member-info">
              <h3 className="tm-name">David Chou</h3>
              <div className="info-icon">
                <a href="https://github.com/davidchou0112">
                  <img className="social-icon" src={github} />
                </a>
                <a href="https://www.linkedin.com/in/david-chou-a47026249/">
                  <img className="social-icon-li" src={linkedin} />
                </a>
              </div>
            </div>
          </div>
          <div className="member-box">
            <img className="house-crest" src={slytherin} />{" "}
            <div className="team-member-info">
              <h3 className="tm-name">Casstiel Pi</h3>
              <div className="info-icon">
                <a href="https://github.com/CasstielP">
                  <img className="social-icon" src={github} />
                </a>
                <a href="https://www.linkedin.com/in/casstiel-pi">
                  <img className="social-icon-li" src={linkedin} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamIntro;
