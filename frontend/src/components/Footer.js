import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright <span className="text-primary">&copy; 2020 </span>{" "}
            ProStore
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
