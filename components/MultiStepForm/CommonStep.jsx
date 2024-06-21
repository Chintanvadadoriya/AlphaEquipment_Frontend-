import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FinancingIndex } from "@style";
import { Button, Form, Modal } from "react-bootstrap";
import { Step, Stepper } from "react-form-stepper";
import { AiOutlineCheck } from 'react-icons/ai';
import { BsCircleFill } from 'react-icons/bs';
import { AiFillCiCircle } from 'react-icons/ai';
const CommonStep = ({ nextStep,activeStep,setActiveStep }) => {
  // const [activeStep, setActiveStep] = useState(2);

  // AiFillCheckCircle
  // const submitFormData = (e) => {
  //   nextStep();
  // };

  return (
    // <form>
      <FinancingIndex>
        <section className="title-section">
          <Row>
            <Col md={12}>
              <div className="title-box">
                <div className="title">
                  <h1>Get expert advice to help you make the right decision</h1>
                  <p>When the economy pivots, you need to be able to do the same with your equipment & truck needs. But you need to know your options – and we can help.Maecenas sagittis hendrerit porta. Quisque nec tempor justo, quis malesuada quam. Ut in magna non risus vestibulum eleifend. Nullam fringilla tempor neque. Phasellus maximus nulla nec dui molestie tristique non vel nulla.</p>
                  <p>Our 200+ Ritchie Bros. equipment financing specialists are here to listen and expertly guide you through these unpredictable times – whatever the situation – with proven finance solutions.</p>
                  <h2>What sets Ritchie Bros. Financial Services apart?</h2>
                  <p>Maecenas sagittis hendrerit porta. Quisque nec tempor justo, quis malesuada quam. Ut in magna non risus vestibulum eleifend. Nullam fringilla tempor neque. Phasellus maximus nulla nec dui molestie tristique non vel nulla.</p>
                </div>
              </div>
            </Col>
          </Row>
          <div className="fi-box">
            <div className="fi-box-detail">
              <figure>
                <img src="/assets/icons/dollar-icon.svg" alt="dollar-icon" />
              </figure>
              <h3>Flexible finance options</h3>
              <p>Maecenas sagittis hendrerit porta. Quisque nec tempor justo, quis malesuada quam. </p>
            </div>
            <div className="fi-box-detail">
              <figure>
                <img src="/assets/icons/shild-icon.svg" alt="shild-icon" />
              </figure>
              <h3>Flexible finance options</h3>
              <p>Maecenas sagittis hendrerit porta. Quisque nec tempor justo, quis malesuada quam. </p>
            </div>
            <div className="fi-box-detail">
              <figure>
                <img src="/assets/icons/bitcoin-icon.svg" alt="bitcoin-icon" />
              </figure>
              <h3>Flexible finance options</h3>
              <p>Maecenas sagittis hendrerit porta. Quisque nec tempor justo, quis malesuada quam. </p>
            </div>
            <div className="fi-box-detail">
              <figure>
                <img src="/assets/icons/watch-icon.svg" alt="watch-icon" />
              </figure>
              <h3>Flexible finance options</h3>
              <p>Maecenas sagittis hendrerit porta. Quisque nec tempor justo, quis malesuada quam. </p>
            </div>
            <div className="fi-box-detail">
              <figure>
                <img src="/assets/icons/shop-icon.svg" alt="shop-icon" />
              </figure>
              <h3>Flexible finance options</h3>
              <p>Maecenas sagittis hendrerit porta. Quisque nec tempor justo, quis malesuada quam. </p>
            </div>
          </div>
          <div className="common-title">
            <h1>Heavy Equipment Financing</h1>
            <p>Apply for up to 100% financing with $0 down payment. Financing Services Approed customers may have deposit waived.</p>
          </div>
          <div className="progress-bar">
          <Stepper activeStep={activeStep}>
        <Step label="Step 1" children={<AiOutlineCheck />}/>
        <Step label="Step 2" children={<BsCircleFill />}/>
        <Step label="Step 3" children={<AiFillCiCircle />}/>
        <Step label="Step 4"/>
        <Step label="Step 5" />
        <Step label="Step 6" />
      </Stepper>
      </div>
          <h5>Equipment Needs</h5>
          <h6>Tell us about your equipment needs</h6>
        </section>
      </FinancingIndex>
    // </form>
  );
};

export default CommonStep;
