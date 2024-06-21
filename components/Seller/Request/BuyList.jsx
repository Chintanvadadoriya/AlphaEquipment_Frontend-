import React, { useState, useEffect } from "react";
import { CommonBlockContent, TopContentCommon, CommonMiddleContent } from "@style";
import { CommonModal } from "@style";
import Image from "next/image";
import { Button, Form, Modal } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { cancelPayment, capturePayment, getBuyReqAcceptDeny, getBuyReqListByProduct } from "@services";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SuccessResModel, TransactionModel } from "@models";
import { router } from "@utils";
import { useTranslation } from "react-i18next";
import { buyRequestAction, shopState } from "@redux";
import { useDispatch, useSelector } from "react-redux";
import { cleanTransaction } from "@hooks";
import { useWeb3React } from "@web3-react/core";
import { LoaderComponent } from "@components";

const BuyList = () => {
  // state
  const [show, setShow] = useState(false);
  const [productData, setProductData] = useState([]);
  console.log('productData :>> ', productData);
  const [buyId, setBuyId] = useState();
  const { account, active, chainId, library } = useWeb3React();
    console.log('account :>> ', account);
    console.log('active :>> ', active);
    console.log('chainId :>> ', chainId);
    console.log('library :>> ', library);

  const [Loading, setLoading] = useState();
  const [openSucModel, setOpenSucModel] = useState(false);
  const [isModalProductAccept, setisProductAccept] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState();
  const [checkBalance, setCheckBalance] = useState(false);
  const [loader, setLoader] = useState(false);
  console.log('checkBalance', checkBalance)
  console.log('productData[0].isSellUsingCrypto :>> ', productData[0]?.isSellUsingCrypto);

  //const
  const Router = useRouter();
  const { id } = Router.query;
  const { t, i18n } = useTranslation();
  const { handleClose } = cleanTransaction();
  const dispatch = useDispatch();
  const { transaction, loading } = useSelector(shopState);
  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: Yup.object({
      reason: Yup.string().required("reason is required"),
    }),
    onSubmit: async (values, helpers) => {
      confirmRequest(buyId, "rejected");
    },
  });

  //useEffect
  useEffect(() => {
    buyReqListByProduct(`productId=${id}`);
    setLoader(true)
  }, [Router.query]);

  useEffect(() => {
    (async () => {
      let balance = await library?.getBalance(account);

      setCheckBalance(balance?.gt(0));
    })();
  }, [account]);

  useEffect(() => {
    if (!transaction?.hash && !transaction?.type) {
      return;
    }

    if ((["buy_request"].includes(transaction?.type) && (transaction?.status === "success" || transaction?.status === "failed")) || (transaction?.status === "pending" && !openSucModel)) {
      setOpenSucModel(true);
    }
  }, [openSucModel, transaction, transaction?.status]);

  // functions
  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const buyReqListByProduct = async (id) => {
    const res = await getBuyReqListByProduct(id);
    // if (res?.data?.length === 0) {
    //   Router.push({ pathname: router.SELLER, query: { tab: "buyRequest" } });
    // }
    setProductData(res?.data);
    setLoader(false)
  };

  const acceptreq = () => {
    confirmRequest(buyId, "accepted");
  };

  const confirmRequest = (buyid, status) => {
    productData[0].isSellUsingCrypto=1;
    console.log('status :>> ', status);
    if (status === "accepted" && productData[0].isSellUsingCrypto === 1) {
     let payload = {
        id: buyid,
        status: status,
      };
      setisProductAccept(false);
      const getData =async()=>{
        await buyReqListByProduct(`productId=${id}`);
      }
      let payloadData = {
        productUuid: productData?.[0]?.uuid,
        payload:payload,
        getData:getData,
        account: account,
        chainId: chainId,
        active: active,
        balance: checkBalance,
      };
console.log('payloadData', payloadData)
      // dispatch(buyRequestAction(payloadData));
    }
    else {

      if(status === "accepted"){
        console.log("accepted usd")
      }else{
console.log("rejected usd");
      }
    //  let payload = {
    //     id: buyid,
    //     status: status,
    //     reason: formik?.values?.reason,
    //   };
    //   setShow(false);

    //   getBuyReqAcceptDeny(payload, {
    //     Loading: setLoading,
    //     onSuccess: async (res) => {
    //       if (res.success) {
    //         // if (status === "accepted") {
    //         //   let payloadData = {
    //         //     productUuid: productData?.[0]?.uuid,
    //         //   };

    //         //   dispatch(buyRequestAction(payloadData));
    //         //   // capturePayment(
    //         //   //   { paymentIntentId: paymentIntentId },
    //         //   //   {
    //         //   //     Loading: setLoading,
    //         //   //     onSuccess: async (res) => {
    //         //   //       if (res.success) {
    //         //   //         await setOpenSucModel(true);
    //         //   //       }
    //         //   //     },
    //         //   //     onError: (err) => {
    //         //   //       toaster("error", err.message);
    //         //   //     },
    //         //   //   }
    //         //   // );
    //         // } else {
    //           cancelPayment(
    //             { paymentIntentId: paymentIntentId },
    //             {
    //               Loading: setLoading,
    //               onSuccess: async (res) => {
    //                 if (res.success) {
    //                   formik.handleReset();
    //                   await buyReqListByProduct(`productId=${id}`);
    //                 }
    //               },
    //               onError: (err) => {
    //                 toaster("error", err.message);
    //               },
    //             }
    //           );
    //         // }
    //       }
    //     },
    //     onError: (err) => {
    //       toaster("error", err.message);
    //     },
    //   });
    }


  };

  return (
    <div className="">
      <CommonBlockContent>
        <TopContentCommon>
          <h3>{t("buyRequest")}</h3>
        </TopContentCommon>

        <CommonMiddleContent>
          {productData?.length == 0 ? (
            <p>no data found</p>
          ) : (
            <>
              <div className="edit-rent-block">
                <div className="img-block">
                  <Image src={productData?.[0]?.firstImage ? productData?.[0]?.firstImage : `/assets/rent-request-block.png`} width={219} height={145} alt="rent-request" />
                </div>
                <div className="edit-content-block">
                  <h2>{productData?.[0]?.productName}</h2>
                  <p>
                    <span>{t("location")}:</span> Lorem ipsum dolor sit amet ipsum dolor sit
                  </p>
                  <p>
                    <span>{t("hoursMeter")}:</span> 300h
                  </p>
                  <h3>{productData?.[0]?.price}$/day</h3>
                </div>
              </div>
              <div className="block-shop-table">
                <div className="common-table-block">
                  <table className="table-block-buy">
                    <thead>
                      <tr>
                        <th></th>
                        <th>{t("userName")}</th>
                        <th>{t("actions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productData?.map((data, index) => {
                        return (
                          <tr>
                            <td>{index + 1}-</td>
                            <td>{data?.userName}</td>
                            <td>
                              <div
                                onClick={() => {
                                  setisProductAccept(true), setBuyId(data?.buyId), setPaymentIntentId(data.paymentIntentId);
                                }}
                                className="link-view-block"
                              >
                                {t("confirm")}
                              </div>
                              <div
                                onClick={() => {
                                  handleShow(), setBuyId(data?.buyId), setPaymentIntentId(data.paymentIntentId);
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
      <CommonModal className="modal-common-block diff-delete-btn-block home-modal-block" show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" style={{}} centered>
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
      {/* <SuccessResModel openSucModel={openSucModel} setOpenSucModel={setOpenSucModel} successHead="Congratulations!" successMsg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis fringilla eros, sit amet auctor justo accumsan et." /> */}
      <TransactionModel open={openSucModel} handleClose={() => handleClose(setOpenSucModel)} transaction={transaction} />
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

export default BuyList;
