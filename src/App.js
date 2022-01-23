import { useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useAllowanceWeth9Query, useApproveWeth9Mutation } from "./redux/api";

function App() {
  const {data:allowanceData} = useAllowanceWeth9Query()
  const [sendApprove, {data: approveData, isLoading, isSuccess, isError}] = useApproveWeth9Mutation()

  const onSubmitHandler = (e) => {
    e.preventDefault();
    sendApprove()
  };
  useEffect(() => {
    console.log({allowanceData: allowanceData?.toString()});
    // console.log({approveData});
    // console.log({isLoading});
    // console.log({isSuccess});
    // console.log({isError});

  });
  return (
    <Container>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20vh",
        }}
      >
        <Col style={{ textAlign: "center" }}>CONTENT</Col>
      </Row>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Col lg={5}>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

// var c1='[[14,"a"],[1,"b"],[41,"a"],[1,"c"]]'
// var c2= "abcde"
// const string1 = "aaaaaaaaaaaaaaaassssssssssssssssssddddddddddddddddddddddww"
// const string2= "abcde"
// const string3= "aa"
// const compress = function (str) {
//   const result = []
//   str
//       .split('')
//       .forEach((letter) => {
//     const lastTuple = result[result.length - 1]
//     if (lastTuple && lastTuple[1] === letter) {
//       lastTuple[0] = lastTuple[0] + 1
//     } else {
//       result.push([1, letter])
//     }
//   })

//   return result.length < str.length ? JSON.stringify(result) : str
// }

// const decompress = function (c) {
//   if(c[0] !== '[') return c

//   let str = ''
//   const array = JSON.parse(c).reverse()

//   while (array.length) {
//     const [count, letter] = array.pop()
//     str += letter.repeat(count)
//   }
//    return str
// }

// useEffect(() => {
//   const compress1 = compress(string1)
//   const decompress1 = decompress(compress1)
//   console.log({compress1, decompress1})
// })
