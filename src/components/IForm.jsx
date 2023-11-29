import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import sbag from "../images/sbag.png";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import DisplayList from "./DisplayList";

const IForm = (props) => {
  const initialForm = {
    iname: "",
    quantity: 1,
    price: 0.0,
    subtotal: 0.0,
  };

  const ErrorStyle = {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#eb6f92",
  };

  const [errors, setErrors] = useState([]);

  const [itemList, setItemList] = useState([]);

  const [item, setItem] = useState(initialForm);

  const onChangeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const onBlurHandler = (e) => {
    if (!isNaN(item.quantity) && !isNaN(item.price)) {
      item.subtotal = item.quantity * item.price;
    }
    document.getElementById("st").value = item.subtotal.toFixed(2);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const errorList = [];

    if (item.iname === "") {
      errorList.push("⚠️ Item must have a valid name! ⚠️");
    }
    if (item.quantity <= 0) {
      errorList.push(
        "⚠️ Quantity of items must be an integer greater than zero! ⚠️"
      );
    }
    if (item.price <= 0) {
      errorList.push("⚠️ Item price must be a valid number! ⚠️");
    }

    if (Number.isInteger(Number(item.price)) && Number(item.price) > 0) {
      let num = Number(item.price);
      item.price = num.toFixed(2);
    }

    if (errorList.length > 0) {
      setErrors(errorList);
    } else {
      setItemList([...itemList, item]);
      setItem(initialForm);
      setErrors([]);
    }
  };
  return (
    <>
      <Form.Label htmlFor="item" className=" fs-2">
        Angelo's Shopping Cart Application
      </Form.Label>
      <br />
      <br />
      <div className="d-flex justify-content-center">
        <Image src={sbag} height={250} width={210} />
      </div>
      <br />

      <Container>
        <Row xs={2} md={4} lg={6}>
          <Col xs lg="3">
            <p className="fs-3">Item Name</p>
          </Col>
          <Col md={{ span: 6, offset: 0 }}>
            <p className="fs-3">Quantity</p>
          </Col>
          <Col>
            <p className="fs-3">Price</p>
          </Col>
          <Col xs lg="3">
            <p className="fs-3">Sub Total</p>
          </Col>
        </Row>
        <Row xs={2} md={4} lg={6}>
          <Col xs lg="3">
            <input
              name="iname"
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={item.iname}
              onChange={onChangeHandler}
            />
          </Col>
          <Col md={{ span: 6, offset: 0 }}>
            <Form.Control
              type="number"
              name="quantity"
              className="form-control"
              value={item.quantity}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
            />
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                aria-label="Dollar amount (with dot and two decimal places)"
                name="price"
                value={item.price}
                type="number"
                placeholder="0.00"
                className="form-control"
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
              />
            </InputGroup>
          </Col>
          <Col>
            <Form.Control
              type="number"
              id="st"
              name="subtotal"
              placeholder="0.00"
              aria-label="Disabled input example"
              value={item.subtotal.toFixed(2)}
              disabled
              readOnly
            />
          </Col>
          <Col>
            <Button variant="outline-success" onClick={onSubmitHandler}>
              Add to Shopping List
            </Button>{" "}
          </Col>
        </Row>
        <Row className="justify-content-center">
          {errors.map((err, i) => (
            <p style={ErrorStyle} key={i}>
              {err}
            </p>
          ))}
        </Row>
      </Container>
      <DisplayList list={itemList} />
      {/* {itemList.length > 0 ? (
        Add the total stuff here
      ) : (
        <p> </p>
      )} */}
    </>
  );
};
export default IForm;
