import { CommonModal } from "@style";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAddCard } from "@hooks";

const ChoosePaymentMethodModel = ({
  isModalPaymentMethod = false,
  setIsPaymentMethod = () => {},
  setIsAddtoCard = () => {},
  setDisabledButtonPost = () => {},
  setDisabledButtonAmount = () => {},
}) => {
  return (
    <CommonModal
      className="modal-common-block diff-delete-btn-block home-modal-block"
      show={isModalPaymentMethod}
      onHide={() => {
        setIsPaymentMethod(false);
        setDisabledButtonPost(true);
        setDisabledButtonAmount(true);
      }}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      style={{}}
      centered
    >
      <Modal.Header className="modal-header-home" closeButton>
        <Modal.Title>Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="home-modal-block-inner">
          <h3>Select Payment Method</h3>
          <p>
            Cras eleifend purus quis orci aliquet, sit amet intum diam ultrices.
          </p>
          <div className="radion-check-block-payment">
            <div className="radion-check-inner-payment">
              <input type="radio" id="wallet" name="payment" value="wallet" />
              <label for="wallet">
                <div className="label-radio-block-payment">
                  <div className="img-wallet-inner">
                    <img src="/assets/icons/wallet-icon.svg" alt="img" />
                    <h4>Online Wallet</h4>
                  </div>
                  <div className="label-radio-round"></div>
                </div>
              </label>
            </div>
            <div className="radion-check-inner-payment">
              <input type="radio" id="credit" name="payment" value="credit" />
              <label for="credit">
                <div className="label-radio-block-payment">
                  <div className="img-wallet-inner">
                    <img src="/assets/icons/credit-card-icon.svg" alt="img" />
                    <h4>Credit Card</h4>
                  </div>
                  <div className="label-radio-round"></div>
                </div>
              </label>
            </div>
            <div className="radion-check-inner-payment">
              <input
                type="radio"
                id="financing"
                name="payment"
                value="financing"
              />
              <label for="financing">
                <div className="label-radio-block-payment">
                  <div className="img-wallet-inner">
                    <img src="/assets/icons/finacing-icon.svg" alt="img" />
                    <h4>Financing</h4>
                  </div>
                  <div className="label-radio-round"></div>
                </div>
              </label>
            </div>
            <div className="radion-check-inner-payment">
              <input type="radio" id="google" name="payment" value="google" />
              <label for="google">
                <div className="label-radio-block-payment">
                  <div className="img-wallet-inner">
                    <img src="/assets/icons/google-pay-icon.svg" alt="img" />
                    <h4>Google pay</h4>
                  </div>
                  <div className="label-radio-round"></div>
                </div>
              </label>
            </div>
            <div className="radion-check-inner-payment">
              <input type="radio" id="apple" name="payment" value="apple" />
              <label for="apple">
                <div className="label-radio-block-payment">
                  <div className="img-wallet-inner">
                    <img src="/assets/icons/bxl_apple-icon.svg" alt="img" />
                    <h4>Apple pay</h4>
                  </div>
                  <div className="label-radio-round"></div>
                </div>
              </label>
            </div>
            <div className="radion-check-inner-payment">
              <input type="radio" id="samsung" name="payment" value="samsung" />
              <label for="samsung">
                <div className="label-radio-block-payment">
                  <div className="img-wallet-inner">
                    <img src="/assets/icons/pay-icon.svg" alt="img" />
                    <h4>Samsung</h4>
                  </div>
                  <div className="label-radio-round"></div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            setIsPaymentMethod(false), setIsAddtoCard(true);
          }}
        >
          CONTINUE
        </Button>
      </Modal.Footer>
    </CommonModal>
  );
};

export default ChoosePaymentMethodModel;
