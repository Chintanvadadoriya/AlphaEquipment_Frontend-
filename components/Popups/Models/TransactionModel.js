import { BLOCK_EXPLORER } from "@constant";
import { web3AccountState } from "@redux";
import { CommonModal } from "@style";
import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

const TransactionModel = ({
  open,
  handleClose,
  transaction
}) => {
  const { currentChainId } = useSelector(web3AccountState);

  return (
    <>
      <CommonModal
        className="modal-common-block diff-block-modal transaction-modal"
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        style={{}}
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          {/* <div onClick={() => handleClose()}>close</div> */}
          <div className="password-update-block">
            {transaction?.status === "success" && <img src="/assets/shop/ModalCongrasPicture.svg" alt="confrom-icon"/>}
            {transaction?.status === "pending" && <img src="/assets/icons/pending.svg" alt="confrom-icon"></img>}
            {transaction?.status === "failed" && <img src="/assets/shop/ModalOopsPicture.svg" alt="confrom-icon"></img>}
            <h3>{transaction?.status && transaction?.status?.toUpperCase()}</h3>
            {/* {successMsg ? <p>{successMsg}</p> : ""} */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {(transaction?.hash || transaction?.result?.transactionHash) && (
            <>
          <span>View Product on</span>
              <Button
                style={{
                  textDecoration: "none",
                  color: " #0e0ee2",
                  fontSize: "19px",
                }}
                href={`${BLOCK_EXPLORER[currentChainId]}${transaction?.hash || transaction?.result?.transactionHash}`}
                target="_blank"
              >
                etherscan
              </Button>
            </>
          )}
        </Modal.Footer>
      </CommonModal>
    </>
  );
};

export default TransactionModel;
