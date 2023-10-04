import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [signUpUser, { loading, error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signUpUser({
        variables: { email, username, password },
      });

      // Check if the mutation was successful and received a token
      if (data.addUser && data.addUser.token) {
        const token = data.addUser.token;

        // Store the token in local storage
        Auth.login(token);

        // Redirect to the dashboard or any other page
        window.location.replace("/dashboard");
      } else {
        console.error("Sign Up failed: No token received");
      }
    } catch (err) {
      console.error("You have an error in your Sign Up:", err);
    }
  };

  return (
    <Container className="box">
      <Row>
        <Col>
          <h1>Sign Up</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address:</label>
              <input
                placeholder="Beans@frijoles.pinto"
                name="email"
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Urername">Username:</label>
              <input
                placeholder="Mr Beans"
                name="Username"
                type="username"
                id="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password :</label>
              <input
                placeholder="👀 👀 👀 👀 👀 👀 👀 👀"
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
          {error && <div>Sign Up failed</div>}
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
