import Modal from "react-bootstrap/Modal";
import { Input } from "@components";
import { CommonModal } from "@style";
import Button from "react-bootstrap/Button";

const AccountDeleteModel = ({
  openAccountDltModel,
  setOpenAccountDltModel = () => {},
  accountDltFormik
}) => {
  
  return (
    <>
      <CommonModal
        className="modal-common-block"
        show={openAccountDltModel}
        onHide={() => setOpenAccountDltModel(false)}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        style={{}}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <form onSubmit={accountDltFormik.handleSubmit}>
        <Modal.Body>
          <div className="delete-modal-content">
            <div className="delete-noti">
              <img
                src="/assets/icons/delete-notification.svg"
                alt="notification"
              ></img>
              <p>Delete your account will:</p>
            </div>
            <ul>
              <li>
                Lorem ipsum dolor amet, conse ctetur adipi scing elit. Vivamus
                at bibendum ante.
              </li>
              <li>
                Lorem ipsum dolor amet, conse ctetur adipi scing elit. Vivamus
                at bibendum ante.
              </li>
              <li>
                Lorem ipsum dolor amet, conse ctetur adipi scing elit. Vivamus
                at bibendum ante.
              </li>
              <li>
                Lorem ipsum dolor amet, conse ctetur adipi scing elit. Vivamus
                at bibendum ante.
              </li>
            </ul>
          </div>
          <div className="modal-last-content">
            <h4>To Delete your Account Confirm you Password</h4>
            <div className="form-group mb-40">
              <Input
                name="Password"
                lable="Password"
                type="Password"
                placeholder="Enter your password"
                onChange={accountDltFormik.handleChange}
                onBlur={accountDltFormik.handleBlur}
              />
              {accountDltFormik.errors.Password && <p>{accountDltFormik.errors.Password}</p>}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="delete-button"
            type="submit"
            // onClick={() => setOpenAccountDltModel(false)}
          >
            Delete my Account
          </Button>
        </Modal.Footer>
        </form>
      </CommonModal>
    </>
  );
};

export default AccountDeleteModel;
