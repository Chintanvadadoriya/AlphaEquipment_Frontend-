import Modal from "react-bootstrap/Modal";
import { CommonModal } from "@style";

const SuccessResModel = ({
  openSucModel,
  setOpenSucModel = () => {},
  setShowProductList = () => {},
  successHead,
  successMsg,
}) => {
  if (openSucModel) {
    setTimeout(() => {
      setOpenSucModel(false);
      setShowProductList("productlist");
    }, 3000);
  }
  return (
    <>
      <CommonModal
        className="modal-common-block diff-block-modal"
        show={openSucModel}
        onHide={() => setOpenSucModel(false)}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        style={{}}
        centered
      >
        <Modal.Body>
          <div className="password-update-block">
            <img src="/assets/icons/confrom-icon.svg" alt="confrom-icon"></img>
            <h3>{successHead}</h3>
            {successMsg ? <p>{successMsg}</p> : ""}
          </div>
        </Modal.Body>
      </CommonModal>
    </>
  );
};

export default SuccessResModel;
