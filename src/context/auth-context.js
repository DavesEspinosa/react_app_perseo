import React from "react";
import { Component } from "react";
const { Consumer, Provider } = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isLoading: true,
    isLoggedIn: false,
    message: "",
  };

  login = (user, pass, device) => {
    const query = Object.keys({ user, pass, device })
      .map((k) => {
        return (
          encodeURIComponent(k) +
          "=" +
          encodeURIComponent({ user, pass, device }[k])
        );
      })
      .join("&");

    fetch("https://dev.perseo.tv/ws/Login.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      mode: "cors",
      body: query,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const token = data.token;
        if (token !== "") {
          localStorage.setItem("token", token);
        }

        this.setState({
          isLoggedIn: true,
          message: data.message,
        });
      })
      .catch((err) => {console.log(err);});
  };

  render() {
    const { isLoading, isLoggedIn, message } = this.state;
    const { login } = this;
    return !isLoading ? (
      <div>Loading...</div>
    ) : (
      <Provider
        value={{
          isLoading,
          isLoggedIn,
          login,
          message,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const withAuth = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <Consumer>
          {({ login, isLoading, isLoggedIn, message }) => {
            return (
              <WrappedComponent
                isLoading={isLoading}
                login={login}
                isLoggedIn={isLoggedIn}
                message={message}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

export { AuthProvider, withAuth };
