import { CommonModal } from '@style'
import React from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const UnblockMembershipModel = ({
    isModalUnlockMember=false,
    setIsUnlockMember = ()=>{},
    setIsUnlockMonthFree = ()=>{},
}) => {
        
        
  return (
    <CommonModal
    className="modal-common-block diff-delete-btn-block home-modal-block"
    show={isModalUnlockMember}
    onHide={() => setIsUnlockMember(false)}
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
          Cras eleifend purus quis orci aliquet, sit amet intum diam
          ultrices.
        </p>
        <div className="services-modal-block">
          <div className="services-modal-inner">
            <img
              src="/assets/icons/excellence-icon.svg"
              alt="img"
            />
            <div className="services-content-block">
              <h3>Best Selling Platform</h3>
              <p>
                Cras eleifend purus quis orci aliquet, sit amet
                intum diam ultrices. Ut consequat et sap porta.
              </p>
            </div>
          </div>
          <div className="services-modal-inner">
            <img src="/assets/icons/shield-icon.svg" alt="img" />
            <div className="services-content-block">
              <h3>Trusted Platform</h3>
              <p>
                Cras eleifend purus quis orci aliquet, sit amet
                intum diam ultrices. Ut consequat et sap porta.
              </p>
            </div>
          </div>
          <div className="services-modal-inner">
            <img src="/assets/icons/telephone-icon.svg" alt="img" />
            <div className="services-content-block">
              <h3>24/7 Service</h3>
              <p>
                Cras eleifend purus quis orci aliquet, sit amet
                intum diam ultrices. Ut consequat et sap porta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      
      <Button
        variant="primary"
        type="submit"
        onClick={()=>{setIsUnlockMonthFree(true),setIsUnlockMember(false)}}
      >
        CONTINUE
      </Button>
    </Modal.Footer>
  </CommonModal>
  )
}

export default UnblockMembershipModel