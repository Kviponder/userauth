import { Container, Row, Col } from "react-bootstrap";
import Auth from "../../utils/auth";

function Dashboard() {
  console.log(Auth.loggedIn());
  return (
    <>
      {Auth.loggedIn() ? (
        <header>
          <Container>
            <Row>
              <Col>
                <h1>Dashboard</h1>
              </Col>
              <Col>
                <p>Congratulations! You are logged in.</p>
              </Col>
            </Row>
          </Container>
        </header>
      ) : (
        <p>You need to be logged in to view this page.</p>
      )}
    </>
  );
}

export default Dashboard;
