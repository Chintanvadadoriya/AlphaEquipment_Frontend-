import { SuccessResModel, TransactionModel } from "@models";
import { BtnWrap, ControlStnForm, StyleModalResponse } from "@style";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import FiveImgCmp from "./FiveImgCmp";
import ProductNavbar from "./ProductNavbar";
import { EquipInfoForm } from "@style";
import { useAddProduct, useEditProduct, cleanTransaction } from "@hooks";
import { setTransaction, shopState, editProduct } from "@redux";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { LoaderComponent } from "@components";

const ControlStaInfo = ({ child, setShowProductList }) => {
  const [openSucModel, setOpenSucModel] = useState(false);
  const { formikControlStation, isDisabled, screen, loader, setLoader } = useEditProduct();
  const { handleClose } = cleanTransaction();
  const { transaction, loading } = useSelector(shopState);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (screen) {
      setOpenSucModel(true);
    }
  }, [screen]);

  // functions
  // const handleClose = () => {
  //   dispatch(
  //     setTransaction({
  //       transaction: {
  //         ...transaction,
  //         status: null,
  //       },
  //     })
  //   );
  //   setOpenSucModel(false);
  //   setShowProductList("productlist");
  // };

  useEffect(() => {
    // console.log("transaction", transaction);
    if (!transaction?.hash && !transaction?.type) {
      return;
    }

    if ((["edit_product"].includes(transaction?.type) && (transaction?.status === "success" || transaction?.status === "failed")) || (transaction?.status === "pending" && !openSucModel)) {
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
            {t("edit1")}
          </Button>
        </BtnWrap>
        {/* <SuccessResModel
          openSucModel={openSucModel}
          setOpenSucModel={setOpenSucModel}
          setShowProductList={setShowProductList}
          successHead="Updated successfully"
          successMsg=""
        /> */}
        <TransactionModel open={openSucModel} handleClose={() => handleClose(setOpenSucModel, setShowProductList, editProduct(null))} transaction={transaction} />
      </EquipInfoForm>
      {loader && <LoaderComponent />}
    </>
  );
};

export default ControlStaInfo;
