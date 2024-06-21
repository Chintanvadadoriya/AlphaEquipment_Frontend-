import { Header, Footer, PageDetails } from "@components";
import { CalculatorIndex, Button } from "@style";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
// import { Button } from "react-bootstrap";
const Calculator = () => {
  const metaDetail = {
    title: "Calculator",
    desc: "Login page",
  };

  return (
    <>
      <PageDetails metaDetail={metaDetail} />
      <Header />
      <Container>
        <CalculatorIndex className="select-section">
          <Row className="justify-content-center">
            <Col md={11}>
              <div className="calculator-tital">
                <h1>Equipment Value Estimator</h1>
                <p>We have developed statistical pricing models for 6,996 models with 7,090 variants across 671 makes based on publicly available for-sale listings to help buyers and sellers determine current market pricing. The sample size used in developing our pricing models are listed after each make and model.</p>
              </div>
            </Col>
          </Row>
          <Row className="ps-0 ps-md-5">
            <Col md={2}>
              <div className="calculator-select dropdown-arrow">
                <Form.Label htmlFor="inputPassword5">Equipment Type</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Select equipment</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </div>
            </Col>
            <Col md={2}>
              <div className="calculator-select">
                <Form.Label htmlFor="inputPassword5">Make</Form.Label>
                <Form.Control type="text" id="inputPassword5" aria-describedby="passwordHelpBlock" placeholder="Enter make" />
                <Form.Text id="passwordHelpBlock">error massage</Form.Text>
              </div>
            </Col>
            <Col md={2}>
              <div className="calculator-select">
                <Form.Label htmlFor="inputPassword5">Year</Form.Label>
                <Form.Control type="text" id="inputPassword5" aria-describedby="passwordHelpBlock" placeholder="Enter year" />
                <Form.Text id="passwordHelpBlock">error massage</Form.Text>
              </div>
            </Col>
            <Col md={2}>
              <div className="calculator-select">
                <Form.Label htmlFor="inputPassword5">Model</Form.Label>
                <Form.Control type="text" id="inputPassword5" aria-describedby="passwordHelpBlock" placeholder="Enter modal" />
                <Form.Text id="passwordHelpBlock">error massage</Form.Text>
              </div>
            </Col>
            <Col md={2}>
              <div className="calculator-select">
                <Form.Label htmlFor="inputPassword5">Hours</Form.Label>
                <Form.Control type="text" id="inputPassword5" aria-describedby="passwordHelpBlock" placeholder="Enter hours" />
                <Form.Text id="passwordHelpBlock">error massage</Form.Text>
              </div>
            </Col>
            <Button type="button" className="bg-calculate">
              Calculate
            </Button>
          </Row>
          <Row className="justify-content-center">
            <Col md={4}>
              <figure className="caclulater-img">
                <img src="../../assets/caclulater-img.png" alt="caclulater-img" />
              </figure>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={{ span: 11 }}>
              <div className="caclulater-detail">
                <h3>JOHN DEERE 1025R</h3>
                <h4>All Variants</h4>
                <p>
                  Taking only age into consideration, the <span> UEG target price </span> for this item is <b>$13,672</b> with a fair market price being between <b>$12,781</b> and <b>$14,272.</b>
                </p>
                <h6>Location can have a significant impact on market prices.</h6>
              </div>
            </Col>
          </Row>
        </CalculatorIndex>
        <CalculatorIndex>
          <Row>
            <h2>Similar Items</h2>
            <Col md={12}>
              <div className="calculator-box">
                <figure>
                  <img src="/assets/trac-1.png" alt="trac-1" />
                </figure>
                <div className="cal-box-detail">
                  <h3>2016 Wacker Neuson RD12A Double Drum Roller</h3>
                  <div className="cal-location">
                    <h4>
                      Location: <span> Lorem ipsum dolor sit amet ipsum dolor sit</span>
                    </h4>
                    <span>
                      <img src="/assets/icons/distance-icon.svg" alt="distance-icon" /> 4.3km
                    </span>
                  </div>
                  <h4>
                    Hours Meter:<span> 300h</span>
                  </h4>
                  <h6>
                    Catalogue Notes: <span>Lorem ipsum dolor amuet, conse ctetur adipi scing elit. Vivamus at biben dum ante.</span>
                  </h6>
                  <p>Price: $8600</p>
                </div>
              </div>
              <div className="calculator-box">
                <figure>
                  <img src="/assets/trac-2.png" alt="trac-2" />
                </figure>
                <div className="cal-box-detail">
                  <h3>2016 Wacker Neuson RD12A Double Drum Roller</h3>
                  <div className="cal-location">
                    <h4>
                      Location: <span> Lorem ipsum dolor sit amet ipsum dolor sit</span>
                    </h4>
                    <span>
                      <img src="/assets/icons/distance-icon.svg" alt="distance-icon" /> 4.3km
                    </span>
                  </div>
                  <h4>
                    Hours Meter:<span> 300h</span>
                  </h4>
                  <h6>
                    Catalogue Notes: <span>Lorem ipsum dolor amuet, conse ctetur adipi scing elit. Vivamus at biben dum ante.</span>
                  </h6>
                  <p>Price: $8600</p>
                </div>
              </div>
              <div className="calculator-box">
                <figure>
                  <img src="/assets/trac-3.png" alt="trac-3" />
                </figure>
                <div className="cal-box-detail">
                  <h3>2016 Wacker Neuson RD12A Double Drum Roller</h3>
                  <div className="cal-location">
                    <h4>
                      Location: <span> Lorem ipsum dolor sit amet ipsum dolor sit</span>
                    </h4>
                    <span>
                      <img src="/assets/icons/distance-icon.svg" alt="distance-icon" /> 4.3km
                    </span>
                  </div>
                  <h4>
                    Hours Meter:<span> 300h</span>
                  </h4>
                  <h6>
                    Catalogue Notes: <span>Lorem ipsum dolor amuet, conse ctetur adipi scing elit. Vivamus at biben dum ante.</span>
                  </h6>
                  <p>Price: $8600</p>
                </div>
              </div>
              <div className="calculator-box">
                <figure>
                  <img src="/assets/trac-4.png" alt="trac-4" />
                </figure>
                <div className="cal-box-detail">
                  <h3>2016 Wacker Neuson RD12A Double Drum Roller</h3>
                  <div className="cal-location">
                    <h4>
                      Location: <span> Lorem ipsum dolor sit amet ipsum dolor sit</span>
                    </h4>
                    <span>
                      <img src="/assets/icons/distance-icon.svg" alt="distance-icon" /> 4.3km
                    </span>
                  </div>
                  <h4>
                    Hours Meter:<span> 300h</span>
                  </h4>
                  <h6>
                    Catalogue Notes: <span>Lorem ipsum dolor amuet, conse ctetur adipi scing elit. Vivamus at biben dum ante.</span>
                  </h6>
                  <p>Price: $8600</p>
                </div>
              </div>
            </Col>
          </Row>
        </CalculatorIndex>
      </Container>
      <Footer />
    </>
  );
};

export default Calculator;
