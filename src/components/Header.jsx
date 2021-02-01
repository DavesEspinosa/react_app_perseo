import React, { Component } from "react";
import SearchBar from "./SearchBar";
import {  Avatar, Row, Col } from "antd";

class Header extends Component {
  render() {
    const { userInfo, logOut, search, handleChange } = this.props;
    return (
      <Row justify="space-between">
        <Col flex="100px">
          <Avatar
            onClick={logOut}
            src={userInfo.avatar}
            shape="square"
            size={70}
          />
        </Col>
        <Col flex="auto">
          <SearchBar search={search} handleChange={(e) => handleChange(e)} />
        </Col>
       
      </Row>
    );
  }
}

export default Header;
