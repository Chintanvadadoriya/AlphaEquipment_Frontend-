import React from "react";
import { Row, Col } from "react-bootstrap";
import { FinancingIndex, Button } from "@style";
import Form from "react-bootstrap/Form";
const StepFive = ({ nextStep, prevStep, handleFormData, values }) => {
  const submitFormData = (e) => {
    nextStep();
  };

  return (
    <>
      <form onSubmit={submitFormData}>
        <FinancingIndex>
          <section className="step-two-section">
            <Row>
              <Col md={5}>
                <div className="step-one-form">
                  <div className="form-detail drop-arrow mb-4">
                    <Form.Label>Country</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Select your country</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </div>
                  <div className="form-detail mb-4 mt-2">
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Business Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter business  name of guarantor" />
                    </Form.Group>
                  </div>
                  <div className="form-detail mb-4 mt-2">
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Address line 1</Form.Label>
                      <Form.Control type="text" placeholder="Enter your address" />
                    </Form.Group>
                  </div>
                  <div className="form-detail mb-4 mt-2">
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Address line 2</Form.Label>
                      <Form.Control type="text" placeholder="Enter your address" />
                    </Form.Group>
                  </div>
                  <div className="form-detail mb-4 mt-2">
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" placeholder="Enter your city" />
                    </Form.Group>
                  </div>
                  <div className="form-detail mb-4">
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Phone number</Form.Label>
                      <Form.Control type="text" placeholder="+1   123 4545643" />
                    </Form.Group>
                  </div>
                  <small>Sed et condimentum nibh, et tempor lacus. Pellentesque consectetur luctus ornare. Vestibulum sed maximus urna. Etiam faucibus purus et ipsum venenatis, vel consectetur lacus placerat. Praesent consectetur erat ligula, ac fringilla ante elementum nec.</small>
                </div>
              </Col>
              <Col md={{ span: 6, offset: 0 }} xxl={{ span: 5, offset: 1 }}>
                <div className="step-two-img">
                  <img src="/assets/Financial-data-pana.png" alt="Financial-data-pana" />
                </div>
              </Col>
            </Row>
            <div className="btn-submit">
              <Button className="bg-gray" onClick={prevStep} type="submit">
                Back
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </section>
        </FinancingIndex>
      </form>
    </>
  );
};

export default StepFive;
