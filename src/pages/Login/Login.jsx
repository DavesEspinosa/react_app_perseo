import React, { Component } from "react";
import { withAuth } from "../../context/auth-context.js";
import md5 from "md5";
import "./Login.css";
import { Alert } from "antd";
import { Grid, Button } from "@material-ui/core";
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
          <Grid container style={{ minHeight: "100vh" }}>
            <Grid item xs={12} sm={6}>
              <img
                alt="brand"
                src="https://www.panoramaaudiovisual.com/wp-content/uploads/2018/06/Perseo-Tv.jpg"
                className="brand"
              />
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={6}
              justify="space-between"
              alignItems="center"
              direction="column"
              style={{ padding: 10 }}
            >
              <div />
              <div>
                {message !== "Datos de acceso incorrectos" ? null : (
                  <Alert
                    message="Error"
                    description={message}
                    type="error"
                    showIcon
                  />
                )}
                <Grid container justify="center">
                  <img
                    className="logo"
                    alt="logo"
                    width={200}
                    src="https://acceso.perseo.tv/assets/img/logoPerseo.png"
                  />
                </Grid>
                <form
                  className="form"
                  name="form"
                  onSubmit={this.handleFormSubmit}
                >
                  <label>Username</label>
                  <input
                    className="form-control"
                    type="text"
                    name="user"
                    value={user}
                    onChange={this.handleChange}
                  />
                  {this.props.message && (
                    <div className="error">Username is required</div>
                  )}
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                  {this.props.message && (
                    <div className="error">Password is required</div>
                  )}
                  <Button
                    style={{ marginTop: "12%", backgroundColor: "black" }}
                    type="submit"
                    color="primary"
                    variant="contained"
                  >
                    Submit
                  </Button>
                </form>
              </div>
              <div />
            </Grid>
          </Grid>
        )}
      </>
    );
  }
}

export default withAuth(Login);
