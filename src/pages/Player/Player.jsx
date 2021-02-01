import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context.js";
import { device } from "./../Login/Login";
import { Avatar, Space } from "antd";
import TimerTwoToneIcon from "@material-ui/icons/TimerTwoTone";
import GradeTwoToneIcon from "@material-ui/icons/GradeTwoTone";
import BlockTwoToneIcon from "@material-ui/icons/BlockTwoTone";
import { Link } from "react-router-dom";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import ThumbUpAltTwoToneIcon from "@material-ui/icons/ThumbUpAltTwoTone";

import "./Player.css";
import ReactPlayer from "react-player";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

class Player extends Component {
  state = {
    details: {},
  };

  componentDidMount() {
    this.playerInfo();
  }

  playerInfo = () => {
    const token = this.props.token;
    const { id } = this.props.match.params;
    const query = Object.keys({ token, id, device })
      .map((k) => {
        return (
          encodeURIComponent(k) +
          "=" +
          encodeURIComponent({ token, id, device }[k])
        );
      })
      .join("&");
    fetch("https://dev.perseo.tv/ws/Play.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      mode: "cors",
      body: query,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          details: data,
        });
        return data;
      })
      .catch((err) => console.log(err));
  };

  goBack = () => {
    this.props.history.push("/main");
  };

  render() {
    const {
      cover,
      duration,
      rating,
      title,
      totalVotes,
      url,
      votes,
    } = this.state.details;
    return (
      <>
        <Link className="back-to-home" to="/main">
          <HomeTwoToneIcon className="back__arrow" />
          <p className="back__text">Back to Main</p>
        </Link>
        <hr className="seperator-detail" />
        {title && (
          <section className="detail">
            <div className="movie-detail">
              <div className="movie-detail-text">
                <div className="movie-detail__title">
                  <h1>{title}</h1>
                  <span className="movie__star">
                    <Avatar shape="square" size={84} src={cover} />
                  </span>
                </div>
                <div className="movie-detail__extra">
                  <span className="release-date">
                    <IconText icon={ThumbUpAltTwoToneIcon} text={votes} />
                    <span className="genre__seperator">|</span>
                  </span>
                  <span className="release-date">
                    <IconText
                      icon={TimerTwoToneIcon}
                      text={`${duration} seg`}
                    />
                  </span>
                  <span className="genre__seperator">|</span>
                  <span className="release-date">
                    <IconText
                      icon={BlockTwoToneIcon}
                      text={rating}
                      key="list-vertical-message"
                    />{" "}
                  </span>
                  <span className="genre__seperator">|</span>
                  <span className="release-date">
                    <IconText
                      icon={GradeTwoToneIcon}
                      text={totalVotes}
                      key="list-vertical-message"
                    />{" "}
                  </span>
                </div>
              </div>

              <div className="player-wrapper">
                {url && (
                  <ReactPlayer url={url} className="react-player" playing />
                )}
              </div>
            </div>
          </section>
        )}
      </>
    );
  }
}

export default withAuth(Player);
