import React, { useState, useEffect } from "react";
import { CommonBlockContent, TopContentCommon, CommonMiddleContent } from "@style";
import { CommonModal } from "@style";
import Image from "next/image";
import { Button, Form, Modal } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { getRentByProductId, rentRequestResponse, capturePayment, cancelPayment } from "@services";
import moment from "moment";
import SuccessResModel from "../../Popups/Models/SuccessResModel";
import { useFormik } from "formik";
import * as Yup from "yup";
import { router } from "@utils";
import { useTranslation } from "react-i18next";
import { LoaderComponent } from "@components";

const RentList = () => {
  const Router = useRouter();
  const { id } = Router.query;
  // state
  const [show, setShow] = useState(false);
  const [rentedProducts, setRentedProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [location, setLocation] = useState("");
  const [hours, setHours] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [openSucModel, setOpenSucModel] = useState(false);
  const [rentId, setRentId] = useState();
  const [paymentIntentId, setPaymentIntentId] = useState();
  const [dataUpdate, setDataUpdate] = useState(Math.random());
  const [isModalProductAccept, setIsProductAccept] = useState(false);
  const [loader, setLoader] = useState(false);

  const { t, i18n } = useTranslation();
  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: Yup.object({
      reason: Yup.string().required("reason is required"),
    }),
    onSubmit: async (values, helpers) => {
      confirmRequest(rentId, paymentIntentId, "rejected");
    },
  });

  // functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getRentedProductById = async () => {
    const result = await getRentByProductId(`?productId=${id}`);
    // if (result?.data?.length === 0) {
    //   Router.push({ pathname: router.SELLER, query: { tab: "rentRequest" } });
    // }
    setRentedProducts(result?.data);
    setProductName(result?.data[0]?.productName);
    setPrice(result?.data[0]?.price);
    setImage(result?.data[0]?.firstImage);
    setLoader(false)
  };

  const acceptreq = () => {
    confirmRequest(rentId, paymentIntentId, "accepted");
  };

  const confirmRequest = (id, paymentIntentId, status) => {
    if (status === "accepted") {
      const payload = {
        paymentIntentId: paymentIntentId,
        status: status,
      };
      rentRequestResponse(id, payload);
      capturePayment(payload);
      setIsProductAccept(false);
      setOpenSucModel(true);
    } else {
      const payload = {
        status: status,
        paymentIntentId: paymentIntentId,
        reason: formik?.values?.reason,
      };
      rentRequestResponse(id, payload);
      cancelPayment(payload);
      formik.handleReset();
      handleClose();
    }
    setTimeout(() => {
      setDataUpdate(Math.random());
    }, 1000);
  };

  // useEffects

  useEffect(() => {
    getRentedProductById();
    setLoader(true)
  }, [Router.query, dataUpdate]);

  return (
    <div className="">
      <CommonBlockContent>
        <TopContentCommon>
          <h3>{t("rentRequest")}</h3>
        </TopContentCommon>
        <CommonMiddleContent>
        {rentedProducts?.length == 0 ? (
            <p>no data found</p>
          ) : (
            <>
          <div className="edit-rent-block">
            <div className="img-block">
              <img
                src={image ? image : `/assets/rent-request-block.png`}
                onError={(e) => {
                  e.target.src = "/assets/rent-request-block.png";
                }}
                width={219}
                height={145}
                alt="rent-request"
              />
            </div>
            <div className="edit-content-block">
              <h2>{productName}</h2>
              <p>
                <span>{t("location")}:</span> Lorem ipsum dolor sit amet ipsum dolor sit
              </p>
              <p>
                <span>{t("hoursMeter")}:</span> 300h
              </p>
              <h3>{price}$/day</h3>
            </div>
          </div>
          <div className="block-shop-table">
            <div className="common-table-block">
              <table className="table-block-rent">
                <thead>
                  <tr>
                    <th></th>
                    <th>{t("userName")} </th>
                    <th>{t("days")}</th>
                    <th>{t("totalRent")}</th>
                    <th>{t("from")} </th>
                    <th>{t("to")} </th>
                    <th>{t("time")} </th>
                    <th>{t("actions")} </th>
                  </tr>
                </thead>
                <tbody>
                  {rentedProducts.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}-</td>
                        <td>{data?.userName}</td>
                        <td>{data?.days}</td>
                        <td>{data?.TotalRent}$</td>
                        <td>{moment(data?.fromDate).format("MM/DD/YYYY")}</td>
                        <td>{moment(data?.toDate).format("MM/DD/YYYY")}</td>
                        <td>{moment(data?.time).format("hh:mm A")}</td>
                        <td>
                          <div
                            onClick={() => {
                              setRentId(data?.rentId), setPaymentIntentId(data?.paymentIntentId), setIsProductAccept(true);
                            }}
                            className="link-view-block"
                          >
                            {t("confirm")}
                          </div>
                          <div
                            onClick={() => {
                              handleShow(), setRentId(data?.rentId), setPaymentIntentId(data?.paymentIntentId);
                            }}
                            className="link-view-block"
                          >
                            {t("deny")}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  <CommonModal className="modal-common-block diff-delete-btn-block home-modal-block" show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" style={{}} centered>
                    <Modal.Header closeButton onClick={formik.handleReset}>
                      <Modal.Title>{t("denyRequestRent")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="modal-form-block">
                        <p>{t("denyRequestReason")}</p>
                        <div className="form-group-block">
                          <Form.Group className="form-group-main">
                            <Form.Label className="label-block">{t("reason")}</Form.Label>
                            <Form.Control type="text" placeholder="Give your reason" as="textarea" rows={3} name="reason" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik?.values?.reason} />
                            {formik?.errors?.reason && <p>{formik?.errors?.reason}</p>}
                          </Form.Group>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" type="submit" onClick={() => formik.handleSubmit()}>
                        {t("denyRequest")}
                      </Button>
                    </Modal.Footer>
                  </CommonModal>
                </tbody>
              </table>
            </div>
          </div>
          </>
          )}
        </CommonMiddleContent>
      </CommonBlockContent>
      <SuccessResModel
        openSucModel={openSucModel}
        setOpenSucModel={setOpenSucModel}
        successHead="Congratulations!"
        successMsg="Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Pellentesque mattis fringilla
        eros, sit amet auctor justo accumsan et."
      />
      <CommonModal className="modal-common-block diff-delete-btn-block" show={isModalProductAccept} onHide={() => setIsProductAccept(false)} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" style={{}} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("acceptRequest")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="delete-content-block">
            <p>{t("confirmAcceptRequest")}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="button-content-footer">
            <Button className="cancel-btn" onClick={() => setIsProductAccept(false)}>
              {t("cancel")}
            </Button>
            <Button className="confirm-btn" onClick={() => acceptreq()}>
              {t("confirm")}
            </Button>
          </div>
        </Modal.Footer>
      </CommonModal>
      {loader && <LoaderComponent />}
    </div>
  );
};

export default RentList;
