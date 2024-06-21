import React, { useState } from "react";
import { CommonBlockContent, TopContentCommon, CommonMiddleContent } from "@style";
import { CommonModal } from "@style";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Modal from "react-bootstrap/Modal";

const Wallet = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <CommonBlockContent>
      <TopContentCommon className="border-less-title">
        <h3>Wallet</h3>
      </TopContentCommon>
      <CommonMiddleContent>
        <div className="wallet-block">
          <div className="wallet-block-left">
            <p>Total Balance:</p>
            <h4>$24.4K</h4>
          </div>
          <div className="wallet-block-right">
            <button type="button" className="button-main-common btn btn-primary" onClick={handleShow}>
              CashWithdrawal
            </button>
            <CommonModal className="modal-common-block diff-delete-btn-block home-modal-block" show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" style={{}} centered>
              <Modal.Header closeButton>
                <Modal.Title>Cash Withdrawal</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="modal-form-block">
                  <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.</p>
                  <div className="form-group-block">
                    <Form.Group className="form-group-main">
                      <Form.Label className="label-block">Bank</Form.Label>
                      <Form.Control
                        type="text.date"
                        placeholder="Enter your bank name"
                        defaultValue="Rajkot"
                        // value="Rajkot"
                      />
                    </Form.Group>
                    <Form.Group className="form-group-main">
                      <Form.Label className="label-block">Account Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your accoungt number"
                        defaultValue="Rajkot"
                        // value="Rajkot"
                      />
                    </Form.Group>
                    {/* <Form.Group className="form-group-main">
                      <Form.Label className="label-block">
                        Account Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your accoungt number"
                        defaultValue="Rajkot"
                        // value="Rajkot"
                      />
                    </Form.Group> */}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit">
                  Withdrawal
                </Button>
              </Modal.Footer>
            </CommonModal>
          </div>
        </div>
        <div className="block-shop-table">
          <h3 className="table-title">Payment History</h3>
          <div className="common-table-block">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>User Name</th>
                  <th>Amount</th>
                  {/* <th>In Stock</th> */}
                  <th>Day</th>
                  <th>Account Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1-</td>
                  <td>Lorem ipsum</td>
                  <td>$20</td>
                  <td>20-11-2022</td>
                  <td>78265376523635</td>
                </tr>
                <tr>
                  <td>1-</td>
                  <td>Lorem ipsum</td>
                  <td>$20</td>
                  <td>20-11-2022</td>
                  <td>78265376523635</td>
                </tr>
                <tr>
                  <td>1-</td>
                  <td>Lorem ipsum</td>
                  <td>$20</td>
                  <td>20-11-2022</td>
                  <td>78265376523635</td>
                </tr>
                <tr>
                  <td>1-</td>
                  <td>Lorem ipsum</td>
                  <td>$20</td>
                  <td>20-11-2022</td>
                  <td>78265376523635</td>
                </tr>
                <tr>
                  <td>1-</td>
                  <td>Lorem ipsum</td>
                  <td>$20</td>
                  <td>20-11-2022</td>
                  <td>78265376523635</td>
                </tr>
                <tr>
                  <td>1-</td>
                  <td>Lorem ipsum</td>
                  <td>$20</td>
                  <td>20-11-2022</td>
                  <td>78265376523635</td>
                </tr>
                <tr>
                  <td>1-</td>
                  <td>Lorem ipsum</td>
                  <td>$20</td>
                  <td>20-11-2022</td>
                  <td>78265376523635</td>
                </tr>
                <tr>
                  <td>1-</td>
                  <td>Lorem ipsum</td>
                  <td>$20</td>
                  <td>20-11-2022</td>
                  <td>78265376523635</td>
                </tr>
                <tr>
                  <td>1-</td>
                  <td>Lorem ipsum</td>
                  <td>$20</td>
                  <td>20-11-2022</td>
                  <td>78265376523635</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CommonMiddleContent>
    </CommonBlockContent>
  );
};

export default Wallet;
