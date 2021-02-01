import React, { Component } from "react";
import { Card, Row, Col, Result } from "antd";
import { HeartFilled } from "@ant-design/icons";

export class FavoriteList extends Component {
  render() {
    const user = this.props.userInfo;
    const favs = this.props.favs;

    return (
      <div className="row">
        <h2>{`These are the ${user.name} favs`}</h2>
        <div className="row__posters">
          {favs?.length > 0 ? (
            favs.map((fav) => {
              return (
                <Row key={fav.id}>
                  <Col>
                    <Card
                      hoverable
                      className="row__poster row__posterLarge"
                      style={{ width: 200 }}
                      cover={
                        <img
                          alt="Specific content"
                          style={{ height: "300px" }}
                          src={fav.cover}
                        />
                      }
                    ></Card>
                  </Col>
                  <Col>
                    <HeartFilled
                      onClick={() => this.props.removeFavs(fav.id)}
                      style={{ color: "red", fontSize: "25px" }}
                    />
                  </Col>
                </Row>
              );
            })
          ) : (
            <Result title={`There's any favorite yet. Add some.`} />
          )}
        </div>
      </div>
    );
  }
}

export default FavoriteList;
