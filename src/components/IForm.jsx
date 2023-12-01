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
  const titleStyle = {
    fontFamily: "Snell Roundhand, cursive",
    fontSize: "50px",
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

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 5,
      }}
    />
  );
  const DottedLine = () => (
    <hr
      style={{
        color: "black",
        height: 5,
        borderTop: "dotted",
      }}
    />
  );

  // const sTot = itemList.reduce((a, v) => (a = a + v.subtotal), 0).toFixed(2);
  // const tRate = (sTot * 0.06).toFixed(2);
  // const Tot = sTot + tRate;
  const calcTotal = (subt) => {
    const frst = subt * 0.06;
    const total = Number(frst) + Number(subt);
    return total;
  };

  function handleRemove(iname) {
    const newList = itemList.filter((item) => item.iname !== iname);

    setItemList(newList);
  }

  return (
    <>
      <Form.Label style={titleStyle} htmlFor="item">
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
      <ColoredLine color="black" />
      <h1>Your Cart</h1>
      {/* <DisplayList list={itemList} /> */}
      {itemList.length > 0 &&
        itemList.map((item, i) => (
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
          </Container>
        ))}
      <ColoredLine color="grey" />
      <Row>
        <Col xs lg="2">
          <h3>Subtotal</h3>
        </Col>
        <Col xs lg="1">
          $ {itemList.reduce((a, v) => (a = a + v.subtotal), 0).toFixed(2)}
        </Col>
        <Col>
          (+6% Tax) $
          {itemList.reduce((a, v) => (a = a + v.subtotal), 0).toFixed(2) * 0.06}
        </Col>
      </Row>
      <DottedLine />
      <Row>
        <Col xs lg="2">
          <h2>Total</h2>
        </Col>
        <Col>
          <h2>
            ${" "}
            {calcTotal(
              itemList.reduce((a, v) => (a = a + v.subtotal), 0).toFixed(2)
            )}
          </h2>
        </Col>
      </Row>
    </>
  );
};
export default IForm;
//xs={2} md={4} lg={6}
