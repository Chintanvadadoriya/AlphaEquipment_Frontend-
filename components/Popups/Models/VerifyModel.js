import Modal from "react-bootstrap/Modal";
import { OtpInput, Input, SubmitButton } from "@components";
import { CommonModal } from "@style";
import { useState } from "react";
const VerifyModel = ({
  openSucModel = false,
  openVerifyModel = false,
  setOpenVerifyModel = () => {},
  setOpenSucModel = () => {},
  setReSend = () => {},
  setCallFunction = () => {},
  otp,
  setOtp = () => {}
 
}) => {
  const [loading, setLoading] = useState();
 
  return (
    <>
      <CommonModal
        className="modal-common-block"
        show={openVerifyModel}
        onHide={() => {
          setOpenVerifyModel(false), setOtp("");
        }}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        style={{}}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="enter-verify">
            <h4>Enter OTP</h4>
            <p>We have sent a verification code to your phoneNumber.</p>

            <OtpInput value={otp} onChange={(val) => setOtp(val)}></OtpInput>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <SubmitButton
            type="button"
            marginTop="0px"
            name="Confirm"
            onClick={() => {
              setCallFunction(true), setOtp("");
            }}
            loading={loading}
            disabled={otp?.length === 4 ? false : true}
          />
          <div>
            Didn’t recieve a code?{" "}
            <span
              onClick={() =>{setReSend(true), setOtp("")}}
            >
              Send Again
            </span>
          </div>
        </Modal.Footer>
      </CommonModal>
    </>
  );
};

export default VerifyModel;
