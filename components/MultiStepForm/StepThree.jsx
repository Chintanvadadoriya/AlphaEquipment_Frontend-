import React from "react";
import { FinancingIndex, Button } from "@style";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
const StepThree = ({ nextStep, handleFormData, prevStep, values }) => {
  const submitFormData = (e) => {
    nextStep();
  };

  return (
    <form onSubmit={submitFormData}>
      <FinancingIndex>
        <section className="step-two-section">
          <Row>
            <Col md={5}>
              <div className="terms-checkbox">
                <h4>Business Structure</h4>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio" />
                  <h6>Cooperative</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio" />
                  <h6>Corporation</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio" />
                  <h6>Partnership</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio" />
                  <h6>S-Corp</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio" />
                  <h6>Solo Proprietorship</h6>
                </Form.Group>
              </div>
              <div className="terms-checkbox">
                <h4>Forestry Type</h4>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio1" />
                  <h6>Logging</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio1" />
                  <h6>Transportation</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio1" />
                  <h6>Road building</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio1" />
                  <h6>Stump to Dump Contracting</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio1" />
                  <h6>Other</h6>
                </Form.Group>
              </div>
              <div className="form-detail mb-4">
                <Form.Label>Number of Employees</Form.Label>
                <Form.Control size="lg" type="number" placeholder="Enter number of employees" />
              </div>
              <div className="form-detail mb-4">
                <Form.Label>Year of Established</Form.Label>
                <Form.Control size="lg" type="number" placeholder="Enter year of established " />
              </div>
              <div className="terms-checkbox">
                <h4>Number of Owners</h4>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio2" />
                  <h6>1</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio2" />
                  <h6>2</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio2" />
                  <h6>3</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio2" />
                  <h6>More</h6>
                </Form.Group>
              </div>
              <div className="terms-checkbox">
                <h4>Any Related company that can provide a corporate guaranty?</h4>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio2" />
                  <h6>yes</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio2" />
                  <h6>No</h6>
                </Form.Group>
              </div>
              <div className="form-detail  mb-4 mt-2">
                <Form.Group controlId="formBasicEmail">
                  <div className="form-detail d-flex justify-content-between">
                    <Form.Label>Financial Year end</Form.Label>
                    <span>optional</span>
                  </div>
                  <Form.Control type="email" placeholder="Enter year of established" />
                </Form.Group>
              </div>
              <div className="terms-checkbox">
                <h4>Annual Gross revenue</h4>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio3" />
                  <h6>Under 250,000</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio3" />
                  <h6>250,000 - 500,000</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio3" />
                  <h6>500,000 - 1,000,000</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio3" />
                  <h6>5,000,000 - 10,000,000</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio3" />
                  <h6>Over 10,000,000</h6>
                </Form.Group>
              </div>
            </Col>
            <Col md={{ span: 6, offset: 0 }} xxl={{ span: 5, offset: 1 }}>
              <div className="step-two-img">
                <img src="/assets/Financial-data-pana.png" alt="Financial-data-pana" />
              </div>
            </Col>
            <div className="btn-submit">
              <Button className="bg-gray" onClick={prevStep} type="submit">
                Back
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </Row>
        </section>
      </FinancingIndex>
    </form>
  );
};

export default StepThree;
