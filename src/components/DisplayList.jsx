import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";

const DisplayList = (props) => {
  const [list, setList] = useState({ ...props });

  //{list} = props;
  //const { list } = props;

  const OutputStyle = {
    fontFamily: "OCR A Std, monospace",
  };

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 5,
      }}
    />
  );

  function handleRemove(iname) {
    console.log(iname);
    const newList = list.filter((item) => item.iname !== iname);

    setList(newList);
  }

  return list.map((item, i) => (
    <Container>
      <Row xs={2} md={4} lg={6}>
        <Col xs lg="3">
          <p className="fs-5">🍽️ &emsp; {item.iname}</p>
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
          <Button
            variant="outline-danger"
            onClick={() => handleRemove(item.iname)}
          >
            Remove
          </Button>{" "}
        </Col>
      </Row>
      <ColoredLine color="grey" />
      <Row xs={2} md={4} lg={6}>
        <Col xs lg="3">
          <h3>Total</h3>
        </Col>
      </Row>
    </Container>
  ));
};

export default DisplayList;
