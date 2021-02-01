
import React, { Component } from "react";
import { withAuth } from "../context/auth-context";
import { device } from "./Login";
import { Image } from "antd";
import { List, Avatar, Space } from "antd";
import ThumbUpAltTwoToneIcon from "@material-ui/icons/ThumbUpAltTwoTone";
import TimerTwoToneIcon from "@material-ui/icons/TimerTwoTone";
import GradeTwoToneIcon from "@material-ui/icons/GradeTwoTone";
import BlockTwoToneIcon from "@material-ui/icons/BlockTwoTone";
import { Button } from "antd";


const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
return (
    <>
      {/* <ReactPlayer width={300} url={url} /> */}
      <Image width={200} src={cover} />
      <List.Item
        key={id}
        actions={[
          <IconText
            icon={GradeTwoToneIcon}
            text={totalVotes}
            key="list-vertical-star-o"
          />,
          <IconText
            icon={TimerTwoToneIcon}
            text={duration}
            key="list-vertical-like-o"
          />,
          <IconText
            icon={ThumbUpAltTwoToneIcon}
            text={votes}
            key="list-vertical-message"
          />,
          <IconText
            icon={BlockTwoToneIcon}
            text={rating}
            key="list-vertical-message"
          />,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={user.avatar} />}
          title={<a href={url}>{title}</a>}
          description={section}
        />
        {url}
      </List.Item>
      <Button onClick={this.goBack} danger>
        Back to the Main
      </Button>
    </>
  );
}