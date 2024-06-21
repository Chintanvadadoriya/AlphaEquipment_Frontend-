import { CommonModal } from "@style";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";

import { getAllSubscription } from "@services";
import { CiPlane } from "react-icons/ci";
import Form from "react-bootstrap/Form";
import { usePlan } from "@hooks";

const ChooseAmountMembershipModel = ({
  isModalSellerPlan = false,
  setIsSellerPlan = () => {},
  setIsPaymentMethod = () => {},
  isModalUnlockPostValue = () => {},
  setDisabledButtonPost = () => {},
  setDisabledButtonAmount = () => {},
  disabledButtonAmount
}) => {
  const { formik } = usePlan();
  const [Res, setRes] = useState([]);
  // const [Default, setDefault] = useState();

  const getAllPlans = async () => {
    const res = await getAllSubscription();
    setRes(res.data);
    // setDefault(res?.data[0].id);
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  return (
    <CommonModal
      className="modal-common-block diff-delete-btn-block home-modal-block"
      show={isModalSellerPlan}
      onHide={() => {
        setIsSellerPlan(false);
        setDisabledButtonPost(true);
        setDisabledButtonAmount(true);
      }}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      style={{}}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Unlock Your Membership</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="home-modal-block-inner">
          <p>
            Cras eleifend purus quis orci aliquet, sit amet intum diam ultrices.
          </p>
          <Form>
            <div className="radion-check-block">
              {Res.map((plan, index) => {
                return isModalUnlockPostValue == "5" &&
                  plan.name.charAt(0) == "5" ? (
                  <div className="radion-check-inner" key={index}>
                    <input
                      type="radio"
                      id={plan.id}
                      name="planid"
                      value={plan.id}
                      // defaultChecked={plan.id == Default ? true : false}
                      onChange={(e) => {
                        formik.handleChange(e), setDisabledButtonAmount(false);
                      }}
                    />
                    <label for={plan.id}>
                      <div className="label-radio-block">
                        <h2>
                          {plan.amount.toString().includes("12")
                            ? "Monthly"
                            : "Annual"}
                        </h2>
                        <div className="label-radio-block-inner">
                          <h3>
                            {plan.amount.toString().includes("12")
                              ? `$${plan.amount}/month`
                              : `$${plan.amount}/year`}
                          </h3>
                          <p>
                            Cras eleifend purus quis orci aliquet, sit amet
                            intum diam ultrices. Ut consequat et sap porta.
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="radion-check-inner" key={index}>
                    {isModalUnlockPostValue == "20" &&
                      plan.name.slice(0, 2) == "20" && (
                        <>
                          <input
                            type="radio"
                            id={plan.id}
                            name="planid"
                            value={plan.id}
                            // defaultChecked={plan.id == Default ? true : false}
                            onChange={(e) => {
                              formik.handleChange(e), setDisabledButtonAmount(false);
                            }}
                          />
                          <label for={plan.id}>
                            <div className="label-radio-block">
                              <h2>
                                {plan.amount.toString().includes("400")
                                  ? "Annual"
                                  : "Monthly"}
                              </h2>
                              <div className="label-radio-block-inner">
                                <h3>
                                  {plan.amount.toString().includes("400")
                                    ? `$${plan.amount}/year`
                                    : `$${plan.amount}/month`}
                                </h3>
                                <p>
                                  Cras eleifend purus quis orci aliquet, sit
                                  amet intum diam ultrices. Ut consequat et sap
                                  porta.
                                </p>
                              </div>
                            </div>
                          </label>
                        </>
                      )}
                  </div>
                );
              })}
              {/* <div className="radion-check-inner">
            <input type="radio" id="free" name="plan" value="" />
            <label for="free">
              <div className="label-radio-block">
                <h2>Free</h2>
                <div className="label-radio-block-inner">
                  <h3>$0/month</h3>
                  <p>
                    Cras eleifend purus quis orci aliquet, sit amet
                    intum diam ultrices. Ut consequat et sap porta.
                  </p>
                </div>
              </div>
            </label>
          </div> */}
            </div>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            setIsPaymentMethod(true),
              setIsSellerPlan(false),
              formik.handleSubmit();
          }}
          disabled={disabledButtonAmount}
        >
          CONTINUE
        </Button>
      </Modal.Footer>
    </CommonModal>
  );
};

export default ChooseAmountMembershipModel;
