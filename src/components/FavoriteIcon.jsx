import React, { Component } from "react";
import { Col } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

class FavoriteIcon extends Component {
  render() {
    const { favs, content, removeFavs, addFavs } = this.props;
    return (
      <Col>
        {favs && favs.includes(content) ? (
          <HeartFilled
            onClick={() => removeFavs(content.id)}
            style={{ color: "red", fontSize: "25px" }}
          />
        ) : (
          <HeartOutlined
            onClick={() => addFavs(content.id)}
            style={{
              color: "red",
              fontSize: "25px",
            }}
          />
        )}
      </Col>
    );
  }
}

export default FavoriteIcon;
