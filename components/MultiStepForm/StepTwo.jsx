import React from "react";
import { FinancingIndex, Button } from "@style";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
const StepTwo = ({ nextStep, handleFormData, prevStep, values }) => {
  //state

  // function

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
                <h4>How do you plan to purchase?</h4>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio" />
                  <h6>Lorem ipsum dolor sit amet</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio" />
                  <h6>Donec pretium orci</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio" />
                  <h6>Ut convallis sit amet nisl</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio" />
                  <h6>Sed et condimentum</h6>
                </Form.Group>
              </div>
              <div className="terms-checkbox">
                <h4>How do you plan to purchase?</h4>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio1" />
                  <h6>Lorem ipsum dolor sit amet</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio1" />
                  <h6>Donec pretium orci</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio1" />
                  <h6>Ut convallis sit amet nisl</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio1" />
                  <h6>Sed et condimentum</h6>
                </Form.Group>
              </div>
              <div className="form-detail drop-arrow mb-4">
                <Form.Label>Equipment Categorie</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Select categorie</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </div>
              <div className="form-detail drop-arrow mb-4">
                <Form.Label>Type of equipment</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Select equipment type</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </div>
              <div className="form-detail drop-arrow mb-4">
                <Form.Label>What auction do you plan to purchase at?</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Select auction</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </div>
              <div className="terms-checkbox">
                <h4>Do you need equipment within 15 days?</h4>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio2" />
                  <h6>yes</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio2" />
                  <h6>No</h6>
                </Form.Group>
              </div>
              <div className="terms-checkbox">
                <h4>Approximate Age of Equipment</h4>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio3" />
                  <h6>New</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio3" />
                  <h6>1-3 years</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio3" />
                  <h6>4-6 years</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio3" />
                  <h6>7-10 years</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio3" />
                  <h6>11-14 years</h6>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="checkbox">
                  <Form.Check type="radio" name="radio3" />
                  <h6>16+ years</h6>
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

export default StepTwo;
