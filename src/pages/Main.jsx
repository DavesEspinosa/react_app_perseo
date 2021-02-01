import React, { Component } from "react";
import { withAuth } from "../context/auth-context.js";
import { Redirect } from "react-router-dom";
import { device } from "./Login";
import { Result, Row } from "antd";

import "./Main.css";
import SingleCard from "./../components/SingleCard";
import FavoriteList from "../components/FavoriteList.jsx";
import Header from "../components/Header.jsx";

const token = localStorage.getItem("token");

class Main extends Component {
  state = {
    search: "",
    contents: [],
    favs: [],
    filteredContents: [],
    userInfo: {},
  };

  componentDidMount() {
    this.getData();
  }

  logOut = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.filterContents(value);
  };

  filterContents = (searchTerm) => {
    const searchedTerm = searchTerm.toLowerCase();

    const searcher = [...this.state.contents].filter((content) => {
      return content.title.toLowerCase().includes(searchedTerm);
    });

    this.setState({ filteredContents: searcher });
  };

  getData = () => {
    const query = Object.keys({ token, device })
      .map((k) => {
        return (
          encodeURIComponent(k) + "=" + encodeURIComponent({ token, device }[k])
        );
      })
      .join("&");
    fetch("https://dev.perseo.tv/ws/GetView.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      mode: "cors",
      body: query,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const user = data.user;
        const contents = data.contents;
        const favs = data.user.favs;
        const favData = contents.filter(function (val) {
          return favs.indexOf(val.id) !== -1;
        });
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("favs", JSON.stringify(favData));

        this.setState({
          contents: contents,
          filteredContents: contents,
          favs: favData,
          userInfo: user,
        });

        return data;
      })
      .catch((err) => console.log(err));
  };

  addFavs = (id) => {
    const favs = this.state.favs;
    const contentsCopy = [...this.state.contents];

    if (!favs.includes(id)) {
      const content = contentsCopy.find((contentObj) => contentObj.id === id);

      favs.unshift(content);
      localStorage.setItem("favs", JSON.stringify(favs));

      this.setState({
        favs: favs,
      });
    }
  };

  removeFavs = (id) => {
    const favs = this.state.favs;
    const restFavs = favs.filter((fav) => fav.id !== id);

    this.setState({
      favs: restFavs,
    });
  };

  render() {
    const token = localStorage.getItem("token");
    const { favs, filteredContents, search, userInfo } = this.state;

    return (
      <>
        {!token ? (
          <Redirect to="/" />
        ) : (
          <>
            <Header
              handleChange={(e) => this.handleChange(e)}
              search={search}
              logOut={this.logOut}
              userInfo={userInfo}
            />
            <div className="row">
              <h2>All content</h2>
              <div className="row__posters">
                {filteredContents?.length > 0 ? (
                  filteredContents.map((content) => {
                    return (
                      <Row key={content.id}>
                        <SingleCard
                          content={content}
                          addFavs={this.addFavs}
                          removeFavs={this.removeFavs}
                          favs={favs}
                        />
                      </Row>
                    );
                  })
                ) : (
                  <Result
                    title={`There's no response for ${search}. Try again.`}
                  />
                )}
              </div>
            </div>

            <FavoriteList
              userInfo={this.state.userInfo}
              removeFavs={this.removeFavs}
              favs={this.state.favs}
            />
          </>
        )}
      </>
    );
  }
}

export default withAuth(Main);
