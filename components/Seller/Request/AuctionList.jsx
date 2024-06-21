import React, { useState, useEffect } from "react";
import { CommonBlockContent, TopContentCommon, CommonMiddleContent } from "@style";
import { CommonModal } from "@style";
import Image from "next/image";
import { Button, Form, Modal } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { cancelPayment, capturePayment, getAuctionReqAcceptDeny, getAuctionSellerProductListById } from "@services";
import { getDateTime, router, toaster } from "@utils";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SuccessResModel } from "@models";
import { LoaderComponent } from "@components";

const AuctionList = () => {
  // state
  const [show, setShow] = useState(false);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState();
  const [openSucModel, setOpenSucModel] = useState(false);
  const [isModalProductAccept, setisProductAccept] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState();
  const [auctionId, setAuctionId] = useState();
  const [loader, setLoader] = useState(false);

  const Router = useRouter();
  const { id } = Router.query;
  const { t, i18n } = useTranslation();
  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: Yup.object({
      reason: Yup.string().required("reason is required"),
    }),
    onSubmit: async (values, helpers) => {
      confirmRequest(auctionId, "rejected");
    },
  });

  let nowDate = moment();
  let currentDate = nowDate.format("YYYY-MM-DD HH:mm");
  let endDate = moment(productData?.[0]?.auctionEndDate).utc().format("YYYY-MM-DD HH:mm");
  let now = moment(currentDate);
  let end = moment(endDate);
  let duration = moment.duration(end.diff(now));
  let days = parseInt(duration.asDays());
  let hours = duration.hours();
  let minutes = duration.minutes();

  useEffect(() => {
    auctionReqListByProduct(`productId=${id}`);
    setLoader(true)
  }, [Router.query]);

  // functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const auctionReqListByProduct = async (id) => {
    const res = await getAuctionSellerProductListById(id);
    // if (res?.data?.length === 0) {
    //   Router.push({ pathname: router.SELLER, query: { tab: "auctionRequest" } });
    // }

    setProductData(res?.data);
    setLoader(false)
  };

  const acceptreq = () => {
    confirmRequest(auctionId, "accepted");
  };

  const confirmRequest = (auctionId, status) => {
    let payload;
    if (status === "accepted") {
      payload = {
        id: auctionId,
        status: status,
      };
      setisProductAccept(false);
    } else {
      payload = {
        id: auctionId,
        status: status,
        reason: formik?.values?.reason,
      };
      handleClose();
    }

    getAuctionReqAcceptDeny(payload, {
      Loading: setLoading,
      onSuccess: async (res) => {
        if (res.success) {
          if (status === "accepted") {
            capturePayment(
              { paymentIntentId: paymentIntentId },
              {
                Loading: setLoading,
                onSuccess: async (res) => {
                  if (res.success) {
                    await setOpenSucModel(true);
                  }
                },
                onError: (err) => {
                  toaster("error", err.message);
                },
              }
            );
          } else {
            cancelPayment(
              { paymentIntentId: paymentIntentId },
              {
                Loading: setLoading,
                onSuccess: async (res) => {
                  if (res.success) {
                    formik.handleReset();
                  }
                },
                onError: (err) => {
                  toaster("error", err.message);
                },
              }
            );
          }
          await auctionReqListByProduct(`productId=${id}`);
        }
      },
      onError: (err) => {
        toaster("error", err.message);
      },
    });
  };

  return (
    <div className="">
      <CommonBlockContent>
        <TopContentCommon>
          <h3>Auction Request</h3>
        </TopContentCommon>
        <CommonMiddleContent>
        {productData?.length == 0 ? (
            <p>no data found</p>
          ) : (
            <>
          <div className="edit-rent-block">
            <div className="img-block">
              <Image src={productData?.[0]?.firstImage ? productData?.[0]?.firstImage : `/assets/rent-request-block.png`} width={219} height={145} alt="auction-request" />
            </div>
            <div className="edit-content-block">
              <h2>{productData?.[0]?.productName}</h2>
              <p>
                <span>Location:</span> {productData?.[0]?.location}
              </p>
              <div className="edit-content-block-inner">
                <div className="edit-content-block-inner-one">
                  <p>
                    <span>Hours Meter:</span> 300h
                  </p>
                  <h3>{productData?.[0]?.price}$</h3>
                </div>
                <div className="edit-content-block-inner-second">
                  <p>
                    Bid end in {days}d {hours}h {minutes}m
                  </p>
                  <h5>{productData?.[0]?.auctionType} Sell</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="block-shop-table">
            <div className="common-table-block">
              <table className="table-block-action">
                <thead>
                  <tr>
                    <th></th>
                    <th>User Name</th>
                    <th>Bid Price</th>
                    <th>Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {productData?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}-</td>
                        <td>{data?.userName}</td>
                        <td>{data?.bidAmount}$</td>
                        <td>
                          <div
                            onClick={() => {
                              setisProductAccept(true), setAuctionId(data?.id), setPaymentIntentId(data?.paymentIntentId);
                            }}
                            className="link-view-block"
                          >
                            {t("confirm")}
                          </div>
                          <div
                            onClick={() => {
                              handleShow(), setAuctionId(data?.id), setPaymentIntentId(data?.paymentIntentId);
                            }}
                            className="link-view-block"
                          >
                            {t("deny")}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          </>
)}
        </CommonMiddleContent>
      </CommonBlockContent>
      <CommonModal className="modal-common-block diff-delete-btn-block home-modal-block" show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" style={{}} centered>
        <Modal.Header closeButton onClick={formik.handleReset}>
          <Modal.Title>{t("denyRequestBuy")}</Modal.Title>
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
      <SuccessResModel openSucModel={openSucModel} setOpenSucModel={setOpenSucModel} successHead="Congratulations!" successMsg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis fringilla eros, sit amet auctor justo accumsan et." />
      <CommonModal className="modal-common-block diff-delete-btn-block" show={isModalProductAccept} onHide={() => setisProductAccept(false)} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" style={{}} centered>
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
            <Button className="cancel-btn" onClick={() => setisProductAccept(false)}>
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

export default AuctionList;
