import { SuccessResModel, TransactionModel } from "@models";
import { BtnWrap, ControlStnForm, StyleModalResponse } from "@style";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import FiveImgCmp from "./FiveImgCmp";
import ProductNavbar from "./ProductNavbar";
import { EquipInfoForm } from "@style";
import { useAddProduct, cleanTransaction } from "@hooks";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, setTransaction, shopState } from "@redux";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";
import { LoaderComponent } from "@components";

const ControlStaInfo = ({ child, setShowProductList }) => {
  const [openSucModel, setOpenSucModel] = useState(false);
  const { formikControlStation, isDisabled, screen, loader, setLoader } = useAddProduct();
  const { transaction, loading } = useSelector(shopState);
  const { handleClose } = cleanTransaction();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  // const handleClose = () => {
  //   dispatch(
  //     setTransaction({
  //       transaction: {
  //         ...transaction,
  //         status: null,
  //       },
  //     })
  //   );
  //   dispatch(addProduct(null));
  //   setOpenSucModel(false);
  //   setShowProductList("productlist");
  // };

  useEffect(() => {
    if (screen) {
      setOpenSucModel(true);
    }
  }, [screen]);

  useEffect(() => {
    // console.log("transaction", transaction);
    if (!transaction?.hash && !transaction?.type) {
      return;
    }

    if ((["create_product"].includes(transaction?.type) && (transaction?.status === "success" || transaction?.status === "failed")) || (transaction?.status === "pending" && !openSucModel)) {
      setOpenSucModel(true);
    }
  }, [openSucModel, transaction, transaction?.status]);

  return (
    <>
      <ProductNavbar data={"Control Station (optional)"}></ProductNavbar>
      <EquipInfoForm onSubmit={formikControlStation.handleSubmit}>
        <div className="image-block-input">
          <Form.Label>{t("addControlStationImage")}:</Form.Label>
          <FiveImgCmp name={"ControlStation"} formik={formikControlStation} />
          <div className="control-label-block">
            <h6>{t("engine")}</h6>
            <p>{t("optional")}</p>
          </div>
          <Form.Label>{t("addEngineImage")}:</Form.Label>
          <FiveImgCmp name={"Engine"} formik={formikControlStation} />
          <div className="control-label-block">
            <h6>{t("chassis")}</h6>
            <p>{t("optional")}</p>
          </div>
          <Form.Label>{t("addChassisImage")}:</Form.Label>
          <FiveImgCmp name={"Chassis"} formik={formikControlStation} />
          <div className="control-label-block">
            <h6>{t("underCarrige")}</h6>
            <p>{t("optional")}</p>
          </div>
          <Form.Label>{t("addUndercarriageImage")}:</Form.Label>
          <FiveImgCmp name={"Undercarriage"} formik={formikControlStation} />
        </div>
        <BtnWrap>
          <Button variant="primary" type="button" size="lg" className="btnBack" onClick={() => child(3)} disabled={isDisabled}>
            {t("back")}
          </Button>
          <Button variant="primary" type="submit" size="lg" className="btnNext" disabled={isDisabled}>
            {t("add")}
          </Button>
        </BtnWrap>
        {/* <SuccessResModel
          openSucModel={openSucModel}
          setOpenSucModel={setOpenSucModel}
          setShowProductList={setShowProductList}
          successHead="added successfully"
          successMsg=""
        /> */}
        <TransactionModel open={openSucModel} handleClose={() => handleClose(setOpenSucModel, setShowProductList, addProduct(null))} transaction={transaction} />
      </EquipInfoForm>
      {loader && <LoaderComponent />}
    </>
  );
};

export default ControlStaInfo;
