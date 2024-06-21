import React from "react";
import { Row, Col } from "react-bootstrap";
import { FinancingIndex, Button } from "@style";
import Form from "react-bootstrap/Form";
const StepFour = ({ nextStep, prevStep, handleFormData, values }) => {
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
                      <Form.Label>Address line 1</Form.Label>
                      <Form.Control type="text" placeholder="Enter your address" />
                    </Form.Group>
                  </div>
                  <div className="form-detail  mb-4 mt-2">
                    <Form.Group controlId="formBasicEmail">
                      <div className="form-detail d-flex justify-content-between">
                        <Form.Label>Address line 2</Form.Label>
                        <span>optional</span>
                      </div>
                      <Form.Control type="email" placeholder="Enter year of established " />
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
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control type="text" placeholder="Enter zip code" />
                    </Form.Group>
                  </div>
                  <div className="terms-checkbox">
                    <Form.Group controlId="formBasicCheckbox" className="d-flex">
                      <Form.Check ype="checkbox" />
                      <small>Same as Billing Address</small>
                    </Form.Group>
                  </div>
                </div>
                <div className="step-one-form step-two-form">
                  <h6>Physical Address</h6>
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
                      <Form.Label>Address line 1</Form.Label>
                      <Form.Control type="text" placeholder="Enter your address" />
                    </Form.Group>
                  </div>
                  <div className="form-detail  mb-4 mt-2">
                    <Form.Group controlId="formBasicEmail">
                      <div className="form-detail d-flex justify-content-between">
                        <Form.Label>Address line 2</Form.Label>
                        <span>optional</span>
                      </div>
                      <Form.Control type="email" placeholder="Enter year of established " />
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
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control type="text" placeholder="Enter zip code" />
                    </Form.Group>
                  </div>
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

export default StepFour;
