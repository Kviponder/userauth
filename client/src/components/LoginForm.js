import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { email, password },
      });
      const token = data.login.token;
      localStorage.setItem("id_token", token);
      window.location.replace("/dashboard");
      console.log("Login successful:", data.login.token);
    } catch (err) {
      console.error("You have an error in your login:", err);
    }
  };
  return (
    <Container className="box">
      <Row>
        <Col>
          <h1>Login</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address:</label>
              <input
                placeholder="saucey@marinara.pasta"
                name="email"
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password :</label>
              <input
                placeholder="pAssWOrd"
                name="password"
                type="password"
                id="pwd"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          {loading && <div>Loading...</div>}
          {error && <div>Login failed</div>}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
