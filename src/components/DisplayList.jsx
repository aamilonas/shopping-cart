import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const DisplayList = (props) => {
  const { list } = props;

  const OutputStyle = {
    fontFamily: "OCR A Std, monospace",
  };

  return list.map((item, i) => (
    <Container>
      <Row xs={2} md={4} lg={6}>
        <Col xs lg="3">
          <p className="fs-5">{item.iname}</p>
        </Col>
        <Col md={{ span: 6, offset: 0 }}>
          <p className="fs-5">{item.quantity}</p>
        </Col>
        <Col>
          <p className="fs-5">$ {Number(item.price).toFixed(2)}</p>
        </Col>
        <Col>
          <p className="fs-5">$ {item.subtotal.toFixed(2)}</p>
        </Col>
        <Col>
          <Button variant="outline-danger">Remove</Button>{" "}
        </Col>
      </Row>
    </Container>
  ));
};

export default DisplayList;
