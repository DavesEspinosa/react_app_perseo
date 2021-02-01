import React, { Component } from "react";
import { withAuth } from "../context/auth-context.js";
import md5 from "md5";
import "./Login.css";
import { Alert } from "antd";
import { Redirect } from "react-router-dom";

export const device = "Web";

class Login extends Component {
  state = { user: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { user, password } = this.state;
    const pass = md5(password);

    this.props.login(user, pass, device);

    this.setState({
      user: "",
      password: "",
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { user, password } = this.state;
    const token = localStorage.getItem("token");
    const message = this.props.message;

    return (
      <>
        {token ? (
          <Redirect to="/main" />
        ) : (
          <div className="col-md-6 col-md-offset-3">
            {message !== "Datos de acceso incorrectos" ? null : (
              <Alert
                message="Error"
                description={message}
                type="error"
                showIcon
              />
            )}
            <form name="form" onSubmit={this.handleFormSubmit}>
              <label>Username:</label>
              <input
                className="form-control"
                type="text"
                name="user"
                value={user}
                onChange={this.handleChange}
              />
              {this.props.message && (
                <div className="help-block">Username is required</div>
              )}
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              {this.props.message && (
                <div className="help-block">Password is required</div>
              )}
              <input type="submit" value="Login" />
            </form>
          </div>
        )}
      </>
    );
  }
}

export default withAuth(Login);
