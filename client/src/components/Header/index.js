import { Container, Row, Col, Button } from "react-bootstrap";
import Auth from "../../utils/auth";

function Header() {
  const handleLogout = () => {
    Auth.logout(); // Remove the JWT token from local storage
    window.location.replace("/"); // Redirect the user to the homepage or login page
  };

  return (
    <header>
      <Container>
        <Row>
          <Col>
            <h1>Header</h1>
            {Auth.loggedIn() ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <div className="button-cont">
                <Button className="headButt" href="/signUp">
                  Sign Up
                </Button>

                <Button className="headButt" href="/">
                  Login
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
