import Modal from "react-bootstrap/Modal";
import { Input } from "@components";
import { CommonModal } from "@style";
import Button from "react-bootstrap/Button";
import SuccessResModel from "./SuccessResModel";
import { useEffect, useState } from "react";
import { useProfileChangePwd } from "@hooks";

const ChangePasswordModel = ({
  openChangePwdModel = false,
  setOpenChangePwdModel = () => {},
}) => {
  const [openSucModel, setOpenSucModel] = useState(false);
  const { formik, toggle } = useProfileChangePwd();
  
  
  useEffect(() => {
    if (toggle) {
   
      setOpenSucModel(true);
      setOpenChangePwdModel(false);
    }
  }, [toggle])
  

  useEffect(() => {
    if (!openChangePwdModel) {
      formik.handleReset();
    }
  }, [openChangePwdModel]);

  return (
    <>
      <CommonModal
        className="modal-common-block"
        show={openChangePwdModel}
        onHide={() => setOpenChangePwdModel(false)}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        style={{}}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              pretium orci vel ante posuere, et pharetra magna consectetur.
            </p>
            <div className="form-group">
              <Input
                name="currentPassword"
                lable="Current Password"
                type="Password"
                placeholder="Enter your current password"
                showError={Boolean(
                  formik.touched.currentPassword &&
                    formik.errors.currentPassword
                )}
                errorMsg={formik.errors.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form-group">
              <Input
                name="newPassword"
                lable="New Password"
                type="Password"
                placeholder="Enter your new password"
                showError={Boolean(
                  formik.touched.newPassword && formik.errors.newPassword
                )}
                errorMsg={formik.errors.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form-group">
              <Input
                name="confirmPassword"
                lable="Confirm Password"
                type="Password"
                placeholder="Enter your confirm password"
                showError={Boolean(
                  formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                )}
                errorMsg={formik.errors.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
             
            >
              Confirm
            </Button>
          </Modal.Footer>
        </form>
      </CommonModal>
      <SuccessResModel
        openSucModel={openSucModel}
        setOpenSucModel={setOpenSucModel}
        successHead="password Updated"
        successMsg="Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Pellentesque mattis fringilla
      eros, sit amet auctor justo accumsan et."
      />
    </>
  );
};

export default ChangePasswordModel;
