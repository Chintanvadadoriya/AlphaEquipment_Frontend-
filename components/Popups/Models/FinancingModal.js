import { CommonModal } from "@style";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";

import { getCardList } from "@services";
import { CiPlane } from "react-icons/ci";
import Form from "react-bootstrap/Form";
import { usePlan } from "@hooks";

const FinancingModal = ({ isCardList = false, setIsCardlistModel = () => {}, setIsPaymentMethod = () => {} }) => {
  const { formik } = usePlan();
  const [Res, setRes] = useState([]);
  const [Default, setDefault] = useState();
  const getAllCards = async () => {
    const res = await getCardList();
    console.log("res getCardList:>> ", res);
    setRes(res.data);
    setDefault(res?.data[0].id);
  };
  useEffect(() => {
    getAllCards();
  }, []);
  return (
    <CommonModal className="modal-common-block diff-delete-btn-block home-modal-block financing-modal" show={isCardList} onHide={() => setIsUnlockMonthFree(false)} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" style={{}} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <figure>
            <img src="/assets/right-img.png" alt="right-img" />
          </figure>
          <h2>Application SUBMITTED</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="home-modal-block-inner">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis fringilla eros, sit amet auctor justo accumsan et.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button
          variant="primary"
          type="submit"
          onClick={() => {
            setIsPaymentMethod(true), isCardList(false), formik.handleSubmit();
          }}
        >
          Confirm
        </Button> */}
      </Modal.Footer>
    </CommonModal>
  );
};

export default FinancingModal;
