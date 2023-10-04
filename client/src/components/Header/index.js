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
            <Button onClick={handleLogout}>Logout</Button>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
