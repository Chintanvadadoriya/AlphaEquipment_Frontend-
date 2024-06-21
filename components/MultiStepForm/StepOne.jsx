import React from "react";
import { Row, Col } from "react-bootstrap";
import { FinancingIndex, Button } from "@style";
import Form from "react-bootstrap/Form";
const StepOne = ({ nextStep, handleFormData, values }) => {
  const submitFormData = (e) => {
    nextStep();
  };

  return (
    <>
      <FinancingIndex>
        <section className="step-one-section">
          <form onSubmit={submitFormData}>
            <Row className="justify-content-center">
              <Col md={{ span: 6, offset: 0 }} xxl={{ span: 5, offset: 1 }}>
                <div className="step-one-form">
                  <div className="form-detail drop-arrow mb-4">
                    <Form.Label>Where is your business located?</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Select Country</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </div>
                  <div className="form-detail  mb-4 mt-2">
                    <Form.Group controlId="formBasicEmail">
                      <div className="form-detail d-flex justify-content-between">
                        <Form.Label>Legal Business Name</Form.Label>
                        <span>optional</span>
                      </div>
                      <Form.Control type="email" placeholder="Enter your business name" />
                    </Form.Group>
                  </div>
                  <div className="form-detail mb-4 mb-md-0 mt-2">
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter your email" />
                    </Form.Group>
                  </div>
                  {/* </form> */}
                </div>
              </Col>
              <Col md={{ span: 6, offset: 0 }} xxl={{ span: 5, offset: 1 }}>
                <div className="step-one-form">
                  <div className="form-detail mb-4">
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Amount Requird</Form.Label>
                      <Form.Control type="text" placeholder="Enter required amount" />
                    </Form.Group>
                  </div>
                  <div className="form-detail mb-4 mt-2">
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="number" placeholder="Enter your phone number" />
                    </Form.Group>
                  </div>
                  <div className="form-detail mt-2">
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Business Type</Form.Label>
                      <Form.Control type="text" placeholder="Select your business type" />
                    </Form.Group>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="terms-checkbox" style={{ "max-width": "unset" }}>
              <Form.Group controlId="formBasicCheckbox" className="d-flex">
                <Form.Check ype="checkbox" />
                <small>
                  By tapping confirm, you agree to the <span> terms of service </span> and <span> privacy policy</span> of app name
                </small>
              </Form.Group>
            </div>
            <div className="btn-submit">
              <Button type="submit">Next</Button>
            </div>
          </form>
        </section>
      </FinancingIndex>
    </>
  );
};

export default StepOne;
