import { CommonModal } from "@style";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";

import { getAllSubscription } from "@services";
import Form from "react-bootstrap/Form";
import { usePlan } from "@hooks";

const ChoosePostMembershipModel = ({
  isModalUnlockMonthFree = false,
  setIsUnlockMonthFree = () => {},
  setIsSellerPlan = () => {},
  setIsUnlockPostValue = () => {},
  setDisabledButtonPost = () => {},
  disabledButtonPost,
}) => {
  const { formik } = usePlan();
  const [fivePost, setFivePost] = useState("");
  const [fivePostValue, setFivePostValue] = useState("");
  const [twentyPost, setTwentyPost] = useState("");
  const [twentyPostValue, setTwentyPostValue] = useState("");

  const getAllPlans = async () => {
    const res = await getAllSubscription();
    setFivePost(res?.data[0]?.name);
    setFivePostValue(res?.data[0]?.name?.charAt(0));
    setTwentyPost(res?.data[1]?.name);
    setTwentyPostValue(res?.data[1]?.name?.slice(0, 2));
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  return (
    <CommonModal
      className="modal-common-block diff-delete-btn-block home-modal-block"
      show={isModalUnlockMonthFree}
      onHide={() => {
        setIsUnlockMonthFree(false);
        setDisabledButtonPost(true);
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
            Get access to biggest digital platform for heavy equipment or
            machinery
          </p>
          <Form>
            <div className="radion-check-block">
              <div className="radion-check-inner">
                <input
                  type="radio"
                  name="post"
                  id="5"
                  value={fivePostValue}
                  // checked={Default == "5"}
                  onChange={(e) => {
                    formik.handleChange(e),
                      setIsUnlockPostValue(e.target.value),
                      setDisabledButtonPost(false);
                  }}
                />
                <label htmlFor="5">
                  <div className="label-radio-block">
                    <h2>{"Individual Person "}</h2>
                    <div className="label-radio-block-inner">
                      <h3>{fivePost}</h3>
                      <p>
                        Cras eleifend purus quis orci aliquet, sit amet intum
                        diam ultrices. Ut consequat et sap porta.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
              <div className="radion-check-inner">
                <input
                  type="radio"
                  name="post"
                  id="20"
                  value={twentyPostValue}
                  // checked={Default == "20"}
                  onChange={(e) => {
                    formik.handleChange(e),
                      setIsUnlockPostValue(e.target.value),
                      setDisabledButtonPost(false);
                  }}
                />
                <label htmlFor="20">
                  <div className="label-radio-block">
                    <h2>Dealership</h2>
                    <div className="label-radio-block-inner">
                      <h3>{twentyPost}</h3>
                      <p>
                        Cras eleifend purus quis orci aliquet, sit amet intum
                        diam ultrices. Ut consequat et sap porta.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            setIsSellerPlan(true),
              setIsUnlockMonthFree(false),
              formik.handleSubmit();
          }}
          disabled={disabledButtonPost}
        >
          CONTINUE
        </Button>
      </Modal.Footer>
    </CommonModal>
  );
};

export default ChoosePostMembershipModel;
