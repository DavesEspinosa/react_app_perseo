import React, { Component } from "react";
import FavoriteIcon from "./FavoriteIcon";
import { Link } from "react-router-dom";
import { Card, Col } from "antd";

class SingleCard extends Component {
  render() {
    const { favs, content, removeFavs, addFavs } = this.props;

    return (
      <Col>
        <Link to={`/player/${content.id}`} >
          <Card
            className="row__poster row__posterLarge"
            key={content.id}
            hoverable
            style={{ width: 200 }}
            cover={
              <img
                alt="Special content"
                style={{ height: "300px" }}
                src={content.cover}
              />
            }
          ></Card>
        </Link>
        <FavoriteIcon
          content={content}
          addFavs={addFavs}
          removeFavs={removeFavs}
          favs={favs}
        />
      </Col>
    );
  }
}

export default SingleCard;
